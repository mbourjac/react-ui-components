import type { ComponentData } from '../../App.types';
import type { BackdropBrushProps } from './BackdropBrush';

export const BACKDROP_BRUSH_DATA: ComponentData<BackdropBrushProps> = {
  pathname: '/backdrop-brush',
  name: 'Backdrop Brush',
  tags: ['canvas', 'animation'],
  description:
    "Creates a canvas-based brush effect that follows the user's mouse movements, resulting in a dynamic and interactive backdrop.",
  code: `
import { useRef, useCallback, type MouseEvent } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { useElementSize } from '@/hooks/use-element-size';
import { lerp } from '@/utils/math';

export type BackdropBrushProps = {
  brushFillStyle?: CanvasFillStrokeStyles['fillStyle'];
  brushRadius?: number;
  maxCircles?: number;
  interpolationFactor?: number;
  canvasClassName?: string;
  children: ReactNode;
};

type Circle = {
  x: number;
  y: number;
  radius: number;
};

export const BackdropBrush = ({
  brushFillStyle,
  brushRadius = 75,
  maxCircles = 200,
  interpolationFactor = 10,
  canvasClassName,
  children,
}: BackdropBrushProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastDrawnPosition = useRef<{ x: number; y: number } | null>(null);
  const brushCircles = useRef<Circle[]>([]);

  const { elementWidth: canvasWidth, elementHeight: canvasHeight } =
    useElementSize(containerRef);

  const getCanvas2dContext = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      throw new Error('canvasRef is not assigned');
    }

    const canvasContext = canvas.getContext('2d');

    if (!canvasContext) {
      throw new Error(
        'The context identifier is not supported or the canvas has already been set to a different context mode',
      );
    }

    return canvasContext;
  }, []);

  const drawCircle = (
    canvasContext: CanvasRenderingContext2D,
    { x, y, radius }: Circle,
  ) => {
    if (brushFillStyle) {
      canvasContext.fillStyle = brushFillStyle;
    }

    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
    canvasContext.fill();
  };

  const drawUpdatedCircles = (
    canvasContext: CanvasRenderingContext2D,
    circle: Circle,
    maxCircles: number,
  ) => {
    // Check if maxCircles limit is reached
    if (brushCircles.current.length >= maxCircles) {
      brushCircles.current.shift(); // Remove oldest circle
    }

    brushCircles.current.push(circle); // Add new circle

    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas

    // Redraw all circles
    for (const circle of brushCircles.current) {
      drawCircle(canvasContext, circle);
    }
  };

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
    movementX,
    movementY,
  }: MouseEvent<HTMLElement>) => {
    const { x, y } = currentTarget.getBoundingClientRect();

    const canvasX = clientX - x;
    const canvasY = clientY - y;

    const interpolatedCirclesCount =
      Math.max(Math.abs(movementX), Math.abs(movementY)) / interpolationFactor;

    if (lastDrawnPosition.current !== null) {
      const canvasContext = getCanvas2dContext();
      const { x: lastX, y: lastY } = lastDrawnPosition.current;

      // Draw interpolated circles between the last and current mouse positions
      for (let i = 0; i < interpolatedCirclesCount; i++) {
        const targetX = lerp(
          lastX,
          canvasX,
          (1 / interpolatedCirclesCount) * i,
        );
        const targetY = lerp(
          lastY,
          canvasY,
          (1 / interpolatedCirclesCount) * i,
        );

        const circle = {
          x: targetX,
          y: targetY,
          radius: brushRadius,
        };

        if (maxCircles) {
          drawUpdatedCircles(canvasContext, circle, maxCircles);
        } else {
          drawCircle(canvasContext, circle);
        }
      }
    }

    lastDrawnPosition.current = {
      x: canvasX,
      y: canvasY,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={canvasClassName}
      />
      <div className="absolute h-full">{children}</div>
    </div>
  );
};
  `,
  propsData: [
    {
      name: 'brushFillStyle',
      type: "CanvasFillStrokeStyles['fillStyle']",
      description: 'Defines the color of the brush.',
      required: false,
    },
    {
      name: 'brushRadius',
      type: 'number',
      description: 'Defines the radius of the brush.',
      required: false,
      defaultValue: '75',
    },
    {
      name: 'maxCircles',
      type: 'number',
      description:
        'The number of circles to be maintained on the canvas, defining the brush length.',
      required: false,
      defaultValue: '200',
    },
    {
      name: 'interpolationFactor',
      type: 'number',
      description:
        'Controls the spacing between interpolated circles, which in turn affects the smoothness of the brush.',
      required: false,
      defaultValue: '10',
    },
    {
      name: 'canvasClassName',
      type: 'string',
      description: 'Applies additional CSS classes to the canvas element.',
      required: false,
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'The content to be displayed on top of the canvas.',
      required: true,
    },
  ],
};
