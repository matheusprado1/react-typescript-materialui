import { ListingTools } from '../../shared/components';
import { PageLayoutBase } from '../../shared/layouts/PageLayoutBase';

export const Dashboard = () => {
  return (
    <PageLayoutBase
      title="Página inicial"
      toolbar={<ListingTools showInputSearch newButtonText="Nova" />}
    >
      Testando
    </PageLayoutBase>
  );
};
