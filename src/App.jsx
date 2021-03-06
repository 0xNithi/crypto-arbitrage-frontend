/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import axios from "axios";
import ReactLoading from "react-loading";

import tokens from "./mock/tokens.json";
import SelectedTokens from "./components/SelectedTokens";
import ThemeSwitch from "./components/ThemeSwitch";
import { useResponse } from "./state/responses/hook";

import config from "./config.json";

function App() {
  const {
    exchanges,
    lastPricesFetch,
    reducer: { handleAddExchange, handleAddTokens },
  } = useResponse();
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [countDown, setCountDown] = useState(100);
  const [temp, setTemp] = useState();
  const [state, setState] = useState();
  const filterTokens = new Set();
  const [token, setToken] = useState([]);

  const fetchLogoCoin = async () => {
    try {
      setLoading(true);
      handleAddTokens(tokens);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchExchangesPrices = async () => {
    setLoading(true);

    try {
      setLoading(true);
      setPending(true);
      const response = await axios.get(
        `${config.BACKEND_ENDPOINT_URL}/arbitrage`
      );

      const exchangeTemp = response.data.reduce((prev, curr) => {
        prev.push(
          ...curr.data.map((coin) => {
            return { ...coin, exchange: curr.exchange };
          })
        );
        return prev;
      }, []);
      if (exchanges && exchanges.length !== 0) {
        setTemp(exchangeTemp);
        setState(true);
      } else {
        handleAddExchange(exchangeTemp);
        setTemp(exchangeTemp);
        setState(true);
      }
      filterToken(exchangeTemp);

      setPending(false);
    } catch (error) {
      // alert("");
      fetchExchangesPrices();
    }

    setLoading(false);
  };

  const filterToken = (data) => {
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        filterTokens.add(data[i].symbol);
      }
    }
    let setToArr = Array.from(filterTokens);
    let dataTokens = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let j = 0; j < setToArr.length; j++) {
        if (setToArr[j] === tokens[i]["symbol"]) {
          dataTokens.push(tokens[i]);
        }
      }
    }

    setToken(dataTokens);
  };

  useEffect(() => {
    if (state === true) {
      setTimeout(() => {
        setCountDown(countDown - 1);
        if (countDown === 0) {
          handleAddExchange(temp);
          fetchExchangesPrices();
          setState(false);
        }
      }, 1000);
    } else {
      setCountDown(100);
    }
  });

  useEffect(() => {
    themeChange(false);

    fetchLogoCoin();
    fetchExchangesPrices();
    filterToken(exchanges);
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <>
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <div className="flex flex-row items-center justify-between w-full my-2">
          <div className="text-2xl font-medium">Crypto Arbitrage</div>
          <ThemeSwitch />
        </div>
        {exchanges.length !== 0 && (
          <>
            <div
              className="text-xs underline hover:cursor-pointer"
              onClick={fetchExchangesPrices}
            >
              Last update: {lastPricesFetch} [Click to re-scraping prices]
            </div>
            {pending ? (
              <div className="flex flex-row items-center space-x-2 text-xs">
                <p>Pending</p>
                <div className="w-20">
                  <ReactLoading type={"bubbles"} height={"20%"} width={"20%"} />
                </div>
              </div>
            ) : (
              <div className="text-xs">
                Refetch in {countDown !== 0 ? countDown : "..."} secs
              </div>
            )}
          </>
        )}
        <SelectedTokens filterTokens={token} loading={loading} />
      </div>
    </>
  );
}

export default App;
