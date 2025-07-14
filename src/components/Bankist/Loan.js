import React, { useState } from "react";

export default function Loan({ currentAccount, onLoan }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = onLoan(Number(amount));
    setAmount("");
    setTimeout(() => {
      setLoading(false);
      setMessage(
        ok ? "Préstamo concedido" : "No cumple requisitos para préstamo"
      );
      setTimeout(() => setMessage(""), 2000);
    }, 2500);
  };

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={handleSubmit}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <button className="form__btn form__btn--loan" disabled={loading}>
          &rarr;
        </button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
      {loading && (
        <div style={{ color: "blue", marginTop: 8 }}>Procesando...</div>
      )}
      {message && (
        <div
          style={{
            color: message.includes("concedido") ? "green" : "red",
            marginTop: 8,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
