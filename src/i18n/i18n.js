import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      ProductsHero: {
        searchButton: "Search",
        searchPlaceholder: "Search products",
        title: "Add New Product",
      },
      MainForm: {
        editTitle: "Edit Product",
        addTitle: "Add New Product",
        generalTitle: "General Inforamtion",
        techTitle: "Technical Inforamtion",
        editBtn: "Submit Updates",
        submtiBtn: "Add New Product",
        addProp: "Add Technical Prop",
      },
    },
  },
  fa: {
    translation: {
      ProductsHero: {
        searchButton: "جستجو",
        searchPlaceholder: "جستجو بین محصولات",
        title: "اضافه کردن محصول جدید",
      },
      MainForm: {
        editTitle: "ویرایش محصول",
        addTitle: "اضافه کردن محصول جدید",
        generalTitle: "اطلاعات کلی محصول",
        techTitle: "اطلاعات فنی محصول",
        editBtn: "ثبت تغییرات",
        submtiBtn: "ثبت محصول جدید",
        addProp: "اضافه کردن به ویژگی های فنی",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fa",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
