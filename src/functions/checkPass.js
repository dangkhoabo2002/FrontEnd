import toast from "react-hot-toast";

export default async function handleCheckPass(pass_input) {
  if (pass_input) {
    const passCheck = pass_input;
    const url = "http://127.0.0.1:5000/auth/check_pass";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          password: passCheck,
        }),
      });
      if (response.status === 200) {
        const res = await response.json();
        return res.message;
      } else if (response.status === 403) {
        toast.error("Incorrect password, please try again!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
        return false;
      } else {
        toast.error("Unknown error, please try again later!", {
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
  } else {
    toast.error("Please input your user's Password!", {
      style: {
        border: "1px solid #F85F60",
        maxWidth: "900px",
        padding: "16px 24px",
        color: "red",
        fontWeight: "bolder",
      },
    });
  }
}
