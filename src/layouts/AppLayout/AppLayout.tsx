import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { motion, useAnimate } from 'framer-motion';
import { useWindowSize } from '../../hooks/use-window-size';
import { UI_COMPONENTS } from './AppLayout.constants';

export const AppLayout = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const [scope, animate] = useAnimate();
  const { windowHeight } = useWindowSize();
  const [isHome, setIsHome] = useState(pathname === '/');

  const componentContainerVariants = useMemo(
    () => ({
      collapsed: {
        borderRadius: Math.ceil((windowHeight - 2 * 16) / 2),
        height: 'min(calc((100vw - 2rem) / 2), calc(100vh - 2rem))',
      },
      expanded: { borderRadius: 16, height: '100%' },
    }),
    [windowHeight],
  );

  const animationTransition = useMemo(() => ({ duration: 0.25 }), []);

  const collapseComponentContainer = useCallback(async () => {
    await animate(
      scope.current,
      componentContainerVariants.collapsed,
      animationTransition,
    );
  }, [animate, scope, componentContainerVariants, animationTransition]);

  const expandComponentContainer = useCallback(async () => {
    await animate(
      scope.current,
      componentContainerVariants.expanded,
      animationTransition,
    );
  }, [animate, scope, componentContainerVariants, animationTransition]);

  useEffect(() => {
    setIsHome(pathname === '/');

    if (isHome) {
      void collapseComponentContainer();
    } else {
      void expandComponentContainer();
    }
  }, [pathname, isHome, expandComponentContainer, collapseComponentContainer]);

  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <div className="flex h-full items-center p-4 pr-2">
        <motion.div
          ref={scope}
          className="mx-auto flex w-full max-w-[calc(100vh-2rem)] items-center justify-center bg-off-black"
          initial={
            isHome ?
              componentContainerVariants.collapsed
            : componentContainerVariants.expanded
          }
        >
          <Outlet />
        </motion.div>
      </div>
      <div className="p-4 pl-2">
        <div className="flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
          {UI_COMPONENTS.map(({ pathname, name, tags }) => (
            <Link
              key={name}
              to={pathname}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
