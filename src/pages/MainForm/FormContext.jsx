import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from "react-icons/bi";

const formContext = createContext();
export const useFormData = () => useContext(formContext);

function FormContext({ children, isEdit, setEdit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  console.log(watch());

  function handleAddProduct(params) {
    console.log(params);
  }

  return (
    <formContext.Provider
      value={{
        isEdit,
        setEdit,
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
      }}
    >
      <div className="w-full px-4 py-2 md:w-[500px] mx-auto md:py-4">
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
    </formContext.Provider>
  );
}

export default FormContext;
