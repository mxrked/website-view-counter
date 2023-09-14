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
    <div
      style={{
        textAlign: "center",
        paddingTop: "35px",
        paddingBottom: "35px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <br />
      <h1>Website Visits Counter</h1>

      {TOTAL_UNIQUE_IPS !== null ? (
        <p
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You have{" "}
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {TOTAL_UNIQUE_IPS}
          </span>{" "}
          visits.
        </p>
      ) : (
        <p>Loading ...</p>
      )}

      <br />
      <br />

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
