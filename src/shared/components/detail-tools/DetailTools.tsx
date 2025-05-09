import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IDetailTools {
  newButtonText?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  whenClickInNew?: () => void;
  whenClickInBack?: () => void;
  whenClickInDelete?: () => void;
  whenClickInSave?: () => void;
  whenClickInSaveAndBack?: () => void;
}

export const DetailTools: React.FC<IDetailTools> = ({
  newButtonText = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  whenClickInNew,
  whenClickInBack,
  whenClickInDelete,
  whenClickInSave,
  whenClickInSaveAndBack,
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
      {showSaveButton && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={whenClickInSave}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}
      {showSaveAndBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickInSaveAndBack}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e voltar
        </Button>
      )}
      {showDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickInDelete}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}
      {showNewButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickInNew}
          startIcon={<Icon>add</Icon>}
        >
          {newButtonText}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {showBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
