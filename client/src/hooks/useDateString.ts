import { useMemo } from "react";

export const useDateString = (date: string): string => {
  const d = useMemo(() => new Date(date), [date]);
  const dateString = useMemo(
    () =>
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes(),
    [d]
  );
  return dateString;
};
