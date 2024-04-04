import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    const logoutUrl = "http://127.0.0.1:5000/manager/logout";
    try {
      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        navigate("/");
        console.log("Logout Success");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" sx={{backgroundColor:"#3867A5","&:hover": { bgcolor: "#2B4B75" },}} onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation!"}</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>

        <DialogActions>
          <Button sx={{ color: "red" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleLogout}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
