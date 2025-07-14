import React, { useState } from "react";

export default function CloseAccount({ onClose }) {
  const [user, setUser] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onClose(user.trim().toLowerCase(), pin);
    if (ok) {
      setMessage("Cuenta cerrada correctamente");
      setUser("");
      setPin("");
    } else {
      setMessage("Usuario o PIN incorrecto");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <form className="form form--close" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input form__input--user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          maxLength="6"
          className="form__input form__input--pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button className="form__btn form__btn--close">&rarr;</button>
        <label className="form__label">Confirm user</label>
        <label className="form__label">Confirm PIN</label>
      </form>
      {message && (
        <div
          style={{
            color: message.includes("correctamente") ? "green" : "red",
            marginTop: 8,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
