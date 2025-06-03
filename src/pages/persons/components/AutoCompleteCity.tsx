import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CitiesService } from '../../../shared/services/api/cities/CitiesService';
import { useDebounce } from '../../../shared/hooks';

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCityProps {
  value: number | null;
  onChange: (newValue: number | null) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({
  value,
  onChange,
  label = 'Cidade',
  error,
  helperText,
  disabled = false,
  isExternalLoading = false,
}) => {
  const { debounce } = useDebounce();

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search).then(result => {
        setIsLoading(false);

        if (!(result instanceof Error)) {
          setOptions(result.data.map(city => ({ id: city.id, label: city.name })));
        }
      });
    });
  }, [search]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      loading={isLoading}
      disabled={disabled || isExternalLoading}
      options={options}
      value={options.find(option => option.id === value) || null}
      onInputChange={(_, newInputValue) => setSearch(newInputValue)}
      onChange={(_, newValue) => onChange(newValue?.id ?? null)}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
      renderInput={params => (
        <TextField {...params} label={label} error={error} helperText={helperText} />
      )}
    />
  );
};
