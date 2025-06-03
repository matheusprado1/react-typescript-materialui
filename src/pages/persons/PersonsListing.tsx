import { useEffect, useMemo, useState } from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router';

import {
  PersonsService,
  type IPersonListing,
} from '../../shared/services/api/persons/PersonsService';
import { ListingTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

export const PersonsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IPersonListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PersonsService.getAll(page, search).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          // console.log(result.data);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PersonsService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(oldRows => [...oldRows.filter(oldRow => oldRow.id !== id)]);
          alert('Registro apagado com sucesso!');
        }
      });
    }
  };

  return (
    <PageLayoutBase
      title="Listagem de pessoas"
      toolbar={
        <ListingTools
          showInputSearch
          newButtonText="Nova"
          searchText={search}
          whenClickInNew={() => navigate('/persons/detail/new')}
          whenChangingSearchText={text =>
            setSearchParams({ search: text, page: '1' }, { replace: true })
          }
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/persons/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.EMPTY_LISTING}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMIT_OF_LINES && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LIMIT_OF_LINES)}
                    onChange={(_, newPage) =>
                      setSearchParams({ search, page: newPage.toString() }, { replace: true })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </PageLayoutBase>
  );
};
