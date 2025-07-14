import React, { useMemo } from "react";

function formatMovementDate(dateStr, locale) {
  const date = new Date(dateStr);
  const now = new Date();
  const daysPassed = Math.round(Math.abs((now - date) / (1000 * 60 * 60 * 24)));
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return date.toLocaleDateString(locale);
}

export default function Movements({ currentAccount, sort }) {
  // 1. Combinar movimientos y fechas
  const combined = useMemo(() => {
    if (!currentAccount) return [];
    return currentAccount.movements.map((mov, i) => ({
      movement: mov,
      date: currentAccount.movementsDates[i],
    }));
  }, [currentAccount]);

  // 2. Ordenar si sort está activo
  const displayed = useMemo(() => {
    if (!sort) return combined;
    // Ordenar por monto ascendente
    return [...combined].sort((a, b) => a.movement - b.movement);
  }, [combined, sort]);

  // 3. Renderizar movimientos
  return (
    <div className="movements">
      {displayed.map((obj, i) => {
        const type = obj.movement > 0 ? "deposit" : "withdrawal";
        return (
          <div className="movements__row" key={i}>
            <div className={`movements__type movements__type--${type}`}>
              {i + 1} {type}
            </div>
            <div className="movements__date">
              {formatMovementDate(obj.date, currentAccount.locale)}
            </div>
            <div className="movements__value">
              {obj.movement.toLocaleString(currentAccount.locale, {
                style: "currency",
                currency: currentAccount.currency,
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
