import { useEffect, useState } from "react";
import { useData } from "../Provider/DataProvider";
import ProductsLoader from "./ProductsLoader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import { FaEdit, FaTrash } from "react-icons/fa";

function ProductsListPage() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { products, loading } = useData();
  const [filteredProducts, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(language);
    document.body.setAttribute("data-lang", language);
  }, [language, i18n]);

  useEffect(() => {
    setFiltered(products);
  }, [loading]);

  return (
    <div>
      <HeroSection {...{ setFiltered, products, loading }} />

      <div className="grid grid-cols-1 my-28 px-4 py-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {!loading ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative">
                <img
                  alt={item.imageAlt}
                  src={item.thumbnail}
                  className="aspect-square peer w-full hover:opacity-60 transition-all rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />

                <div className="absolute top-3 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 transition-all hover:visible hover:opacity-100 right-3 flex flex-col gap-2">
                  <button className="p-2 bg-white rounded-full text-2xl cursor-pointer text-red-700">
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate(`/MainForm/${item.id}`);
                    }}
                    className="p-2 bg-white rounded-full text-2xl cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
              <h3 className="mt-4 text-base md:text-xl font-bold text-gray-200">
                {item[`title__${language}`]}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-300">
                {item.Price}{" "}
                <span>{language !== "fa" ? "Toman" : "تومان"}</span>
              </p>
            </div>
          ))
        ) : (
          <ProductsLoader />
        )}
      </div>
    </div>
  );
}

export default ProductsListPage;
