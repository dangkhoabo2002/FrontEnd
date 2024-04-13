import React, { useState, useEffect } from "react";

import Libraries from "../data/listOfLibrary.json";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";

export default function ServerLibrary(serverId) {
  const [loading, setLoading] = React.useState(false);
  const [showOnlyNotInstalled, setShowOnlyNotInstalled] = useState(false);

  // function handleFilterClick() {
  //   setShowOnlyNotInstalled((prev) => !prev);
  //   const filtered = showOnlyNotInstalled
  //     ? Libraries.filter((lib) => lib.status === true)
  //     : Libraries.filter((lib) => lib.status === false);
  //   setFilteredLibraries(filtered);
  // }

  // INSTALL LIBRARY

  const handleInstallLibraryAPI = async (libName) => {
    console.log(libName);
    const editUrl = `http://127.0.0.1:5000/server/install_lib/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          library: libName,
        }),
      });
      if (response.status === 200) {
        console.log("Success to Install");
        handleGetLib();
      } else {
        alert("Add Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // GET STATUS LIBRARY
  const [filteredLibraries, setFilteredLibraries] = useState(Libraries);
  const [listLib, setListLib] = useState();

  const handleGetLib = async () => {
    const getUrl = `http://127.0.0.1:5000/server/lib_status/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const lib = await response.json();

        setListLib(lib);
        // setLoading(true);
      } else {
        alert("Add Fail");
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  console.error("lib:", listLib);

  useEffect(() => {
    handleGetLib();
  }, []);
  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center pr-6">
          <div className="info-title font-semibold my-3">
            <p>Library</p>
          </div>
          {/* <Button variant="text" size="large" onClick={handleFilterClick}>
            {showOnlyNotInstalled ? "Not Installed" : "Installed"}
          </Button> */}
        </div>
        <div className="flex flex-row flex-wrap gap-10 w-3/3">
          {listLib &&
            listLib?.map((lib) => (
              <div
                key={lib.id}
                className="flex flex-row justify-left items-center gap-8 rounded-md shadow-lg border px-12 py-6 w-2/7"
              >
                <img
                  loading="lazy"
                  className="w-20 object-contain"
                  src={
                    filteredLibraries
                      ? filteredLibraries.find(
                          (libFilter) => libFilter.name === lib?.library
                        ).image
                      : ""
                  }
                />
                <div className="flex flex-col items-center">
                  <h1 className="uppercase">{lib.library}</h1>
                  <h2 className="text-[14px] pb-2">
                    {lib.installed == true ? "Installed" : "Not Installed"}
                  </h2>
                  {lib.installed == true ? (
                    <LoadingButton
                      size="small"
                      color="secondary"
                      onClick={() => handleInstallLibraryAPI(lib.library)}
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Uninstall
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      size="small"
                      color="secondary"
                      onClick={() => handleInstallLibraryAPI(lib.library)}
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Install
                    </LoadingButton>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
