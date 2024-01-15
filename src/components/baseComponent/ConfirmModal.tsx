import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { getConfirmModalMessage } from "@/utils/helpers";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -75%)",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "15px",
  px: 4,
  py: 3,
  minWidth: 500,
};

export default function ConfirmModal(props: IConfirmModal) {
  const confirmMsg = getConfirmModalMessage("delete_warning");
  return (
    <div>
      <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className="!p-4">
            <Typography className={`flex justify-center text-red-500`} id="modal-modal-title" component={"span"} variant={"h2"}>
              {confirmMsg.title}
            </Typography>
          </DialogTitle>
          <DialogContent className="!px-4">
            <DialogContentText id="alert-dialog-description">
              <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5" className="font-bold text-zinc-700" component={"span"}>
                {confirmMsg.message}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="!p-4">
            <Button onClick={() => props.handleClose(true)} variant="contained" color="error">
              Confirm
            </Button>
            <Button onClick={() => props.handleClose(false)} variant="contained" color="inherit">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
