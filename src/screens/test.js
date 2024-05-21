import React from "react";

function DownloadButton() {
  const handleDownload = async () => {
    const file_path = "/usr/bin/file_storage/test";
    const encodedFilePath = btoa(file_path);
    const token = localStorage.getItem("access_token");

    try {
      // Fetch the file from the backend
      const response = await fetch(
        `http://localhost:5000/server/download_folder/zIXigWAZyWKLJPzLp0jJtMYIVdpn3JY_RbGAFsLsEI?folder=${encodedFilePath}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Expose-Headers": "Content-Disposition",
          },
        }
      );
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Extract the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      console.log(contentDisposition);
      let fileName = "default_filename.txt"; // Default filename in case Content-Disposition is not available

      if (contentDisposition) {
        // Parse the Content-Disposition header to get the filename
        const matches = contentDisposition.match(/filename="(.+)"/i);
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
        }
      }

      // Create a blob from the response data
      const blob = await response.blob();

      // Generate a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to start the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Dynamically set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleDownload}>Download File</button>;
}

export default DownloadButton;
