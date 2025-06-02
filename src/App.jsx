import { Route, Routes } from "react-router-dom";
import ProductsListPage from "./pages/Products/ProductsListPage";
import DataProvider from "./pages/Provider/DataProvider";
import MainFrom from "./pages/MainForm/MainFrom";
import GeneralInfo from "./pages/MainForm/GeneralInfoForm";
import TechnicalInfo from "./pages/MainForm/TechnicalInfo";

function App() {
  return (
    <div className="mx-auto max-w-[1440px]">
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
