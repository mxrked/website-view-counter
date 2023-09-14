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
  const [USER_IP_ADDRESS, SET_USER_IP_ADDRESS] = useState(null);
  const [TOTAL_UNIQUE_IPS, SET_TOTAL_UNIQUE_IPS] = useState(null);

  // Fetching the total number of visits via unique IP addresses
  useEffect(() => {
    fetch("/api/trackIps")
      .then((response) => response.json())
      .then((data) => {
        SET_TOTAL_UNIQUE_IPS(data.TOTAL_UNIQUE_IPS);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }, []);

  // Displaying the current user's IP address
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        SET_USER_IP_ADDRESS(data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address: " + error);
      });
  }, []);

  return (
    <div>
      <h1>Total Number of Visits</h1>

      {TOTAL_UNIQUE_IPS !== null ? (
        <p>Total: {TOTAL_UNIQUE_IPS} visits.</p>
      ) : (
        <p>Loading ...</p>
      )}

      {USER_IP_ADDRESS !== null ? (
        <div>
          <h3>Your IP Address:</h3>
          <span>
            <strong>{USER_IP_ADDRESS}</strong>
          </span>
        </div>
      ) : (
        <p>Loading ...</p>
      )}

      {/**
        <br />
      <br />
      <span>
        <h3>
          Current User's IP Address:
          <span>
            <strong>{USER_IP_ADDRESS}</strong>
          </span>
        </h3>
      </span>
      */}
    </div>
  );
}
