import { useState } from "react";
import { db } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import mainBG from "./assets/space.png";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResults] = useState<any>({ callsign: "" });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const collectionRef = collection(db, "fcc_amateur_yohannes");
      const q = query(
        collectionRef,
        where("callsign", ">=", searchQuery),
        where("callsign", "<=", searchQuery + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setResults([]);
      } else {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const flattenedData = data.reduce((acc, item) => {
          return { ...acc, ...item };
        }, {});

        setResults(flattenedData);
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center "
      style={{ backgroundImage: `url(${mainBG})` }}
    >
      <div className="bg-[#0a0a38ab] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">
          DMR ID Lookup
        </h1>
        <form onSubmit={handleSearch} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter DMR ID"
            value={searchQuery}
            required
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {loading ? (
          <p className="text-white text-center">Searching...</p>
        ) : result.callsign != "" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 bg-white p-4 rounded-lg shadow-md text-gray-800">
              <h2 className="text-2xl font-bold col-span-2 mb-4">
                {result.full_name}
              </h2>

              <strong>Callsign:</strong>
              <span>{result.callsign}</span>
              <strong>Address:</strong>
              <span>
                {" "}
                {result.address1}, {result.city}, {result.state}, {result.zip}
              </span>
              <strong>Status:</strong>
              <span>{result.status}</span>
              <strong>Grant Date:</strong>
              <span>
                {result.grant_date ? result.grant_date.slice(0, 10) : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 bg-white p-4 rounded-lg shadow-md text-gray-800">
              <strong>First Name:</strong>
              <span>{result.first}</span>
              <strong>Middle Name:</strong>
              <span>{result.middle}</span>
              <strong>Last Name:</strong>
              <span>{result.first}</span>
            </div>

            <div className="grid grid-cols-2 bg-white p-4 rounded-lg shadow-md text-gray-800">
              <strong>Radio Service Code:</strong>
              <span>{result.radio_service_code}</span>
              <strong>State:</strong>
              <span>{result.state}</span>
              <strong>City:</strong>
              <span>{result.city}</span>
              <strong>Zip:</strong>
              <span>{result.zip}</span>
            </div>
          </div>
        ) : (
          <p className="text-white text-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
