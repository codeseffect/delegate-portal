import { useEffect, useState } from "react";
import { getDelegates } from "../services/delegateService";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DelegateCard from "../components/DelegateCard";

function Home() {
  const [delegates, setDelegates] = useState([]);

  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        const data = await getDelegates();
        setDelegates(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDelegates();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchBar />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {delegates.map((delegate) => (
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