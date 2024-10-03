export const getLastPartOfString = (value: string, del = "/") =>
  value.split(del).pop();

export const getInputValue = (
  event: React.FormEvent<HTMLInputElement>
): string => event.currentTarget.value;

export const getFetchUrl = (url: string) => "http://localhost:4400/" + url;
