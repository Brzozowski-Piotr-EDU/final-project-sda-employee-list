import React, { ChangeEvent, useEffect, useState } from "react";
import i18n from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";

export const LangSelector = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const langs = [
    { code: "pl", label: "Polski" },
    { code: "en", label: "English" },
  ];

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    console.log("Selected Language Code:", value);

    // Implement logic to change the language
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    // Autodetect language from the browser settings
    const browserLanguage = navigator.language.split("-")[0]; // Get the language code without the region code
    const defaultLanguage = langs.some((lang) => lang.code === browserLanguage)
      ? browserLanguage
      : "en";

    // Update the language state in LangSelector
    setSelectedLanguage(defaultLanguage);

    // Change the language in i18n if it differs from the current language
    if (defaultLanguage !== i18n.language) {
      i18n.changeLanguage(defaultLanguage);
    }
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <div className="langSelector">
      <label>{t("label_choose_lang")}</label>
      <select onChange={handleLanguageChange} value={selectedLanguage}>
        {langs.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
