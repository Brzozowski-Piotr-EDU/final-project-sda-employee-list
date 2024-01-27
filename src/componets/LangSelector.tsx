import { ChangeEvent, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

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

    // Update selected lnag
    setSelectedLanguage(value);

    // Change lang using i18n
    i18n.changeLanguage(value);
  };

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
