import { Link } from '@tanstack/react-router';
import type { COMPONENTS_DATA } from '../../App.constants';
import { cn } from '../../lib/tailwind';

type AppNavProps = {
  searchedComponentsData: typeof COMPONENTS_DATA;
};

export const AppNav = ({ searchedComponentsData }: AppNavProps) => {
  return (
    <nav>
      <ul className="flex h-[calc(100vh-5.75rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
        {searchedComponentsData.length > 0 ?
          searchedComponentsData.map(({ pathname, name, tags }) => (
            <li
              key={name}
              className="flex flex-col gap-1 border-b border-off-black text-left transition-all"
            >
              {tags.length > 0 && (
                <ul className="flex gap-4">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex h-7 items-center rounded-full border border-off-black px-3 text-sm hover:bg-off-black hover:text-primary"
                    >
                      <Link search={(prev) => ({ ...prev, filter: tag })}>
                        {tag}
                      </Link>
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
          ))
        : <p>No match found</p>}
      </ul>
    </nav>
  );
};
