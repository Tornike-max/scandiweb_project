import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import MainLayout from "./layout/MainLayout";
import AddProductPage from "./pages/AddProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="/productadd" element={<AddProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
