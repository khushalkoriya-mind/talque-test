import { createContext, useState } from "react";
import { LOCALE, getLocalStorageItem } from "@/utils/helper";
import { defaultLanguage } from "@/utils/constant";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [languageData, setLanguageData] = useState(
    LOCALE?.id ? LOCALE : defaultLanguage
  );

  return (
    <LanguageContext.Provider
      value={{
        languageData,
        setLanguageData,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
