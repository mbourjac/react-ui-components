import { useMemo } from 'react';
import { COMPONENTS_DATA } from '../App.constants';
import type { SearchComponents } from '../App.types';
import {
  normalizeString,
  STOP_WORDS,
  isSimilarByLevenshtein,
} from '../utils/text';
import type { RenameProperties } from '../utils/types';

export const useSearchComponents = ({
  filterParam,
  searchParam,
}: RenameProperties<
  SearchComponents,
  'filter' | 'search',
  'filterParam' | 'searchParam'
>) => {
  const normalizedSearchTerms = useMemo(
    () => normalizeString(searchParam ?? '').split(' '),
    [searchParam],
  );

  const filteredComponentsData = useMemo(() => {
    if (!filterParam) return COMPONENTS_DATA;

    return COMPONENTS_DATA.filter(({ tags }) => tags.includes(filterParam));
  }, [filterParam]);

  const componentsDataTerms = filteredComponentsData.map(
    ({ pathname, name, tags, description }) => ({
      pathname,
      terms: [name, ...tags, description]
        .flatMap((projectTerm) =>
          projectTerm.split(/,| |'|\./).map(normalizeString),
        )
        // Filter out single characters or common stop words
        .filter(
          (projectTerm) =>
            projectTerm.length > 1 && !STOP_WORDS.includes(projectTerm),
        ),
    }),
  );

  const searchedComponentsData = useMemo(() => {
    if (!searchParam) return filteredComponentsData;

    return componentsDataTerms
      .filter((componentData) =>
        normalizedSearchTerms.some((searchTerm) =>
          componentData.terms.some(
            (componentDataTerm) =>
              // Use Levenshtein distance for fuzzy matching
              isSimilarByLevenshtein(componentDataTerm, searchTerm) ||
              // Also check for substring matches if search term is long enough
              (searchTerm.length > 3 && componentDataTerm.includes(searchTerm)),
          ),
        ),
      )
      .map(
        ({ pathname }) =>
          COMPONENTS_DATA.find(
            (componentData) => componentData.pathname === pathname,
          )!,
      );
  }, [
    filteredComponentsData,
    searchParam,
    componentsDataTerms,
    normalizedSearchTerms,
  ]);

  return searchedComponentsData;
};
