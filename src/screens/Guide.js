import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SearchBar from "../components/searchBar";
import BookIcon from "@mui/icons-material/Book";
import Accordion from "../components/guideAccodion";

export default function Guide() {
  return (
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
        <Accordion/>
        </div>
      </div>
    </div>
  );
}
