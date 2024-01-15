import { Button } from "@mui/material";
import DataTable from "../DataTable";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function TableForm(props: IFormTable) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function handleClose(status: boolean) {
    if (status === true) props.delete(deleteId);
    setOpen(false);
  }
  function onConfirmDelete(id: string) {
    setOpen(true);
    setDeleteId(id);
  }

  return (
    <div className="flex flex-col items-center justify-between p-10">
      <ConfirmModal open={open} handleClose={handleClose}></ConfirmModal>
      {props.createButton ? (
        <div className="flex justify-end  w-full mb-4">
          <Button
            href={`${pathname}/create`}
            className={`${props.createButtonStyle} !normal-case`}
            variant={props.createButtonVariant || "contained"}
            startIcon={props.createButtonIcon}
          >
            {props.createButtonName || "Create"}
          </Button>
        </div>
      ) : (
        <></>
      )}
      <DataTable
        data={props.items}
        headers={props.headers}
        pagination={props.pagination}
        actions={true}
        actionButton={{
          edit: true,
          delete: true,
          // view: true,
        }}
        onDelete={onConfirmDelete}
        onChangePage={props.changePage}
      />
    </div>
  );
}
