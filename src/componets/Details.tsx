import { useLocation, useNavigate } from "react-router-dom";
import { Employee } from "../App";
import { RenderStatus } from "./RenderStatus";
import { useTranslation } from "react-i18next";

export function Details() {
  //Support for i18n
  const location = useLocation();
  //import of i18n
  const { t } = useTranslation();
  const data: Employee = location.state;

  const navigate = useNavigate();
  const handleButtonClick = (): void => {
    navigate("/");
  };

  return (
    <main className="main">
      <h1>
        {data.firstname} {data.lastname} ({t("id")}: {data.id})
      </h1>
      <table className="table-employee">
        <thead>
          <tr>
            <th>{t("birth_date_table_header")}</th>
            <th>{t("city_table_header")}</th>
            <th>{t("address_table_header")}</th>
            <th>{t("postal_code_table_header")}</th>
            <th>{t("phone_number_table_header")}</th>
            <th>{t("salary_table_header")}</th>
            <th>{t("status_table_header")}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="employee-detail">
            <td>{data.birthdate.toString()}</td> <td>{data.city}</td>
            <td>{data.address}</td>
            <td>{data.postalcode}</td>
            <td>{data.phonenumber}</td>
            <td>{data.salary}</td>
            <td>{RenderStatus(data.status)}</td>
          </tr>
        </tbody>
      </table>
      <button className="button-back" onClick={handleButtonClick}>
        {t("button_back")}
      </button>
    </main>
  );
}
