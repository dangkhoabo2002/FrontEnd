export default function handleCheckPass(pass_input) {
  const handleCheckPass = async () => {
    const getUrl = "http://127.0.0.1:5000/auth/check_pass";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          password: pass_input,
        }),
      });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  if (pass_input) {
    handleCheckPass();
  }
}
