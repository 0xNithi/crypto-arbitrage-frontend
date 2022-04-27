import React, { useState, useEffect } from "react";

import { useResponse } from "../../state/responses/hook";

function SelectedTokens(loading) {
  const { tokens, exchanges } = useResponse();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [queryTokenList, setQueryTokenList] = useState(tokens);
  const [profit, setProfit] = useState();
  const [queryExchange, setQueryExchange] = useState([]);
  const [selectToken, setSelectToken] = useState();

  useEffect(() => {
    if (tokens) {
      setSelectToken(tokens[14]);
    }
  }, [tokens]);

  useEffect(() => {
    setQueryTokenList(
      tokens.filter((token) => {
        return token.symbol.toLowerCase().includes(searchKeyword.toLowerCase());
      })
    );
  }, [searchKeyword, tokens]);

  useEffect(() => {
    const temp = [];
    if (selectToken) {
      for (let i = 0; i < exchanges.length; i += 1) {
        if (exchanges[i].symbol === selectToken.symbol) {
          temp.push(exchanges[i]);
        }
      }
    }
    setQueryExchange(
      temp.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    );
  }, [selectToken, exchanges]);

  useEffect(() => {
    if (queryExchange.length !== 0) {
      setProfit(
        ((queryExchange[queryExchange.length - 1].price -
          queryExchange[0].price) /
          queryExchange[0].price) *
          100
      );
    }
  }, [queryExchange]);

  return (
    <>
      {loading["loading"] ? (
        <div className="flex flex-col items-center justify-center w-full h-full py-2 space-y-3 translate-y-10 text-primary-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="animate-spin w-9 h-9"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <>
          {selectToken && (
            <div className="flex flex-col items-center justify-center w-full p-4 space-y-4">
              <label
                htmlFor="select-token-modal"
                className="justify-between w-full max-w-xl btn modal-button"
              >
                <div className="flex flex-row items-center space-x-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={selectToken.logo}
                    alt="logo"
                  />
                  <div>{selectToken.symbol}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              <input
                type="checkbox"
                id="select-token-modal"
                className="modal-toggle"
              />
              <label
                htmlFor="select-token-modal"
                className="bg-opacity-95 modal"
              >
                <div className="relative w-full space-y-2 overflow-hidden modal-box h-3/4">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-bold">Select a token</h3>
                    <label htmlFor="select-token-modal" className="btn btn-sm">
                      ✕
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Search name of token"
                    className="w-full input input-bordered"
                    value={searchKeyword}
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                    }}
                  />
                  <div className="divider"></div>
                  <div className="flex flex-col w-full h-full overflow-y-auto">
                    {queryTokenList &&
                      queryTokenList.map((item, index) => {
                        return (
                          <button
                            className="flex justify-between px-5 bg-transparent border-0 rounded-none btn"
                            key={index}
                            onClick={() => setSelectToken(item)}
                          >
                            <img
                              src={item.logo}
                              className="rounded-full w-7 h-7"
                              alt="img"
                            />
                            {item.symbol}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </label>

              <div className="w-full space-y-4">
                <div className="flex flex-row w-full space-x-2">
                  {queryExchange[0] && (
                    <div className="shadow-xl card w-96 h-36 bg-base-100 image-full">
                      <div className="w-full h-full">
                        <img
                          src={`./exchanges/${queryExchange[0].exchange}.svg`}
                          className="translate-x-28 w-36 h-36"
                          alt="logo"
                        />
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">
                          {queryExchange[0].exchange}
                        </h2>
                        <h2>
                          {queryExchange[0].price} THB/
                          {queryExchange[0].symbol}
                        </h2>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center space-y-1 ">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {queryExchange[queryExchange.length - 1] && (
                    <div className="shadow-xl card w-96 h-36 bg-base-100 image-full">
                      <div className="w-full h-full">
                        <img
                          src={`./exchanges/${
                            queryExchange[queryExchange.length - 1].exchange
                          }.svg`}
                          className="translate-x-28 w-36 h-36"
                          alt="logo"
                        />
                      </div>

                      <div className="flex flex-row justify-between card-body">
                        <div className="space-y-2">
                          <h2 className="card-title">
                            {queryExchange[queryExchange.length - 1].exchange}
                          </h2>
                          <h2>
                            {queryExchange[queryExchange.length - 1].price} THB/
                            {queryExchange[queryExchange.length - 1].symbol}
                          </h2>
                        </div>
                        <div className="w-24 text-right text-green-500">
                          + {profit.toFixed(2)} %
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="table w-full table-compact table-zebra">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Exchange</th>
                        <th>Coin</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryExchange.map((exchange, index) => {
                        return (
                          <tr>
                            <th>{index + 1}</th>
                            <td className="flex flex-row items-center ">
                              {" "}
                              <img
                                src={`./exchanges/${exchange.exchange}.svg`}
                                className="w-4 h-4 mr-2"
                                alt="logo"
                              />
                              {exchange.exchange}
                            </td>
                            <td>
                              <div className="flex flex-row items-center">
                                <img
                                  src={selectToken.logo}
                                  className="w-4 h-4 mr-2"
                                  alt="logo"
                                />
                                {exchange.symbol}
                              </div>
                            </td>
                            <td>
                              {exchange.price} THB/{exchange.symbol}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SelectedTokens;
