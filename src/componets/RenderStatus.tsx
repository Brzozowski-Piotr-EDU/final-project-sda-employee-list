import React from "react";
import { EmployeeStatus } from "../App";

export const RenderStatus = (status: EmployeeStatus): string => {
  switch (status) {
    case "SICK_LEAVE":
      return "🤮";

    case "AVAILABLE":
      return "☑️";
    default:
      return "❔";
  }
};
