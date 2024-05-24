import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SidebarUser from "../components/sidebarUser";
import NavigationUser from "../components/navUserProfile";
import chip from "../assets/chip.png";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../css/userSubscribe.css";

import handleCheckPass from "../functions/checkPass";

export default function UserSubscribe() {
  const [packageData, setPackageData] = useState([]);
  const [getPackagePurchased, setGetPackagePurchased] = useState();
  const [getSubPurchased, setGetSubPurchased] = useState();
  const [isSub, setIsSub] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openChangeDialog, setOpenChangeDialog] = useState(false);
  const [password, setPassword] = useState("");

  const handlePackage = async () => {
    toast.loading("In processing..");
    const packageUrl = "http://127.0.0.1:5000/package/get";

    try {
      const response = await fetch(packageUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        setPackageData(data);
      } else {
        toast.dismiss();
        console.error("Failed to fetch package data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetSubPurchased = async () => {
    toast.loading("In processing..");
    const packageUrl =
      "http://127.0.0.1:5000/subscription/get_subscriptions_by_customer_id";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(packageUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        setGetSubPurchased(data);
        handleGetPackagePurchased(data[0].subscription_type);
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 404) {
        toast.dismiss();
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch {
    } finally {
    }
  };

  const handleGetPackagePurchased = async (package_id) => {
    toast.loading("In processing..");
    const packageUrl = `http://127.0.0.1:5000/package/get/${package_id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(packageUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        setGetPackagePurchased(data);
        console.log(data);
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 404) {
        toast.error("Your organization's list is empty!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch {
    } finally {
    }
  };

  const handleGetSub = async () => {
    const editUrl = `http://127.0.0.1:5000/subscription/check_subscription_by_username`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        setIsSub(true);
      } else {
        setIsSub(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelPackageAPI = async () => {
    const editUrl = `http://127.0.0.1:5000/subscription/update_subscription_status/${getPackagePurchased.package_id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          new_status: "INACTIVE",
        }),
      });
      if (response.status === 200) {
        setIsSub(true);
      } else {
        setIsSub(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetSubPurchased();
    handleGetSub();
    handlePackage();
  }, []);

  const handleCancelPackage = () => {
    setOpenCancelDialog(true);
  };

  const handleChangePackage = () => {
    setOpenChangeDialog(true);
  };

  const handleConfirmCancel = async () => {
    const checkPass = await handleCheckPass(password);
    if (checkPass === "Success") {
      handleCancelPackageAPI();
      setOpenCancelDialog(false);
    } else if (checkPass === "") {
      toast.error("Incorrect password!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  const handleConfirmChange = async () => {
    const checkPass = await handleCheckPass(password);
    if (checkPass === "Success") {
      // Add the logic to handle the package change here
      setOpenChangeDialog(false);
    } else if (checkPass === "") {
      toast.error("Incorrect password!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenCancelDialog(false);
    setOpenChangeDialog(false);
  };

  return (
    <div className="">
      <NavigationUser />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "52vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarUser />
        </div>
        <div className="flex flex-col px-20 py-10 bg-[#F3F8FF]">
          <div className="purchasedPackage flex flex-col gap-y-4">
            <span>
              <h1>YOUR SUBSCRIPTION</h1>
              <h2>
                These are your current subscriptions. They will be charged
                within the same billing cycle. You can update at any time.
              </h2>
            </span>
            {isSub ? (
              <div className="packageCard">
                <div className="imgCard">
                  <img loading="lazy" src={chip} />
                </div>
                <Divider orientation="vertical" variant="middle" />
                <div className="packageInfo px-20">
                  <span className="flex flex-row items-center">
                    <p className="font-bold text-large text-[#3867A5]">
                      {getPackagePurchased?.package_name}
                    </p>
                    <p className="text-slate-400 pl-10">
                      {getPackagePurchased?.duration}
                    </p>
                  </span>
                  <span>
                    <h2>Organization:</h2>
                    <ul>
                      <li>{getPackagePurchased?.slot_number} numbers</li>
                      <li>{getPackagePurchased?.slot_server} servers</li>
                    </ul>
                  </span>
                </div>
                <div className="packageSetting flex flex-col justify-around pl-1">
                  <Button variant="text" onClick={handleCancelPackage}>
                    Cancel package
                  </Button>
                  <Button variant="contained" onClick={handleChangePackage}>
                    Change package
                  </Button>
                </div>
              </div>
            ) : (
              <div className="packageBundle">
                {packageData?.map((pkg) => (
                  <div className="package" key={pkg.package_id}>
                    <h1 className="text-center font-bold text-2xl">
                      {pkg.package_name}
                    </h1>
                    <Divider orientation="horizontal" variant="middle" />
                    <span className="flex flex-col items-left pl-10 py-4">
                      <p>{pkg.description} Organizations</p>
                      <p className="py-2">Organization:</p>
                      <ul className="pl-12">
                        <li>{pkg.slot_number} Admins</li>
                        <li>{pkg.slot_server} Members</li>
                      </ul>
                      <p className="font-bold text-2xl italic pt-8">
                        ${pkg.price}/ month
                      </p>
                    </span>
                    <div className="flex justify-center">
                      <Link to={`/user/subscribe/payment`}>
                        <button className="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white py-2 px-4 border border-[#3867A5] hover:border-transparent rounded shadow-md w-40">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="billingInfo">
            <h1>PAY</h1>
            <div className="billingInfoBox rounded-lg bg-[#DFEDFF] px-8 py-4">
              <h1>BILLING INFORMATION</h1>
              {isSub ? (
                <h2>
                  {getSubPurchased &&
                    getSubPurchased.map((sub) => (
                      <p key={sub.subscription_id}>
                        The package will automatically renew on{" "}
                        {sub.expiration_date}.
                      </p>
                    ))}
                </h2>
              ) : (
                <h2 className="text-[red]">
                  You don't have any packages yet, please Subscribe to continue
                  experiencing.
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CANCEL PACKAGE */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel Package"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Are you sure you want to cancel the current package? This action
            cannot be undone. Please click confirm to proceed.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmCancel}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* CHANGE PACKAGE */}
      <Dialog
        open={openChangeDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Package"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            To change your current package, please enter your password to
            confirm.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmChange}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
