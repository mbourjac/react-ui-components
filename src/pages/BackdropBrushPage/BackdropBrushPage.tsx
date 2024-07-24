import { useMemo } from 'react';
import { ComponentPage } from '../../components/app/ComponentPage';
import { BackdropBrush } from './BackdropBrush';
import { BACKDROP_BRUSH_DATA } from './BackdropBrushPage.constants';

export const BackdropBrushPage = () => {
  // Display preview component
  const previewProps = useMemo(
    () => ({
      brushFillStyle: 'blue',
      canvasClassName: 'h-96 w-full rounded-b-2xl',
      children: (
        <div className="flex h-full items-center justify-center">
          <p className="px-6 text-[calc(2vw+0.5rem)] font-bold uppercase leading-none tracking-wider text-white md:px-24">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      ),
    }),
    [],
  );

  // Display playground component
  // Props with default values need to be defined so that they can be used as playground controls
  const playgroundProps = useMemo(
    () => ({
      props: {
        ...previewProps,
        canvasClassName: 'h-96 w-full',
        brushRadius: 75,
        maxCircles: 200,
        interpolationFactor: 10,
      },
      controlledPropsKeys: [
        'brushFillStyle' as const,
        'brushRadius' as const,
        'maxCircles' as const,
        'interpolationFactor' as const,
      ],
    }),
    [previewProps],
  );

  return (
    <ComponentPage
      componentData={BACKDROP_BRUSH_DATA}
      component={BackdropBrush}
      previewProps={previewProps}
      playgroundProps={playgroundProps}
    />
  );
};
