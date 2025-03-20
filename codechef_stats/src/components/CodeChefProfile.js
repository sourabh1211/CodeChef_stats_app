import { useEffect, useState } from "react";

export default function CodeChefProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://codechef-api.vercel.app/handle/shwetank00")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl font-bold text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-800 rounded-2xl shadow-2xl text-white text-center border border-gray-600">
      <img src={data.profile} alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-gray-400 shadow-lg" />
      <h2 className="text-2xl font-extrabold mt-4">{data.name}</h2>
      <div className="mt-4 space-y-3 text-lg text-gray-300">
        <p className="bg-gray-700 p-3 rounded-lg shadow-md">⭐ Stars: {data.stars}</p>
        <p className="bg-gray-700 p-3 rounded-lg shadow-md">📊 Current Rating: {data.currentRating}</p>
        <p className="bg-gray-700 p-3 rounded-lg shadow-md">🏆 Highest Rating: {data.highestRating}</p>
        <p className="bg-gray-700 p-3 rounded-lg shadow-md">🌍 Global Rank: {data.globalRank}</p>
        <p className="bg-gray-700 p-3 rounded-lg shadow-md">🇮🇳 Country Rank: {data.countryRank}</p>
      </div>
      <div className="flex justify-center items-center gap-3 mt-4">
        <img src={data.countryFlag} alt={data.countryName} className="w-8 h-6 rounded shadow-md" />
        <span className="text-xl font-semibold">{data.countryName}</span>
      </div>
    </div>
  );
}
