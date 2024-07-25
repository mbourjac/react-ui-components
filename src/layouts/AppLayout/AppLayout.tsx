import { Link, Outlet } from '@tanstack/react-router';
import { COMPONENTS_DATA } from '../../App.constants';
import { cn } from '../../lib/tailwind';

export const AppLayout = () => {
  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <main className="flex h-full w-[50vw] overflow-x-hidden">
        <div className="flex w-full flex-col gap-8 overflow-y-auto p-4 text-primary">
          <Outlet />
        </div>
      </main>
      <div className="p-4 pl-0">
        <nav>
          <ul className="flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
            {COMPONENTS_DATA.map(({ pathname, name, tags }) => (
              <li
                key={name}
                className="flex flex-col gap-1 border-b border-off-black text-left transition-all"
              >
                {tags && (
                  <ul className="flex gap-4">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex h-7 items-center rounded-full border border-off-black px-3 text-sm"
                      >
                        {tag}
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
      </div>
    </div>
  );
};
