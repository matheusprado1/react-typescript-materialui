import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IDetailToolsProps {
  newButtonText?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

  whenClickInNew?: () => void;
  whenClickInBack?: () => void;
  whenClickInDelete?: () => void;
  whenClickInSave?: () => void;
  whenClickInSaveAndBack?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  newButtonText = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

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
      {showSaveButton && !showSaveButtonLoading && (
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

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {showSaveAndBackButton && !showSaveAndBackButtonLoading && (
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

      {showSaveAndBackButtonLoading && <Skeleton width={180} height={60} />}

      {showDeleteButton && !showDeleteButtonLoading && (
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

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {showNewButton && !showNewButtonLoading && (
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

      {showNewButtonLoading && <Skeleton width={110} height={60} />}

      {showBackButton && !showBackButtonLoading && (
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

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
