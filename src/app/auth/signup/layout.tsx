import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import type { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
