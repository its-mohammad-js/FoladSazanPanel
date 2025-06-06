import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from "react-icons/bi";
import { v4 } from "uuid";
import { supabase } from "../../../supabaseClient";

const formContext = createContext();
export const useFormData = () => useContext(formContext);

function FormContext({ children, isEdit, setEdit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLoading]);

  async function handleAddProduct(formData) {
    // if (!formData?.thumbnail.length) {
    //   toast.error("لطفا عکس محصول را اضافه کنید");
    //   return;
    // }
    // if (!formData?.color?.length) {
    //   toast.error("لطفا حداقل یک رنگ برای محصول انتخاب کنید");
    //   return;
    // }
    // if (!formData?.size?.length) {
    //   toast.error("لطفا حداقل یک سایز برای محصول انتخاب کنید");
    //   return;
    // }
    // if (!formData?.properties?.length) {
    //   toast.error("لطفا حداقل یک شاخصه فنی برای محصول تنظیم کنید");
    //   return;
    // }

    try {
      setLoading(true);
      const picUrl = await uploadImageToSupabase(formData.thumbnail);

      const productData = {
        id: v4(),
        thumbnail: picUrl,
        title__en: formData.title__en,
        title__fa: formData.title__fa,
        availability: true,
        brand__en: formData.brand__en,
        brand__fa: formData.brand__fa,
        category__en: formData.category__en,
        category__fa: formData.category__fa,
        sku: formData.sku,
        description__en: formData.description__en,
        description__fa: formData.description__fa,
        "size__-": "12 meters",
        color__001: "dark silver",
        color__002: "steel gray",
        technicalSpecs: JSON.stringify(formData.properties),
        // price: null,
        Price: formData.price,
      };
      console.log();

      if (isEdit) {
        // await supabase
        //   .from("Products")
        //   .update(finalProductData)
        //   .eq("id", formData.id);
      } else {
        await supabase.from("products").insert([productData]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const uploadImageToSupabase = async (file) => {
    if (!file) return { error: "No file provided" };

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${v4()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log(error);

        throw error;
      }

      const filePath = data?.path ?? fileName;
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("products")
          .createSignedUrl(filePath, 31536000);

      if (signedUrlError) {
        throw signedUrlError;
      }

      return signedUrlData.signedUrl;
    } catch (error) {
      console.log(error);

      return { error };
    }
  };

  return (
    <formContext.Provider
      value={{
        isLoading,
        getValues,
        setLoading,
        isEdit,
        setEdit,
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
      }}
    >
      <div
        className={`${
          isLoading ? "opacity-0 invisible" : ""
        } w-full px-4 py-2 md:w-[500px] transition-all mx-auto md:py-4`}
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-3xl text-[#4d7ae2]"
          >
            <BiChevronLeft />
          </button>

          <h4 className="text-lg font-semibold text-[#4d7ae2]">
            {t(isEdit ? "MainForm.editTitle" : "MainForm.addTitle")}
          </h4>

          <p></p>
        </div>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="py-12 space-y-6"
        >
          {children}
        </form>
      </div>
      {/* loading screen */}
      <div
        className={`${
          isLoading ? "visible opacity-100" : "invisible opacity-0"
        } absolute inset-0 flex items-center justify-center bg-gray-950/50 backdrop-blur-sm`}
      >
        <div className="px-12 py-2 bg-gray-200 rounded-md flex items-center gap-4 justify-center flex-col">
          <LoaderIcon className="!size-12" />
          <p>Laoding...</p>
        </div>
      </div>
    </formContext.Provider>
  );
}

export default FormContext;
