import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import { ListingTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';

export const PersonsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PersonsService.getAll(1, search).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <PageLayoutBase
      title="Listagem de pessoas"
      toolbar={
        <ListingTools
          showInputSearch
          newButtonText="Nova"
          searchText={search}
          whenChangingSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >
      Lista de pessoas
    </PageLayoutBase>
  );
};
