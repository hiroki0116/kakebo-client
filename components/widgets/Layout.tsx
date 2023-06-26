import { FC, ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  children: ReactNode;
};

const Layout: FC<Props> = ({ children, title = 'Nextjs' }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="grid grid-cols-1 justify-items-center">{children}</main>
    </div>
  );
};

export default Layout;
