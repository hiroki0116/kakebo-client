import Layout from '@/components/widgets/Layout';
import FormBalance from '@/features/balance/components/FormBalance';
import TotalBalance from '@/features/balance/components/TotalBalance';
import React from 'react';

const dashboard = () => {
  return (
    <Layout title="dashbord">
      <TotalBalance />
      <FormBalance />
    </Layout>
  );
};

export default dashboard;
