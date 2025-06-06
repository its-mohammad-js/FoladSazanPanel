import { Route, Routes } from "react-router-dom";
import ProductsListPage from "./pages/Products/ProductsListPage";
import DataProvider from "./pages/Provider/DataProvider";
import MainFrom from "./pages/MainForm/MainFrom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Toaster />
      <DataProvider>
        <Routes>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/MainForm/:id?" element={<MainFrom />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
