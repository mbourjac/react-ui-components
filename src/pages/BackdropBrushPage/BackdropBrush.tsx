import { useRef, useCallback, type MouseEvent } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { useElementSize } from '../../hooks/use-element-size';
import { lerp } from '../../utils/math';

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
