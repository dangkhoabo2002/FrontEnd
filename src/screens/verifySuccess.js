import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  commonBox: {
    width: '80%',
    maxWidth: '600px',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
});

export default function VerifySuccess() {
  const classes = useStyles();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className={`${classes.commonBox} flex flex-col items-center`}>
        <CheckCircleOutlineIcon className="text-green-500" style={{ fontSize: 80 }} />
        <h1 className="text-2xl font-bold mb-2 text-green-600">
          Verification Complete!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for verifying your email. You can now continue to use our services.
        </p>
        <Button
          variant="contained"
          color="primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
