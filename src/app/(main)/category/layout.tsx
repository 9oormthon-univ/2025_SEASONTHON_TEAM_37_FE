import { Suspense, type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <Suspense>{children}</Suspense>;
};

export default Layout;
