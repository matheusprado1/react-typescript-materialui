import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import { PageLayoutBase } from '../../shared/layouts/PageLayoutBase';
import { ListingTools } from '../../shared/components';

export const Dashboard = () => {
  const [totalCountPersons, setTotalCountPersons] = useState(0);
  const [isLoadingPersons, setIsLoadingPersons] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingPersons(true);

    CitiesService.getAll(1).then(result => {
      setIsLoadingCities(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCities(result.totalCount);
      }
    });
    PersonsService.getAll(1).then(result => {
      setIsLoadingPersons(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPersons(result.totalCount);
      }
    });
  }, []);

  return (
    <PageLayoutBase title="Página inicial" toolbar={<ListingTools showNewButton={false} />}>
      <Box width="100%">
        <Grid container spacing={2} margin={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Total de pessoas
                </Typography>
                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                  {!isLoadingPersons && <Typography variant="h1">{totalCountPersons}</Typography>}
                  {isLoadingPersons && <Typography variant="h6">Carregando...</Typography>}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Total de cidades
                </Typography>
                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                  {!isLoadingCities && <Typography variant="h1">{totalCountCities}</Typography>}
                  {isLoadingCities && <Typography variant="h6">Carregando...</Typography>}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageLayoutBase>
  );
};
