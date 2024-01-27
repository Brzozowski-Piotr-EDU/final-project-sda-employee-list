import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
const resources = {
  en: {
    translation: {
      id: "ID",
      employees: "Employees",
      main_page_title: "List of Employees",
      adding_page_title: "Add New Employee",
      editing_page_title: "Edit Existing Employee",
      id_table_header: "ID",
      first_name_table_header: "First Name",
      last_name_table_header: "Last Name",
      salary_table_header: "Salary",
      status_table_header: "Status",
      birth_date_table_header: "Birth Date",
      city_table_header: "City",
      address_table_header: "Address",
      postal_code_table_header: "Postal Code",
      phone_number_table_header: "Phone Number",
      number_of_results: "Number of results: ",
      button_add_new: "Add new employee",
      button_edit_existing: "Edit",
      button_delete_existing: "Delete",
      button_submit: "Submit",
      button_back: "Back",
      input_search_placeholder: "Search...",
      label_employee_name: "Employee Name",
      input_first_name_placeholder: "First Name",
      input_last_name_placeholder: "Last Name",
      label_date_of_birth: "Date of birth",
      input_date_of_birth_placeholder: "YYYY-MM-DD",
      label_employee_address: "Employee Address",
      input_address_placeholder: "Adress",
      input_city_placeholder: "City",
      input_postal_code_placeholder: "Postal Code",
      label_phone_number: "Phone Number",
      label_salary: "Salary",
      label_status: "Status",
      status_section_option_undefined: "Choose status of employee",
      status_section_option_employed: "Employed",
      status_section_option_fired: "Fired",
      status_section_option_on_holiday: "On Holiday",
      question_deleting_user: "This action will delete the employee...",
      alert_first_name_short: "First name is too short!",
      alert_last_name_short: "Last name is too short!",
      alert_address_short: "Address is too short!",
      alert_city_short: "City name is too short!",
      fetch_timeout_error_manage: "Failed to update employee data",
      fetch_4xx_error_manage: "Error while updating employee data: ",
      fetch_repsonse_ok_manage: "Added new employee successfully",
      fetch_timeout_error_delete: "Failed to delete employee!",
      fetch_4xx_error_delete: "Error while deleting employee: ",
      fetch_repsonse_ok_delete: "Deleted!",
      fetch_timeout_error_add: "Failed to add new employee",
      fetch_4xx_error_add: "Error while adding new employee: ",
      fetch_repsone_ok_add: "Added new employee successfully!",
      label_choose_lang: "Choose Language:",
    },
  },
  pl: {
    translation: {
      id: "ID",
      employees: "Pracownicy",
      main_page_title: "Lista Pracowników",
      adding_page_title: "Dodaj Nowego Pracownika",
      editing_page_title: "Edycja istniejącego pracownika",
      id_table_header: "ID",
      first_name_table_header: "Imię",
      last_name_table_header: "Nazwisko",
      salary_table_header: "Wypłata",
      status_table_header: "Status",
      birth_date_table_header: "Data urodzenia",
      city_table_header: "Miasto",
      address_table_header: "Adres",
      postal_code_table_header: "Kod Pocztowy",
      phone_number_table_header: "Numer Telefonu",
      number_of_results: "Ilość wyników: ",
      button_add_new: "Dodaj pracownika",
      button_edit_existing: "Edytuj",
      button_delete_existing: "Usuń",
      button_submit: "Prześlij",
      button_back: "Wróc",
      input_search_placeholder: "Wyszukaj...",
      label_employee_name: "Imię i nazwisko pracownika:",
      input_first_name_placeholder: "Imię",
      input_last_name_placeholder: "Nazwisko",
      label_date_of_birth: "Data urodzenia",
      input_date_of_birth_placeholder: "RRRR-MM-DD",
      label_employee_address: "Adres zamieszkania pracownika:",
      input_address_placeholder: "Adres",
      input_city_placeholder: "Miasto",
      input_postal_code_placeholder: "Kod Pocztowy",
      label_phone_number: "Numer telefonu",
      label_salary: "Wypłata",
      label_status: "Status",
      status_section_option_undefined: "Wybierz status pracownika",
      status_section_option_employed: "Zatrudniony",
      status_section_option_fired: "Zwolniony",
      status_section_option_on_holiday: "Na urlopie",
      question_deleting_user: "To spowoduje usunięcie pracownika...",
      alert_first_name_short: "Imię pracownika jest za krótkie!",
      alert_last_name_short: "Nazwisko pracownika jest za krótkie",
      alert_address_short: "Adres pracownika jest za krótki",
      alert_city_short: "Nazwa miasta pracownika jest za krótka",
      fetch_timeout_error_manage:
        "Nie udało się zaktualizować danych pracownika",
      fetch_4xx_error_manage: "Błąd podczas aktualizacji danych pracownika: ",
      fetch_repsonse_ok_manage: "Added new employee successfully",
      fetch_timeout_error_delete: "Nie udało się usunąć pracownika!",
      fetch_4xx_error_delete: "Błąd podczas usuwania pracownika: ",
      fetch_repsonse_ok_delete: "Usunięto!",
      fetch_timeout_error_add: "Nie udało się dodać nowego pracownika",
      fetch_4xx_error_add: "Error while adding new employee: ",
      fetch_repsone_ok_add: "Pomyślnie dodano nowego pracownika!",
      label_choose_lang: "Wybierz język:",
    },
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLNG: "en",
});

export default i18n;
