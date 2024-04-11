import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircularProgress from "@mui/material/CircularProgress";

export default function AccordionExpandIcon() {
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
        throw new Error("Failed to fetch guide data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGuide().finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <CircularProgress />}
      {error && (
        <Typography>
          Error:{" "}
          {error.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      )}
      {!loading &&
        !error &&
        data?.map((guide, index) => (
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
