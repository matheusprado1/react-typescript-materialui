import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IToolbarProps {
  searchText?: string;
  showInputSearch?: boolean;
  whenChangingSearchText?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  whenClickInNew?: () => void;
}

export const Toolbar: React.FC<IToolbarProps> = ({
  searchText = '',
  showInputSearch = false,
  whenChangingSearchText,
  whenClickInNew,
  newButtonText = 'Novo',
  showNewButton = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          size="small"
          value={searchText}
          onChange={e => whenChangingSearchText?.(e.target.value)}
          placeholder="Pesquisar"
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={whenClickInNew}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
