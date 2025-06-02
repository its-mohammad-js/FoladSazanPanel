import { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneralInfo from "./GeneralInfoForm";
import TechnicalInfo from "./TechnicalInfo";
import FormContext from "./FormContext";

function MainFrom() {
  const { t } = useTranslation();
  const [isEdit, setEdit] = useState(false);

  return (
    <FormContext {...{ isEdit, setEdit }}>
      {/* general info */}
      <GeneralInfo />
      <hr className="text-gray-200" />
      {/* technical information */}
      <TechnicalInfo />
      {/* action btn's */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md cursor-pointer bg-[#4d7ae2] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t(`MainForm.${isEdit ? "editBtn" : "submtiBtn"}`)}
        </button>
      </div>

      {/* loading screen */}
      {/* <div
        className={`${
          isLoading ? "visible opacity-100" : "invisible opacity-0"
        } absolute inset-0 flex items-center justify-center bg-gray-950/50 backdrop-blur-sm`}
      >
        <div className="px-12 py-2 bg-gray-200 rounded-md flex items-center gap-4 justify-center flex-col">
          <LoaderIcon className="!size-12" />
          <p>Laoding...</p>
        </div>
      </div> */}
    </FormContext>
  );
}

export default MainFrom;
