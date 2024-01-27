import { EmployeeStatus } from "../App";

export const RenderStatus = (status: EmployeeStatus): string => {
  switch (status) {
    case "SICK_LEAVE":
      return "🤮";

    case "AVAILABLE":
      return "☑️";

    case "EMPLOYED":
      return "✅";

    case "FIRED":
      return "🚫";

    case "ON_HOLIDAY":
      return "🍹";

    default:
      return "❔";
  }
};
