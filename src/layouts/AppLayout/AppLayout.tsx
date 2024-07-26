import { Outlet, useSearch } from '@tanstack/react-router';
import { useSearchComponents } from '../../hooks/use-search-components';
import { AppControls } from './AppControls';
import { AppNav } from './AppNav';

export const AppLayout = () => {
  const searchParams = useSearch({
    strict: false,
  });

  const searchedComponentsData = useSearchComponents(searchParams);

  return (
    <div className="grid h-screen grid-cols-[1fr_1fr] items-center overflow-hidden">
      <main className="flex h-full w-[50vw] overflow-x-hidden">
        <div className="flex w-full flex-col gap-8 overflow-y-auto p-4 text-primary">
          <Outlet />
        </div>
      </main>
      <div className="p-4 pl-0">
        <div className="flex flex-col gap-4">
          <AppNav searchedComponentsData={searchedComponentsData} />
          <AppControls {...searchParams} />
        </div>
      </div>
    </div>
  );
};
