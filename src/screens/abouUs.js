import React from "react";
import Navigation from "../components/Navigation";
import "../css/aboutUs.css";
import Footer from "../components/Footer";
import { Box, Typography, div } from "@mui/material";

export default function AboutUs() {
  return (
    <div>
      <div className="intro-title">
        <div className="intro-title-head my-8">
          <p className="">HI, WE ARE</p>
          <p>MASTER HELP DESK DEVELOPERS</p>
        </div>
        <p
          className=""
          style={{ fontWeight: "500", textAlign: "justify", fontSize: "16px" }}
        >
          Master Help Desk (MHD) is a groundbreaking project aimed at improving
          server management and configuration for small and medium-sized
          enterprises (SMEs). With a mission to help businesses save costs and
          enhance productivity, MHD provides an advanced, user-friendly, and
          flexible web application. By combining powerful features and high
          security, MHD helps enterprises maintain stable and secure server
          environments. With Master Help Desk, businesses can easily manage and
          configure applications and tools on servers, while monitoring server
          health and receiving alerts for performance and security issues. MHD
          offers a comprehensive solution, from user requirement analysis,
          architecture design, system deployment to documentation and technical
          support. With Master Help Desk, businesses can not only save personnel
          costs but also increase work productivity and respond quickly to
          market changes.
        </p>
      </div>
      {/* line */}
      <div className="">
        <Box className="flex flex-row my-20">
          <div className="flex flex-col">
            <div className="px-10 mb-20" sx={{ p: 2 }}>
              <div className="flex flex-row items-center mb-2">
                <div className="number-circle">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "400",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    1
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  sx={{ ml: 2, fontWeight: "500", fontSize: "2rem" }}
                >
                  Establishment
                </Typography>
              </div>
              <div className="border-left-4 border-solid border-blue-500 pl-2">
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </div>
            </div>
            <div className="px-10 mb-10" sx={{ p: 2 }}>
              <div className="flex flex-row items-center mb-2">
                <div className="number-circle">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "400",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    3
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  sx={{ ml: 2, fontWeight: "500", fontSize: "2rem" }}
                >
                  Vision and Scope
                </Typography>
              </div>
              <div className="border-left-4 border-solid border-blue-500 pl-2">
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="px-10 mb-20 " sx={{ p: 2 }}>
              <div className="flex flex-row items-center mb-2">
                <div className="number-circle">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "400",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  sx={{ ml: 2, fontWeight: "500", fontSize: "2rem" }}
                >
                  Development
                </Typography>
              </div>
              <div className="border-left-4 border-solid border-blue-500 pl-2">
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </div>
            </div>
            <div className="px-10 mb-10" sx={{ p: 2 }}>
              <div className="flex flex-row items-center mb-2">
                <div className="number-circle">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "400",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    4
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  sx={{ ml: 2, fontWeight: "500", fontSize: "2rem" }}
                >
                  Value
                </Typography>
              </div>
              <div className="border-left-4 border-solid border-blue-500 pl-2">
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
