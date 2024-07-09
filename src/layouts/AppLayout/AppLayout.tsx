import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { motion, useAnimate } from 'framer-motion';
import { useWindowSize } from '../../hooks/use-window-size';
import type { AllRoutes } from '../../router/router.types';
import { UI_COMPONENTS } from './AppLayout.constants';

export const AppLayout = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();

  const [isHome, setIsHome] = useState(pathname === '/');

  const { windowHeight } = useWindowSize();
  const initialBorderRadius = Math.ceil((windowHeight - 2 * 16) / 2);

  const homePageVariant = useMemo(
    () => ({
      borderRadius: initialBorderRadius,
      height: 'min(calc((100vw - 2rem) / 2), calc(100vh - 2rem))',
    }),
    [initialBorderRadius],
  );

  const componentPageVariant = useMemo(
    () => ({ borderRadius: 16, height: '100%' }),
    [],
  );

  const animationTransition = useMemo(() => ({ duration: 0.25 }), []);

  const expandAnimation = useCallback(async () => {
    await animate(scope.current, componentPageVariant, animationTransition);
  }, [animate, scope, componentPageVariant, animationTransition]);

  const handeClick = async (to: AllRoutes) => {
    await navigate({ to });
    await expandAnimation();
  };

  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const restAnimation = async () => {
      await animate(scope.current, homePageVariant, animationTransition);
    };

    void restAnimation();
  }, [isHome, animate, scope, homePageVariant, animationTransition]);

  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <div className="flex h-full items-center p-4 pr-2">
        <motion.div
          ref={scope}
          className="mx-auto flex w-full max-w-[calc(100vh-2rem)] items-center justify-center bg-off-black"
          initial={isHome ? homePageVariant : componentPageVariant}
        >
          <Outlet />
        </motion.div>
      </div>
      <div className="p-4 pl-2">
        <div className="flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
          {UI_COMPONENTS.map(({ pathname, name, tags }) => (
            <button
              key={name}
              onClick={() => void handeClick(pathname)}
              className="group flex flex-col border-b border-off-black text-left transition-all"
            >
              <div className="flex flex-col gap-1">
                <ul className="flex gap-4">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-off-black px-3 py-1 text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <h2 className="text-lg uppercase">{name}</h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
