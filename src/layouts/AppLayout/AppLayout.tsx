import type { FormEvent } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { useSearchComponents } from '../../hooks/use-search-components';
import { AppControls } from './AppControls';
import { AppNav } from './AppNav';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { filter: filterParam, search: searchParam } = useSearch({
    strict: false,
  });

  const searchedComponentsData = useSearchComponents({
    filterParam,
    searchParam,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get('search');

    if (!search && !searchParam) return;

    void navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        search: search ? String(search) : undefined,
      }),
    });
  };

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
          <AppControls filterParam={filterParam} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
