import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, LinearProgress, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DetailTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';
import { PersonsService } from '../../shared/services/api/persons/PersonsService';

type IFormData = {
  firstName: string;
  lastName: string;
  email: string;
  cityId: number;
};

const personSchema = yup.object().shape({
  firstName: yup.string().required('O nome é obrigatório'),
  lastName: yup.string().required('O sobrenome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
});

export const DetailOfPersons: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(personSchema),
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
          setName(result.firstName + ' ' + result.lastName);

          setValue('firstName', result.firstName);
          setValue('lastName', result.lastName);
          setValue('email', result.email);
          // console.log(result);
        }
      });
    }
  }, [id, setValue, navigate]);

  const onSubmit = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'new') {
      PersonsService.create(data).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/persons/detail/${result}`);
        }
      });
    } else {
      PersonsService.updateById(Number(id), { id: Number(id), ...data }).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        }
      });
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
          whenClickInSave={handleSubmit(onSubmit)}
          whenClickInSaveAndBack={handleSubmit(onSubmit)}
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInNew={() => navigate('/persons/detail/new')}
          whenClickInBack={() => navigate('/persons')}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />
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
            />
          )}
        />
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
            />
          )}
        />
      </form>
    </PageLayoutBase>
  );
};
