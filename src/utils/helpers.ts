import { useSearchParams } from "next/navigation";

export function getPage(defaultPage: string | number = 1, defaultPageSize: string | number = 10) {
  const result: IPage = {
    page: useSearchParams().get("page") || defaultPage?.toString(),
    size: useSearchParams().get("pageSize") || defaultPageSize?.toString(),
  };
  return result;
}
export function getModalMessage(type?: string, message?: string): IModalMessage {
  switch (type) {
    case "create_success":
      return {
        title: "Success",
        message: "Data creation successful.",
        status: "success",
      };
    case "update_success":
      return {
        title: "Success",
        message: "Data modification successful.",
        status: "success",
      };
    case "delete_success":
      return {
        title: "Success",
        message: "Data deletion successful.",
        status: "success",
      };

    case "create_error":
      return {
        title: "Error",
        message: "Data creation unsuccessful.",
        status: "error",
      };
    case "update_error":
      return {
        title: "Error",
        message: "Data modification unsuccessful.",
        status: "error",
      };
    case "delete_error":
      return {
        title: "Error",
        message: "Data deletion unsuccessful.",
        status: "error",
      };
    case "warn":
      return {
        title: "Warning",
        message: "",
        status: "warn",
      };
    case "error":
      return {
        title: "Error",
        message: message,
        status: "error",
      };
    default:
      return {
        title: "",
        message: "Something went wrong",
        status: "error",
      };
  }
}
export function getConfirmModalMessage(type: string) {
  switch (type) {
    case "delete_warning":
      return {
        title: "!Warning",
        message: "are you sure you want to delete this data?",
      };

    default:
      return {
        title: "",
        message: "Something went wrong",
      };
  }
}

export function isNull(value: any): boolean {
  if (value) return true;
  else return false;
  // return value === null || value === undefined || value === 0 || value === "";
}
