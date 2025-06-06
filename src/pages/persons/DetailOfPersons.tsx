import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import { AutoCompleteCity } from './components/AutoCompleteCity';
import { useFormActions } from '../../shared/hooks';
import { DetailTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  cityId: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.number().required(),
});

export const DetailOfPersons: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { save, saveAndBack, isSaveAndBack } = useFormActions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      cityId: undefined,
    },
    resolver: yupResolver(formValidationSchema),
  });

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      PersonsService.getById(Number(id)).then(result => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/persons');
        } else {
          setName(result.firstName);

          reset({
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            cityId: result.cityId,
          });
        }
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        cityId: undefined,
      });
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true);
    console.log(data);

    const afterSave = (result: number | void | Error) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      setName(data.firstName);

      if (isSaveAndBack()) {
        navigate('/persons');
      } else {
        if (id === 'new') {
          navigate(`/persons/detail/${result}`);
        }
      }
    };

    if (id === 'new') {
      const result = await PersonsService.create(data);
      afterSave(result);
    } else {
      const result = await PersonsService.updateById(Number(id), { id: Number(id), ...data });
      afterSave(result);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PersonsService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/persons');
        }
      });
    }
  };

  return (
    <PageLayoutBase
      title={id === 'new' ? 'Nova Pessoa' : name}
      toolbar={
        <DetailTools
          newButtonText="Nova"
          showSaveAndBackButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          whenClickInSave={() => {
            save();
            handleSubmit(onSubmit)();
          }}
          whenClickInSaveAndBack={() => {
            saveAndBack();
            handleSubmit(onSubmit)();
          }}
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInNew={() => navigate('/persons/detail/new')}
          whenClickInBack={() => navigate('/persons')}
        />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container direction="row">
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Nome"
                      fullWidth
                      {...field}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Sobrenome"
                      fullWidth
                      {...field}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 2 }}>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <AutoCompleteCity
                      value={field.value}
                      onChange={field.onChange}
                      isExternalLoading={isLoading}
                      error={!!errors.cityId}
                      helperText={errors.cityId?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </PageLayoutBase>
  );
};
