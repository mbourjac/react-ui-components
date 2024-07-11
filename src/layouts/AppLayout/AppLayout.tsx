import { Link, Outlet } from '@tanstack/react-router';
import { UI_COMPONENTS } from './AppLayout.constants';

export const AppLayout = () => {
  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <main className="flex h-full p-4 pr-2">
        <Outlet />
      </main>
      <div className="p-4 pl-2">
        <nav className="flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-auto rounded-2xl border border-off-black bg-primary p-4">
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
        </nav>
      </div>
    </div>
  );
};
