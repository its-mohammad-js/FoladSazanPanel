import React from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HeroSection({ setFiltered, products, loading }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();

  function searchProducts(query) {
    if (query === "" || !query) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((item) => item[`title__${language}`].includes(query))
      );
    }
  }

  return (
    <div
      dir={language !== "fa" ? "ltr" : "rtl"}
      className="h-96 md:h-[34rem] relative bg-gray-600 flex items-center justify-center"
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <img
          src="/images/heroThumbnail.jpg"
          alt="hero-banner"
          className="size-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </div>

      {/* Title & Search Input */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl w-full">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/MainForm/general-info");
          }}
          className="text-2xl my-12 flex items-center gap-x-2 mx-auto bg-[#25448d] cursor-pointer px-4 py-2 rounded-xl"
        >
          <FaPlus /> {t("ProductsHero.title")}
        </button>

        <div className="flex items-center gap-2 bg-white/90 rounded-lg p-2 shadow-lg">
          <input
            disabled={loading}
            type="text"
            placeholder={t("ProductsHero.searchPlaceholder")}
            onChange={(e) => searchProducts(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-500 bg-transparent outline-none"
          />
          <button className="bg-[#25448d] hover:bg-[#214eb8] text-white px-4 py-2 rounded-lg transition">
            {t("ProductsHero.searchButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
