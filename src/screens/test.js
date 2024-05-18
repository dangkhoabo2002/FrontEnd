import React, { useState } from "react";

const UPLOAD_ENDPOINT =
  "http://127.0.0.1:5000/server/upload_file/zIXigWAZyWKLJPzLp0jJtMYIVdpn3JY_RbGAFsLsEI";

function VendorRegistration() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    setStatus(""); // Reset status
    event.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json(); // Parse response as JSON

      if (response.status === 200) {
        setStatus("Thank you! File uploaded successfully.");
      } else {
        setStatus(`Error uploading file: ${data.message || "Unknown error"}`); // Handle potential error message from server
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`); // Handle fetch errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload File</button>
      {status ? <h1>{status}</h1> : null}
    </form>
  );
}

export default VendorRegistration;

// import React, { useState } from "react";
// import axios from "axios";

// const UPLOAD_ENDPOINT =
//   "http://127.0.0.1:5000/server/upload_file/zIXigWAZyWKLJPzLp0jJtMYIVdpn3JY_RbGAFsLsEI";

// function VendorRegistration() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");

//   const handleSubmit = async (event) => {
//     setStatus(""); // Reset status
//     event.preventDefault();
//     console.log(file);

//     const formData = new FormData();
//     formData.append("avatar", file);
//     console.log(formData);
//     for (var p of formData.entries()) {
//       console.log("formData", p[0] + " - " + p[1]);
//     }
//     const token = localStorage.getItem("access_token");
//     const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setStatus(resp.status === 200 ? "Thank you!" : "Error.");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>React File Upload</h1>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//       <button type="submit">Upload File</button>
//       {status ? <h1>{status}</h1> : null}
//     </form>
//   );
// }

// export default VendorRegistration;
