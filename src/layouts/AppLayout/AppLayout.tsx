import { useEffect, useMemo } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { COMPONENTS_DATA } from '../../App.constants';
import { Icon } from '../../components/ui/Icon/Icon';
import { cn } from '../../lib/tailwind';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { filter } = useSearch({ strict: false });

  const filteredComponentsData = useMemo(
    () =>
      COMPONENTS_DATA.filter(
        ({ tags }) => tags?.findIndex((tag) => tag === filter) !== -1,
      ),
    [filter],
  );

  const componentsData = filter ? filteredComponentsData : COMPONENTS_DATA;

  useEffect(() => {
    if (filter && filteredComponentsData.length === 0) {
      void navigate({ to: '.', search: {} });
    }
  }, [filter, filteredComponentsData, navigate, location]);

  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <main className="flex h-full w-[50vw] overflow-x-hidden">
        <div className="flex w-full flex-col gap-8 overflow-y-auto p-4 text-primary">
          <Outlet />
        </div>
      </main>
      <div className="p-4 pl-0">
        <div className="flex flex-col gap-4">
          <nav>
            <ul className="flex h-[calc(100vh-5.75rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
              {componentsData.map(({ pathname, name, tags }) => (
                <li
                  key={name}
                  className="flex flex-col gap-1 border-b border-off-black text-left transition-all"
                >
                  {tags && (
                    <ul className="flex gap-4">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="flex h-7 items-center rounded-full border border-off-black px-3 text-sm hover:bg-off-black hover:text-primary"
                        >
                          <Link search={{ filter: tag }}>{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={pathname}
                    className="group flex items-center justify-between text-lg uppercase"
                  >
                    {({ isActive }) => {
                      return (
                        <>
                          <span>{name}</span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              'hidden size-4 rounded-full border border-off-black group-hover:inline-block',
                              isActive && 'inline-block bg-off-black',
                            )}
                          ></span>
                        </>
                      );
                    }}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex h-11 gap-2">
            <form className="flex grow items-center gap-2 rounded-full border border-off-black px-4">
              <Icon
                kind="search"
                screenReaderLabel="Search components"
                className="min-w-5"
              />
              {filter && (
                <Link
                  to="."
                  className="flex h-7 items-center gap-1.5 rounded-full border border-off-black pl-3 pr-2 text-sm hover:bg-off-black hover:text-primary"
                  aria-label={`Remove ${filter} filter`}
                >
                  <span>{filter}</span>
                  <Icon kind="x-mark" aria-hidden="true" />
                </Link>
              )}
              <input type="search" className="w-full bg-primary" />
            </form>
            <Link
              to="/"
              className="flex min-w-11 items-center justify-center rounded-full border border-off-black italic hover:bg-off-black hover:text-primary"
            >
              ui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
