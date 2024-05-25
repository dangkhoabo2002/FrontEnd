import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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

export default function EmailSending() {
  const classes = useStyles();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className={`${classes.commonBox} flex flex-col items-center`}>
        <CircularProgress className="mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-blue-600">
          Sending Mail...
        </h1>
        <p className="text-gray-600 mb-4">
          Please check your mail and click Verify to continue.
        </p>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckCircleOutlineIcon />}
        >
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
}
