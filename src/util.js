import { DateTime } from "luxon";

const convertDate = (date) => {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { convertDate, capitalize };
