"use client";

export function DateFormat({
  dateString,
  formatString,
  dateFormatFunction,
}: {
  dateString: string;
  formatString?: string;
  dateFormatFunction: (dateString: string, formatString?: string) => string;
}) {
  return <>{dateFormatFunction(dateString, formatString)}</>;
}

export function dateFormatString({
  dateString,
  formatString,
  dateFormatFunction,
}: {
  dateString: string;
  formatString?: string;
  dateFormatFunction: (dateString: string, formatString?: string) => string;
}) {
  return dateFormatFunction(dateString, formatString);
}
