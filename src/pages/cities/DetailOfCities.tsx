import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { useFormActions } from '../../shared/hooks';
import { DetailTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';

interface IFormData {
  name: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const DetailOfCities: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { save, saveAndBack, isSaveAndBack } = useFormActions();

  const {
    control,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(formValidationSchema),
  });

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CitiesService.getById(Number(id)).then(result => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/cities');
        } else {
          setName(result.name);

          reset({
            name: result.name,
          });
        }
      });
    } else {
      reset({
        name: '',
      });
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true);

    const afterSave = (result: number | void | Error) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      setName(data.name);

      if (isSaveAndBack()) {
        navigate('/cities');
      } else {
        if (id === 'new') {
          navigate(`/cities/detail/${result}`);
        }
      }
    };

    if (id === 'new') {
      const result = await CitiesService.create(data);
      afterSave(result);
    } else {
      const result = await CitiesService.updateById(Number(id), { id: Number(id), ...data });
      afterSave(result);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CitiesService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/cities');
        }
      });
    }
  };

  return (
    <PageLayoutBase
      title={id === 'new' ? 'Nova Cidade' : name}
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
          whenClickInNew={() => navigate('/cities/detail/new')}
          whenClickInBack={() => navigate('/cities')}
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
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Nome"
                      fullWidth
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={isLoading}
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
