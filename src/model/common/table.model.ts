interface ITable {
  size?: "small" | "medium";
  data: any[];
  headers: ITableHeader[];
  pagination: IPagination | undefined;
  actions?: boolean;
  actionButton?: IActionButton;
  onDelete: (id: string) => void;
  onChangePage: (page: IPage) => void;
}
interface ITableHeader {
  name: string;
  value: string;
  type?: string;
  width?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  style?: string;
}

interface IActionButton {
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
}
