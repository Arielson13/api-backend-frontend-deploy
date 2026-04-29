export const getErrorMessage = (value: unknown, fallback: string) => {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "message" in value) {
    return String((value as { message: unknown }).message);
  }
  return fallback;
};
