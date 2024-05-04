import React, { useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import Accordion from "../components/guideAccodion";

export default function Guide() {
  return (
    <>
      <div className="" style={{ backgroundColor: "#f3f3fb", height:"105vh"}}>
        <div
          className=" py-6 text-center gap-10"
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="header flex flex-row items-center gap-x-3  px-20">
            <BookIcon
              style={{ width: "32px", height: "32px", color: "#637381" }}
            />
            <p
              className="font-semibold"
              style={{ fontSize: "28px", color: "#637381" }}
            >
              Guide
            </p>
          </div>
        </div>

        <div className="container px-20">
          <div className="body mt-6 pb-2">
            <Accordion />
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
