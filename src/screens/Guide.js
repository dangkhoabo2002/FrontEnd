import React, { useState } from "react";
import SearchBar from "../components/searchBar";
import BookIcon from "@mui/icons-material/Book";
import Accordion from "../components/guideAccodion";
import Footer from "../components/userFooter";
import { useNavigate } from "react-router-dom";

export default function Guide() {
  const navigate = useNavigate();

  const handleGuide = async () => {
    const guideUrl = "http://127.0.0.1:5000/guide/get";
    try {
      const response = await fetch(guideUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  return (
    <>
      <div>
        <div className="container px-20">
          <div className=" py-6 text-center border-b-2 border-stone-200 gap-10">
            <div className="header flex flex-row items-center gap-x-3">
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
          <div className="body mt-3">
            <SearchBar />
          </div>
          <div className="body mt-3">
            <Accordion />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
