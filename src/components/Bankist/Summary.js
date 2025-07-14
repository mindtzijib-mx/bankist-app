import React, { useMemo } from "react";

export default function Summary({ currentAccount, sort, onSort }) {
  // 1. Calcular ingresos (In)
  const inValue = useMemo(() => {
    if (!currentAccount) return 0;
    return currentAccount.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  }, [currentAccount]);

  // 2. Calcular egresos (Out)
  const outValue = useMemo(() => {
    if (!currentAccount) return 0;
    return currentAccount.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  }, [currentAccount]);

  // 3. Calcular intereses (Interest)
  const interestValue = useMemo(() => {
    if (!currentAccount) return 0;
    return currentAccount.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * currentAccount.interestRate) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, int) => acc + int, 0);
  }, [currentAccount]);

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">
        {inValue.toLocaleString(currentAccount.locale, {
          style: "currency",
          currency: currentAccount.currency,
        })}
      </p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">
        {Math.abs(outValue).toLocaleString(currentAccount.locale, {
          style: "currency",
          currency: currentAccount.currency,
        })}
      </p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {interestValue.toLocaleString(currentAccount.locale, {
          style: "currency",
          currency: currentAccount.currency,
        })}
      </p>
      <button className="btn--sort" onClick={onSort}>
        {sort ? "↑ SORT" : "↓ SORT"}
      </button>
    </div>
  );
}
