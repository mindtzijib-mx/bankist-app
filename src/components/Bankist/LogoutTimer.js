import React from "react";

export default function LogoutTimer({ timer }) {
  // Formatear el tiempo en mm:ss
  const min = String(Math.trunc(timer / 60)).padStart(2, "0");
  const sec = String(timer % 60).padStart(2, "0");

  return (
    <p className="logout-timer">
      You will be logged out in{" "}
      <span className="timer">
        {min}:{sec}
      </span>
    </p>
  );
}
