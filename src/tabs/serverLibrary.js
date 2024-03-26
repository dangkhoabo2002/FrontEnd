import React, { useState } from "react";

import Libraries from "../data/listOfLibrary.json";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";

export default function ServerLibrary() {
  const [loading, setLoading] = React.useState(false);
  const [filteredLibraries, setFilteredLibraries] = useState(Libraries);
  const [showOnlyNotInstalled, setShowOnlyNotInstalled] = useState(false);

  function handleClick() {
    setLoading(true);
  }

  function handleFilterClick() {
    setShowOnlyNotInstalled((prev) => !prev);
    const filtered = showOnlyNotInstalled
      ? Libraries.filter((lib) => lib.status === true)
      : Libraries.filter((lib) => lib.status === false);
    setFilteredLibraries(filtered);
  }
  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center pr-6">
        <div className="info-title font-semibold my-3">
        <p>Library</p>
      </div>          <Button variant="text" size="large" onClick={handleFilterClick}>
            {showOnlyNotInstalled ? "Not Installed" : "Installed"}
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-10 w-3/3">
          {filteredLibraries.map((lib) => (
            <div
              key={lib.id}
              className="flex flex-row justify-left items-center gap-8 rounded-md shadow-lg border px-12 py-6 w-2/7"
            >
              <img className="w-20 object-contain" src={lib.image} />
              <div className="flex flex-col items-center">
                <h1>{lib.name}</h1>
                <h2 className="text-[14px] pb-2">Version: {lib.version}</h2>
                <LoadingButton
                  size="small"
                  color="secondary"
                  onClick={handleClick}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  {!loading && <span>Install</span>}
                  {loading && <span>Installing</span>}
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
