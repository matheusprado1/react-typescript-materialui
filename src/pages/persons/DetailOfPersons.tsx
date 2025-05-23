import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { DetailTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts';
import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import { LinearProgress } from '@mui/material';

export const DetailOfPersons: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

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
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log('Save');
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
          whenClickInSave={handleSave}
          whenClickInSaveAndBack={handleSave}
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInNew={() => navigate('/persons/detail/new')}
          whenClickInBack={() => navigate('/persons')}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <p>Detalhe De Pessoas{id}</p>
    </PageLayoutBase>
  );
};
