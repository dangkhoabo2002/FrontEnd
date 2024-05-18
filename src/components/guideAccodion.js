import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import issue from "../assets/issue.png";
import toast from "react-hot-toast";

export default function AccordionExpandIcon() {
  const handleGuide = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    toast.loading("In processing..");
    const guideUrl = "https://master-help-desk-back-end.vercel.app/guide/get";
=======
    const guideUrl = "http://127.0.0.1:5000/guide/get";
>>>>>>> mergeBranch
=======
    const guideUrl = "https://master-help-desk-back-end.vercel.app/guide/get";
>>>>>>> mergeBranch
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
      } else if (response.status === 404) {
        toast.error("Guide not found!", {
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
      setError(error.message);
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(null);

  const filteredData = data.filter((guide) =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPopup = (guide) => {
    setSelectedGuide(guide);
  };

  const closePopup = () => {
    setSelectedGuide(null);
  };

  const handlePopupClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const [technologyImages, setTechnologyImages] = useState([]);

  useEffect(() => {
    handleGuide().finally(() => setLoading(false));

    const fixedTechnologyImages = [
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg",
      "https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?height=399&width=711&fit=bounds",
      "https://www.globalfocusmagazine.com/wp-content/uploads/2020/02/Engaging_with_technology-scaled.jpg",
      "https://www.crowe.com/-/media/crowe/llp/sc10-media/insights/articles/2023/content-2000x1125/contentmktmt2300002bfy23-markets-technology-awareness--whats-next-for-tech--thought-leadershipas3639.jpg?rev=025a044aa9394515a261e9c6242045cb",
      "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/22cfd11/2147483647/resize/800x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2F56%2F5e%2F0b3cdc9c4126a6da872014b96248%2Fadobestock-152613619.jpg",
      "https://cdn.lawnet.vn/nhch-images/images/2023/LTP/thang1/business-information-technology.jpg",
      "https://sandpipercomms.com/wp-content/uploads/2021/08/shutterstock_1932042689-scaled.jpg",
      "https://d1y8sb8igg2f8e.cloudfront.net/images/7_things_you_should_read_about_technologys_rol.width-800.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0tHJ4BM9QG3tNfF5lIOxK3tlZO3xXRRm_A&usqp=CAU",
      "https://res.edu.vn/wp-content/uploads/2021/12/ielts-writing-task-2-topic-technology.jpg",
    ];
    setTechnologyImages([...fixedTechnologyImages]);
  }, []);

  return (
    <div>
      <div className="search right-0 top-0">
        <div className="flex justify-start max-w-sm mb-4">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search key.."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading && <CircularProgress />}
      {error && (
        <Typography className="text-red-500">Error: {error.message}</Typography>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.map((guide, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md cursor-pointer"
              onClick={() => openPopup(guide)}
            >
              <img
                loading="lazy"
                className="rounded-t-lg object-cover w-full h-48 p-2 "
                style={{ borderRadius: "10px" }}
                src={technologyImages[index % technologyImages.length]}
                alt="imgCard"
              />
              <div className="p-4">
                <h5
                  className="mb-2 text-xl-center font-bold text-gray-900 dark:text-white"
                  style={{ textAlign: "center" }}
                >
                  {guide.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedGuide && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
          onClick={handlePopupClick}
        >
          <div
            className="bg-white rounded-lg shadow-md p-4"
            style={{ width: "1000px" }}
          >
            <div className="flex items-center">
              <img
                loading="lazy"
                className="rounded-lg object-cover w-full h-80 mr-10"
                src={issue}
                alt="imgPopup"
              />
              <div>
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedGuide.title}
                </h5>
                <pre
                  className="text-gray-700 dark:text-gray-400"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {selectedGuide.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
