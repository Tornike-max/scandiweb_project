import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[2200px] w-full min-h-screen flex flex-col items-center justify-start bg-slate-50">
      <main className="w-full flex justify-center items-center mt-[10px] mb-[20px] lg:mt[80px] lg:mb-[70px] overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="hidden sm:flex w-full justify-center items-center mt-4 flex-col fixed bottom-0 gap-2 px-2 sm:px-4 md:px-6 lg:px-8 z-10 bg-slate-100 shadow-lg">
        <div className="w-full flex justify-center items-center h-[2px] bg-black rounded-3xl"></div>
        <p className="text-base font-medium py-3">Scandiweb test assignment</p>
      </footer>
    </div>
  );
};

export default MainLayout;
