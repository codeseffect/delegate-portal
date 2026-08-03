import { useEffect, useState } from "react";
import { getDelegates } from "../services/delegateService";

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
    <div style={{ padding: "40px" }}>
      <h1>Delegate Directory</h1>

      <hr />

      {delegates.map((delegate) => (
        <div key={delegate._id}>
          <h3>{delegate.fullName}</h3>

          <p>{delegate.designation}</p>

          <p>{delegate.country}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Home;