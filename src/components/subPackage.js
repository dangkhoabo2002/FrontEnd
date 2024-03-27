import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";

import "../css/subPackage.css";
import { Link } from "react-router-dom";
const packages = [
  {
    id: 1,
    title: "Package 1",
    orgs: 2,
    admins: 2,
    members: 5,
    price: "$4 / month",
  },
  {
    id: 2,
    title: "Package 2",
    orgs: 5,
    admins: 2,
    members: 10,
    price: "$9 / month",
  },
  {
    id: 3,
    title: "Package 3",
    orgs: 7,
    admins: 5,
    members: 20,
    price: "$19 / month",
  },
];

export default function SubscriptionPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <>
      <Grid
        style={{ height: "76vh" }}
        container
        spacing={5}
        justifyContent="center"
        className="px-32 py-10"
      >
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card
              style={{
                borderRadius: "20px",
                border: `2px solid ${
                  selectedPackage && selectedPackage.id === pkg.id
                    ? "#3867A5"
                    : "#DFEDFF"
                }`,
              }}
              variant="outlined"
              sx={{ maxWidth: 345, m: 2 }}
            >
              <CardActionArea
                onClick={() => setSelectedPackage(pkg)}
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
                    {pkg.title}
                  </Typography>
                  <span className="pt-10 pl-10">
                    <h1>{pkg.orgs} Organizations</h1>
                    <h1>Organization:</h1>
                    <ul>
                      <li>
                        <h1> {pkg.admins} Admin </h1>
                      </li>
                      <li>
                        <h1> {pkg.members} Members</h1>
                      </li>
                    </ul>
                  </span>

                  {/* <Typography variant="body2" color="text.secondary">
                    {pkg.orgs} Organizations Organization: <br />- {pkg.admins}{" "}
                    Super Admin - {pkg.members} Members
                  </Typography> */}
                  <Typography
                    className="text-center"
                    color="text.primary"
                    style={{ marginTop: 40, fontSize: "32px", bottom: "10px" }}
                  >
                    <i>{pkg.price}</i>
                  </Typography>
                </CardContent>
                <div
                  className="mb-3"
                  style={{ bottom: "20px", width: "100%", textAlign: "center" }}
                >
                  <Link to={"/user/subscribe/payment"}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        selectedPackage && selectedPackage.id === pkg.id
                          ? "#3867A5"
                          : "white",
                      color:
                        selectedPackage && selectedPackage.id === pkg.id
                          ? "white"
                          : "#3867A5",
                      margin: "auto",
                      width: "50%",
                    }}
                  >
                    Buy Now
                  </Button></Link>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
