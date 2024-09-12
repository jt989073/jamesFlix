import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistroy] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get("/api/search/history");
        setSearchHistroy(res.data.content);
      } catch (error) {
        console.log(error.message);
        setSearchHistroy([]);
      }
    };

    getHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/search/history/${entry.id}`);
      setSearchHistroy(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      toast.error("Failed to delete Search Item");
    }
  };

  if (!searchHistory.length) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search history</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No Search History Found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-whitee min-h-screen">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search history</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rouonded flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History Image"
                className="size-16 rounded full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.serachType === "movie"
                    ? "bg-red-600"
                    : entry.serachType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.serachType[0].toUpperCase() + entry.serachType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={(e) => handleDelete(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
