import React, { useState } from "react";
import { accounts } from "./accounts";

export default function Login({ setCurrentAccount }) {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Buscar la cuenta por username
    const username = user.trim().toLowerCase();
    const account = accounts.find((acc) => {
      // El username es la concatenación de las iniciales del owner
      const accUsername = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
      return accUsername === username;
    });
    if (account && account.pin === Number(pin)) {
      setCurrentAccount(account);
      setError("");
    } else {
      setError("Usuario o PIN incorrecto");
    }
  };

  return (
    <>
      <p className="welcome">Log in to get started</p>
      <img src="/logo.png" alt="Logo" className="logo" />
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="user"
          className="login__input login__input--user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button className="login__btn">&rarr;</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </>
  );
}
