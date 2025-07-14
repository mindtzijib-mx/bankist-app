import React, { useState } from "react";

export default function Transfer({ currentAccount, onTransfer }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onTransfer(to.trim().toLowerCase(), Number(amount));
    if (ok) {
      setMessage("Transferencia realizada con éxito");
      setTo("");
      setAmount("");
    } else {
      setMessage("Error en la transferencia");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input form__input--to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
      {message && (
        <div
          style={{
            color: message.includes("éxito") ? "green" : "red",
            marginTop: 8,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
