import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContext";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();

  console.log(trendingContent);
  return (
    <>
      {trendingContent && (
        <div className="relative h-screen text-white">
          <Navbar />
          <img
            src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
            alt="Hero img"
            className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          />
          <div
            className="absolute top-0 left-0 w-full h-full object-cover bg-black/50 -z-50"
            aria-hidden="true"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
            <div
              className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10"
              aria-hidden="true"
            />

            <div className="max-w-2xl">
              <h1 className="mt-4 text-6xl font-extrabold text-balance">
                {trendingContent?.title || trendingContent?.name}
              </h1>
              <p className="mt-2 text-lg">
                {trendingContent.release_date?.split("-")[0] ||
                  trendingContent.first_air_date?.split("-")[0]}{" "}
                | {trendingContent.adult ? "18+" : "PG-13"}
              </p>
              <p className="mt-4 text-lg">{trendingContent.overview}</p>
              <div className="flex mt-8">
                <Link
                  to="/watch/32"
                  className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
                >
                  <Play className="size-6 mr-2 fill-black cursor-pointer" />
                  Play
                </Link>
                <Link
                  to="/watch/32"
                  className="bg-gray-500/50 hover:bg-gray-500 py-2 px-4 rounded flex items-center"
                >
                  <Info className="size-6 mr-2 cursor-pointer" />
                  MoreInfo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
