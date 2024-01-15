interface IFormTable {
  //buttons
  createButton?: boolean;
  createButtonIcon?: any;
  createButtonName?: string;
  createButtonStyle?: string;
  createButtonVariant?: "text" | "outlined" | "contained";
  //table
  size?: "small" | "medium";
  items: any[];
  headers: ITableHeader[];
  pagination: IPagination | undefined;
  actions?: boolean;
  actionButton?: IActionButton;
  delete: (id: string) => void;
  changePage: (page: IPage) => void;
}

interface IFormData {
  type: "input" | "password" | "email" | "date";
  name: string;
  label?: string;
  value?: string;
  fieldGrid?: number;
  labelGrid?: number;
  size?: "small" | "medium";
}
interface IForm {
  data: IFormData[];
  schema: Zod.Schema;
  onSubmit: (data: any) => void;
}
