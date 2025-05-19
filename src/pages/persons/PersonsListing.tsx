import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { ListingTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';
import { PersonsService } from '../../shared/services/api/persons/PersonsService';

export const PersonsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    PersonsService.getAll(1, search).then(result => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    });
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
