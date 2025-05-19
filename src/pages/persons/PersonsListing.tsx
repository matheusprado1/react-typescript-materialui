import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { ListingTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';

export const PersonsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => { }, []);

  return (
    <PageLayoutBase
      title="Listagem de cidades"
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
