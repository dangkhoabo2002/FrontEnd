import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import SubBtn from "../components/subscribeBtn";
import nonIcon from "../assets/non-icon.png";
import { Link } from "react-router-dom";

export default function NonSubscribeModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Subscribe Us!
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            borderRadius: "15px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex flex-row justify-center mb-5">
            <img loading="lazy" src={nonIcon} style={{ width: "50px" }} />
          </div>
          <Typography id="modal-title" variant="h6" component="h2">
          Your subscription expired!{" "}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Don't miss the chance to continue enjoying the superior features and
            uninterrupted convenience of our service. Renew now to stay updated
            with the latest improvements and keep receiving dedicated support
            from our professional customer care team.{" "}
          </Typography>
          <Link to={"../subscribe"}>
            <div className="mt-5">
              <SubBtn sx={{}} />
            </div>
          </Link>
        </Box>
      </Modal>
    </>
  );
}
