import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
    toast.loading("In processing..");
    const logoutUrl = "http://127.0.0.1:5000/manager/logout";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        localStorage.clear();
        navigate("/");
        toast.success("Logout success.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.dismiss();
        toast.error("Can not logout, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <React.Fragment>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#3867A5", "&:hover": { bgcolor: "#2B4B75" } }}
        onClick={handleClickOpen}
      >
        Logout
      </Button>
      <Dialog
        open={open}
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
