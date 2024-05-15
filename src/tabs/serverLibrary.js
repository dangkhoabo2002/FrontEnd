import React, { useState, useEffect } from "react";

import Libraries from "../data/listOfLibrary.json";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

export default function ServerLibrary(serverId) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        toast.success("Install successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleGetLib();
      } else if (response.status === 400) {
        toast.error("Missing server information!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUninstallLibraryAPI = async (libName) => {
    const editUrl = `http://127.0.0.1:5000/server/uninstall_lib/${serverId.serverId}`;
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
        toast.success("Uninstall successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleGetLib();
      } else if (response.status === 400) {
        toast.error("Missing server information!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
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
      } else if (response.status === 400) {
        toast.error("Missing server information!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetLib();
  }, []);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div>
        <div className="flex flex-row justify-between items-center pr-6">
          <div className="info-title font-semibold mb-3">
            <p>Library</p>
          </div>
          {/* <Button variant="text" size="large" onClick={handleFilterClick}>
            {showOnlyNotInstalled ? "Not Installed" : "Installed"}
          </Button> */}
        </div>
        <div className="flex flex-row flex-wrap gap-10 w-3/3">
          {loading && (
            <Box sx={{ width: "96%" }}>
              <LinearProgress />
            </Box>
          )}

          {listLib &&
            listLib?.map((lib) => (
              <div
                key={lib.id}
                style={{ border: "1px solid #89A6CC" }}
                className="bg-[white] flex flex-row justify-left items-center gap-8 rounded-md shadow-lg border px-12 py-6 w-2/7"
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
                    {lib.installed === "False" ? "Not Installed" : "Installed"}
                  </h2>
                  {lib.installed == "False" ? (
                    <LoadingButton
                      size="small"
                      color="secondary"
                      onClick={() => handleInstallLibraryAPI(lib.library)}
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Install
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      size="small"
                      color="secondary"
                      onClick={() => handleInstallLibraryAPI(lib.library)}
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Uninstall
                    </LoadingButton>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="resultOutput mt-10">
          <h1 className="text-2xl my-3">Output result</h1>
          <textarea
            className="w-full resize-none rounded-md p-4"
            style={{
              border: "1px solid #89A6CC",
              maxHeight: "8em",
              overflow: "auto",
            }}
          >
            Build successfully
          </textarea>
        </div>
      </div>
    </>
  );
}
