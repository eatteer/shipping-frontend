import type { ApplicationError } from "@/types/application-error";
import { AxiosError } from "axios";

export function getApplicationError(error: Error): ApplicationError {
  const DEFAULT_ERROR: ApplicationError = {
    message: "Unknown error",
    code: "UNKNOWN_ERROR",
    name: "UnknownError",
  };

  if (error instanceof AxiosError) {
    const { data } = error.response || {};
    const { message, code } = data || {};

    return {
      message: message ?? DEFAULT_ERROR.message,
      code: code ?? DEFAULT_ERROR.code,
      name: message ?? DEFAULT_ERROR.name,
    };
  }

  return DEFAULT_ERROR;
}
