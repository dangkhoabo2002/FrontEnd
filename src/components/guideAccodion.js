import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import listOfGuides from "../database/listOfGuide.json";
import { useNavigate } from "react-router-dom";

export default function AccordionExpandIcon() {
  const navigate = useNavigate();

  const handleGuide = async () => {
    const guideUrl = "http://127.0.0.1:5000/guide/get";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(guideUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    handleGuide();
  }, []);

  return (
    <div>
      {data?.map((guide, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography>{guide.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{guide.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
