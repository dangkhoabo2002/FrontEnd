import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "../css/subPackage.css";
import { Link } from "react-router-dom";

export default function SubscriptionPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showButton, setShowButton] = useState(true);

  const [packageData, setPackageData] = useState([]);

  const handleGetPackage = async () => {
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

  useEffect(() => {
    handleGetPackage();
  }, []);

  const handlePackageClick = (pkg) => {
    if (selectedPackage && selectedPackage.package_id === pkg.package_id) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(pkg);
    }
  };

  // BUY PACKAGE

  const handleSendPackage = async (amount) => {
    toast.loading("In processing..");

    const packageUrl = "http://127.0.0.1:5000/billing/add_billing";
    const token = localStorage.getItem("access_token");
    setShowButton(false);
    setTimeout(() => {
      setShowButton(true);
    }, 8000);

    toast.loading("In processing...");
    try {
      const response = await fetch(packageUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });
      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        window.location.href = data.pay_url;
      } else {
        toast.dismiss();
        console.error("Failed to fetch package data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Grid
        style={{ height: "76vh" }}
        container
        spacing={5}
        justifyContent="center"
        className="px-32 py-10"
      >
        {packageData.map((pkg) => (
          <Grid key={pkg.package_id} item xs={12} sm={6} md={4}>
            <Card
              style={{
                borderRadius: "20px",
                border: `2px solid ${
                  selectedPackage &&
                  selectedPackage.package_id === pkg.package_id
                    ? "#3867A5"
                    : "#DFEDFF"
                }`,
              }}
              variant="outlined"
              sx={{ maxWidth: 345, m: 2 }}
            >
              <CardActionArea
                onClick={() => handlePackageClick(pkg)}
                disableRipple
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    className="py-3 text-center border-b-2 border-stone-200"
                    gutterBottom
                    component="div"
                    style={{
                      fontSize: "24px",
                      color: "#3867A5",
                      fontWeight: "500",
                    }}
                  >
                    {pkg.package_name}
                  </Typography>
                  <span className="pt-10 pl-10">
                    <h1>{pkg.description}</h1>
                    <h1>Organization:</h1>
                    <ul>
                      <li>
                        <h1> {pkg.slot_number} slots </h1>
                      </li>
                      <li>
                        <h1> {pkg.slot_server} servers</h1>
                      </li>
                    </ul>
                  </span>

                  <Typography
                    className="text-center"
                    color="text.primary"
                    style={{ marginTop: 40, fontSize: "32px", bottom: "10px" }}
                  >
                    <div className="flex flex-row gap-4 justify-center">
                      <p>{pkg.price}</p>
                      <p>VNĐ</p>
                    </div>
                  </Typography>
                </CardContent>
                <div
                  className="mb-3"
                  style={{ bottom: "20px", width: "100%", textAlign: "center" }}
                >
                  {/* <Link to={"/user/subscribe/payment"}> */}
                  {showButton ? (
                    <Button
                      onClick={() => handleSendPackage(pkg.price)}
                      variant="contained"
                      style={{
                        backgroundColor:
                          selectedPackage &&
                          selectedPackage.package_id === pkg.package_id
                            ? "#3867A5"
                            : "white",
                        color:
                          selectedPackage &&
                          selectedPackage.package_id === pkg.package_id
                            ? "white"
                            : "#3867A5",
                        margin: "auto",
                        width: "50%",
                      }}
                    >
                      Buy Now
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        margin: "auto",
                        width: "50%",
                      }}
                    >
                      Buy Now
                    </Button>
                  )}

                  {/* </Link> */}
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
