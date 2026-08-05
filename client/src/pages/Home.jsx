import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DelegateCard from "../components/DelegateCard";

import { getDelegates } from "../services/delegateService";

function Home() {
  const [delegates, setDelegates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDelegates = async () => {
      const data = await getDelegates();
      setDelegates(data);
    };

    fetchDelegates();
  }, []);

  const filteredDelegates = delegates.filter((delegate) =>
    `${delegate.fullName} ${delegate.designation} ${delegate.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            Find Summit Delegates
          </h2>

          <p className="text-gray-600 mt-2">
            Browse delegates from MasterMinds Business School
            leadership summits.
          </p>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <p className="my-6 text-gray-600">
          Showing {filteredDelegates.length} delegate(s)
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDelegates.map((delegate) => (
            <DelegateCard
              key={delegate._id}
              delegate={delegate}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;