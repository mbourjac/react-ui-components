import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import type { SearchComponents } from '../../App.types';
import { Icon } from '../../components/ui/Icon/Icon';

type AppControlsProps = SearchComponents;

export const AppControls = ({
  filter: filterParam,
  search: searchParam,
}: AppControlsProps) => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <div className="flex h-11 gap-2">
      <div className="flex grow items-center gap-2 rounded-full border border-off-black px-4">
        <Icon kind="search" aria-hidden="true" className="min-w-5" />
        {filterParam && (
          <Link
            to="."
            search={(prev) => ({ ...prev, filter: undefined })}
            className="flex h-7 items-center gap-1.5 rounded-full border border-off-black pl-3 pr-2 text-sm hover:bg-off-black hover:text-primary"
            aria-label={`Remove ${filterParam} filter`}
          >
            <span>{filterParam}</span>
            <Icon kind="x-mark" aria-hidden="true" />
          </Link>
        )}
        <form onSubmit={handleSearchSubmit} className="w-full">
          <input type="search" name="search" className="w-full bg-primary" />
        </form>
      </div>
      <Link
        to="/"
        className="flex min-w-11 items-center justify-center rounded-full border border-off-black italic hover:bg-off-black hover:text-primary"
      >
        ui
      </Link>
    </div>
  );
};
