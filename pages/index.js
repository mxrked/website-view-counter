// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/modules/Index/Index.module.css";

export default function Home() {
  const router = useRouter();
  const [TOTAL_UNIQUE_IPS, SET_TOTAL_UNIQUE_IPS] = useState(null);

  useEffect(() => {
    // Fetching the api route data
    fetch("/api/trackIps")
      .then((response) => response.json())
      .then((data) => {
        SET_TOTAL_UNIQUE_IPS(data.TOTAL_UNIQUE_IPS);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }, []);

  return (
    <div>
      <h1>Total Number of Visits</h1>

      {TOTAL_UNIQUE_IPS !== null ? (
        <p>
          You have <strong>{TOTAL_UNIQUE_IPS}</strong> visits on this website!.
        </p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}
