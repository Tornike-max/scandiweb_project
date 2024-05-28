import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="max-w-[2200px] w-full min-h-screen flex flex-col items-center justify-start bg-slate-50">
      <header className="w-full h-[100px] flex items-center justify-center flex-col gap-2 fixed top-0  px-2 sm:px-4 md:px-6 lg:px-8 z-10 bg-slate-100">
        <Header />
        <div className="w-full flex justify-center items-center h-[2px] bg-black rounded-3xl "></div>
      </header>
      <main className="w-full flex justify-center items-center overflow-y-auto my-auto ">
        <Outlet />
      </main>
      <footer className="w-full flex justify-center items-center mt-8 flex-col fixed bottom-0 gap-2  px-2 sm:px-4 md:px-6 lg:px-8 z-10 bg-slate-100">
        <div className="w-full flex justify-center items-center h-[2px] bg-black rounded-3xl"></div>
        <p className="text-base font-medium py-4">Scandiweb test assignment</p>
      </footer>
    </div>
  );
};

export default MainLayout;
