import { type PropsWithChildren } from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="relative flex flex-col flex-1 min-h-0">
        <main className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto">
            <div className="px-4 w-full max-w-7xl mx-auto">{children}</div>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
