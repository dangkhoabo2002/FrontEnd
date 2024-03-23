import React from "react";

import Libraries from "../data/listOfLibrary.json";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function ServerLibrary() {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  return (
    <>
      <div>
        <h1 className="text-2xl pb-10 pt-2">Library Settings</h1>
        <div className="flex flex-row flex-wrap gap-10 w-3/3">
          {Libraries.map((lib) => (
            <div className="flex flex-row justify-left items-center gap-8 rounded-md shadow-lg border px-12 py-6 w-2/7">
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
