import React, { useState, useMemo, useEffect, useRef } from "react";
import "./BankistApp.css";
import Login from "./Login";
import Movements from "./Movements";
import Summary from "./Summary";
import Transfer from "./Transfer";
import Loan from "./Loan";
import CloseAccount from "./CloseAccount";
import LogoutTimer from "./LogoutTimer";
import { accounts as initialAccounts } from "./accounts";

export default function BankistApp() {
  // 1. Estado global de cuentas
  const [accounts, setAccounts] = useState(initialAccounts);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [sort, setSort] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef();

  // 2. Buscar cuenta actualizada por username
  const current = useMemo(() => {
    if (!currentAccount) return null;
    // Buscar la cuenta actualizada en el array global
    return accounts.find(
      (acc) =>
        acc.owner === currentAccount.owner && acc.pin === currentAccount.pin
    );
  }, [accounts, currentAccount]);

  // 3. Calcular balance y fecha
  const balance = useMemo(() => {
    if (!current) return 0;
    return current.movements.reduce((acc, mov) => acc + mov, 0);
  }, [current]);

  const today = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString(current?.locale || "en-US");
  }, [current]);

  // 4. Handler para alternar sort
  const handleSort = () => setSort((s) => !s);

  // 5. Handler de logout manual
  const handleLogout = () => {
    setCurrentAccount(null);
    setTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // 6. Iniciar timer al hacer login
  useEffect(() => {
    if (current) {
      setTimer(120); // 2 minutos
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCurrentAccount(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimer(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  // 7. Handler para transferencias
  const handleTransfer = (toUsername, amount) => {
    if (!current) return false;
    const username = current.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    const receiver = accounts.find((acc) => {
      const accUsername = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
      return accUsername === toUsername;
    });
    if (
      amount > 0 &&
      receiver &&
      balance >= amount &&
      toUsername !== username
    ) {
      const now = new Date().toISOString();
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc === current) {
            return {
              ...acc,
              movements: [...acc.movements, -amount],
              movementsDates: [...acc.movementsDates, now],
            };
          } else if (acc === receiver) {
            return {
              ...acc,
              movements: [...acc.movements, amount],
              movementsDates: [...acc.movementsDates, now],
            };
          }
          return acc;
        })
      );
      // Reiniciar timer
      setTimer(120);
      return true;
    }
    return false;
  };

  // 8. Handler para préstamos
  const handleLoan = (amount) => {
    if (!current) return false;
    if (amount > 0 && current.movements.some((mov) => mov >= amount * 0.1)) {
      setTimeout(() => {
        const now = new Date().toISOString();
        setAccounts((prev) =>
          prev.map((acc) =>
            acc === current
              ? {
                  ...acc,
                  movements: [...acc.movements, amount],
                  movementsDates: [...acc.movementsDates, now],
                }
              : acc
          )
        );
        setTimer(120);
      }, 2500);
      return true;
    }
    return false;
  };

  // 9. Handler para cerrar cuenta
  const handleCloseAccount = (username, pin) => {
    // El username es las iniciales
    const accUsername = current.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    if (username === accUsername && Number(pin) === current.pin) {
      setAccounts((prev) => prev.filter((acc) => acc !== current));
      setCurrentAccount(null);
      setTimer(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return true;
    }
    return false;
  };

  return (
    <div>
      <nav>
        {!current ? (
          <Login setCurrentAccount={setCurrentAccount} accounts={accounts} />
        ) : (
          <>
            <p className="welcome">
              Welcome back, {current.owner.split(" ")[0]}
            </p>
            <img src="./logo.png" alt="Logo" className="logo" />
            <button
              className="login__btn"
              style={{ marginLeft: 16 }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      {current && (
        <main className="app" style={{ opacity: 1 }}>
          <div className="balance">
            <div>
              <p className="balance__label">Current balance</p>
              <p className="balance__date">
                As of <span className="date">{today}</span>
              </p>
            </div>
            <p className="balance__value">
              {balance.toLocaleString(current.locale, {
                style: "currency",
                currency: current.currency,
              })}
            </p>
          </div>
          <Movements currentAccount={current} sort={sort} />
          <Summary currentAccount={current} sort={sort} onSort={handleSort} />
          <Transfer currentAccount={current} onTransfer={handleTransfer} />
          <Loan currentAccount={current} onLoan={handleLoan} />
          <CloseAccount onClose={handleCloseAccount} />
          <LogoutTimer timer={timer} />
        </main>
      )}
    </div>
  );
}
