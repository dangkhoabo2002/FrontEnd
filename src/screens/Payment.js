import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import QrCode from 'qrcode.react'; 
import Logo from "../images/MHDLogo.png";

export default function Payment() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: 'background.default',
        flexDirection: 'column',
        backgroundImage: `url('../images/subImg.jpg')`, // Make sure to put the correct path to your background image here
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={Logo} alt="Logo" style={{ width: "96px", height: "96px" }} />
      </div>
      
      {/* Heading */}
      <Typography variant="h4" component="h1" gutterBottom>
        Proceed to payment
      </Typography>
      
      {/* Transaction Code */}
      <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
        Transaction code: 2625348113652523008
      </Typography>

      {/* QR Code */}
      <QrCode value="Your transaction code or URL here" size={200} />
      
      <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
        Scan the QR Code with the Momo app to pay
      </Typography>
      
      {/* Check Transaction Button */}
      <Button variant="contained" sx={{ mt: 4 }}>
        CHECK TRANSACTION RESULTS
      </Button>
    </Box>
  );
}
