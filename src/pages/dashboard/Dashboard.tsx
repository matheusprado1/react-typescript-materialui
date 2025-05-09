import { Toolbar } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts/PageLayoutBase';

export const Dashboard = () => {
  return (
    <PageLayoutBase
      title="Página inicial"
      toolbar={<Toolbar showInputSearch newButtonText="Nova" />}
    >
      Testando
    </PageLayoutBase>
  );
};
