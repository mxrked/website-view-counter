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
  const [totalUniqueIPs, setTotalUniqueIPs] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API route
    const fetchTotalIPCount = async () => {
      try {
        const response = await fetch("/api/trackIps");
        if (response.ok) {
          const data = await response.json();
          const totalIPs = data.TOTAL_UNIQUE_IPS;

          // Store the total IP count in localStorage
          localStorage.setItem("totalIPs", totalIPs);

          // Set the state with the total IP count
          setTotalUniqueIPs(totalIPs);
        } else {
          console.error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Check if the total IP count is already in localStorage
    const storedTotalIPs = localStorage.getItem("totalIPs");
    if (storedTotalIPs !== null) {
      // Use the count from localStorage
      setTotalUniqueIPs(parseInt(storedTotalIPs, 10));
    } else {
      // Fetch and store the count if not found in localStorage
      fetchTotalIPCount();
    }
  }, []);

  return (
    <div>
      <h1>Total Number of Visits</h1>

      {totalUniqueIPs !== null ? (
        <p>
          You have <strong>{totalUniqueIPs}</strong> visits on this website!.
        </p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}
