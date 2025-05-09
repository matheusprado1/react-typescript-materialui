import { DetailTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts/PageLayoutBase';

export const Dashboard = () => {
  return (
    <PageLayoutBase title="Página inicial" toolbar={<DetailTools showSaveAndBackButton />}>
      Testando
    </PageLayoutBase>
  );
};
