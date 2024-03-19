import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  InputAdornment,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import "../css/serverProxy.css"

export default function ServerProxy() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [DomainOrIP, setDomainOrIP] = useState("10001");
  const [Port, setPort] = useState("10001");
  const [selectedOption, setSelectedOption] = useState("enable");

  // Điền thông tin vào Input

  const handleDomainOrIPChange = (event) => {
    setDomainOrIP(event.target.value);
  };
  const handlePortChange = (event) => {
    setPort(event.target.value);
  };
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Toggle Disabled trong TextField và Editable
  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  // Btn radio color
  const CustomRadio = withStyles({
    root: {
      "&$checked": {
        color: "#3867A5",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <div>
      <div className="mb-3">
        <FormControl>
          <div className="info-title font-semibold my-3">
            <p>Proxy Server Setting</p>
          </div>{" "}
          <RadioGroup
          className="mb-3"
            value={selectedOption}
            onChange={handleRadioChange}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              className="custom-radio"
              value="enable"
              control={<CustomRadio />}
              label="Enable"
              disabled={isDisabled}
            />
            <FormControlLabel
            className="custom-radio"
              value="automatic"
              control={<CustomRadio />}
              label="Automatic"
              disabled={isDisabled}
            />
            <FormControlLabel
            className="custom-radio"
              value="disable"
              control={<CustomRadio />}
              label="Disable"
              disabled={isDisabled}
            />
          </RadioGroup>
          <div className="flex flex-row gap-40 mb-3">
            <div className="email">
              <h1 className="mb-2">Domain or IP</h1>

              <TextField
                className="textField"
                mt={1}
                id="outlined-basic"
                value={DomainOrIP}
                onChange={handleDomainOrIPChange}
                disabled={isDisabled}
                size="small"
                sx={{ width: "400px" }}
              />
            </div>
            <div className="">
              <h1 className="mb-2">Port</h1>
              <TextField
                className="textField"
                mt={1}
                id="outlined-basic"
                value={Port}
                onChange={handlePortChange}
                disabled={isDisabled}
                size="small"
                sx={{ width: "260px" }}
              />
            </div>
          </div>
        </FormControl>
      </div>
      <div className="server_des mb-3">
        <Button variant="outlined" onClick={handleEditClick}>
          {isDisabled ? "Update" : "Save Changes"}
        </Button>

        {showResetButton && (
          <Button size="medium" variant="text" onClick={handleEditClick}>
            <span className="btn-cancel">Cancel</span>
          </Button>
        )}
      </div>
    </div>
  );
}
