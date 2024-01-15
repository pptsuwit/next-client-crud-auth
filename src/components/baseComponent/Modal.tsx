import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MUIModal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -75%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "15px",
  px: 4,
  py: 3,
  minWidth: "500px",
};

export default function Modal(props: IModal) {
  return (
    <div>
      <MUIModal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex justify-center mb-2">
            {props.body.status === "success" && <CheckCircleIcon className="!text-[80px] text-green-500" />}
            {props.body.status === "error" && <DangerousIcon className="!text-[80px] text-red-500"></DangerousIcon>}
            {props.body.status === "warn" && <ErrorIcon className="!text-[80px] text-yellow-500"></ErrorIcon>}
          </div>
          <Typography
            className={` text-center ${props.body.status === "success" ? "text-green-500" : props.body.status === "error" ? "text-red-500" : ""}`}
            id="modal-modal-title"
            variant="h3"
          >
            {props.body.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5" className="font-bold text-center">
            {props.body.message}
          </Typography>
          <Stack spacing={2} direction="row" className="flex justify-end mt-10">
            <Button onClick={props.handleClose} variant="contained" className="font-bold normal-case !bg-[#bdbdbd]">
              Close
            </Button>
          </Stack>
        </Box>
      </MUIModal>
    </div>
  );
}
