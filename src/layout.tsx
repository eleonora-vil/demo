import Header from './components/shared/header';
import Sidebar from './components/shared/sidebar';
import MyBreadscumb from './components/breadcrumb/breadscumb';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-y-hidden no-scrollbar">
      <Header />
      <div className="flex h-[calc(100vh-60px)] overflow-y-hidden no-scrollbar bg-primary">
        <Sidebar />
        <div className="flex-1 overflow-y-scroll bg-white rounded-md">
          <div className="mt-4 mx-4">
            <MyBreadscumb />
          </div>

          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
