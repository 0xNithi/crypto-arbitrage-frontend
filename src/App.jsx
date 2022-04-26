/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import SelectedTokens from "./components/SelectedTokens";

import ThemeSwitch from "./components/ThemeSwitch";
import { changeSymbol } from "./config";
import exchanges from "./mock/exchange.json";
import { useResponse } from "./state/responses/hook";

function App() {
  const {
    reducer: { handleAddExchange, handleAddTokens },
  } = useResponse();
  const [loading, setLoading] = useState(false);

  const fetchLogoCoin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/support_currencies
        `,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      handleAddTokens(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    themeChange(false);

    const exchangeTemp = exchanges.reduce((prev, curr) => {
      prev.push(
        ...curr.data.map((coin) => {
          if (changeSymbol[coin.symbol]) {
            return {
              ...coin,
              symbol: changeSymbol[coin.symbol],
              exchange: curr.exchange,
            };
          }
          return { ...coin, exchange: curr.exchange };
        })
      );
      return prev;
    }, []);

    fetchLogoCoin();

    handleAddExchange(exchangeTemp);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <div className="flex flex-row items-center justify-between w-full m-1">
          <div className="text-2xl font-medium">Crypto Arbitrage</div>
          <ThemeSwitch />
        </div>
        <SelectedTokens loading={loading} />
      </div>
    </>
  );
}

export default App;
