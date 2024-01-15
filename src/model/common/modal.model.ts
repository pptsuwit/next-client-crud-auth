interface IConfirmModal {
  open: boolean;
  handleClose: (status: boolean) => void;
}

interface IModal {
  open: boolean;
  handleClose: () => void;
  body: IModalMessage;
}

interface IModalMessage {
  title: string;
  message?: string;
  status: string;
}
