import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Spiral } from './Spiral';

interface LayoutProps {
  children: React.ReactNode;
}

// Memoize the Layout component to prevent unnecessary re-renders
const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <Spiral />
      <main className="flex-grow w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
});

export default Layout;
