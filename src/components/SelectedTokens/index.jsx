import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";

import { useResponse } from "../../state/responses/hook";

function SelectedTokens({ filterTokens, loading }) {
  const { exchanges } = useResponse();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [queryTokenList, setQueryTokenList] = useState(filterTokens);
  const [profit, setProfit] = useState();
  const [queryExchange, setQueryExchange] = useState([]);
  const [selectToken, setSelectToken] = useState();

  useEffect(() => {
    setSelectToken(filterTokens[0]);
    setQueryTokenList(filterTokens);
  }, [filterTokens]);

  useEffect(() => {
    setQueryTokenList(
      filterTokens.filter((token) => {
        return token.symbol.toLowerCase().includes(searchKeyword.toLowerCase());
      })
    );
  }, [searchKeyword, filterTokens]);

  useEffect(() => {
    const temp = [];
    if (selectToken && exchanges) {
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
  }, [selectToken, exchanges, queryExchange]);

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
      {loading && exchanges ? (
        <div className="flex flex-col items-center justify-center w-full p-4 space-y-4">
          <label
            htmlFor="select-token-modal"
            className="items-center justify-between w-full max-w-xl btn modal-button"
          >
            <div className="flex flex-row items-center w-20 h-10 space-x-2">
              <ReactLoading type={"bubbles"} height={"40%"} width={"40%"} />
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
          <label htmlFor="select-token-modal" className="bg-opacity-95 modal">
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
              />
              <div className="divider"></div>
              <div className="flex flex-col w-full h-full overflow-y-auto">
                <label className="flex justify-between px-5 bg-transparent border-0 rounded-none btn">
                  <ReactLoading type={"bubbles"} height={"20%"} width={"20%"} />
                </label>
              </div>
            </div>
          </label>

          <div className="w-full space-y-4">
            <div className="flex flex-row w-full space-x-2">
              <div className="shadow-xl card w-96 h-36 bg-base-100 image-full ">
                <div className="flex items-center justify-center w-full h-full">
                  <ReactLoading type={"bubbles"} height={"20%"} width={"20%"} />
                </div>
              </div>

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

              <div className="shadow-xl card w-96 h-36 bg-base-100 image-full">
                <div className="flex items-center justify-center w-full h-full">
                  <ReactLoading type={"bubbles"} height={"20%"} width={"20%"} />
                </div>
              </div>
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
                  <tr>
                    <th></th>
                    <td>
                      <ReactLoading
                        type={"bubbles"}
                        height={"20%"}
                        width={"20%"}
                      />
                    </td>
                    <td>
                      <ReactLoading
                        type={"bubbles"}
                        height={"20%"}
                        width={"20%"}
                      />
                    </td>
                    <td>
                      <ReactLoading
                        type={"bubbles"}
                        height={"20%"}
                        width={"20%"}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full p-4 space-y-4">
            <label
              htmlFor="select-token-modal"
              className="justify-between w-full max-w-xl btn modal-button"
            >
              {" "}
              {selectToken && (
                <div className="flex flex-row items-center space-x-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={selectToken.logo}
                    alt="logo"
                  />
                  <div>{selectToken.symbol}</div>
                </div>
              )}
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
            <label htmlFor="select-token-modal" className="bg-opacity-95 modal">
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
                        <label
                          htmlFor="select-token-modal"
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
                        </label>
                      );
                    })}
                </div>
              </div>
            </label>

            <div className="w-full space-y-2">
              <div className="flex flex-row items-center justify-between px-2">
                <p>Lowest</p>
                <p>Highest</p>
              </div>
              <div className="flex flex-row w-full space-x-2">
                {queryExchange[0] && (
                  <div className="shadow-xl card w-96 h-36 bg-base-100 image-full">
                    <div className="w-full h-full">
                      <img
                        src={`exchanges/${queryExchange[0].exchange.toLowerCase()}.svg`}
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
                {selectToken && (
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
                )}
                {queryExchange[queryExchange.length - 1] && (
                  <div className="space-y-2 shadow-xl card w-96 h-36 bg-base-100 image-full">
                    <div className="w-full h-full">
                      <img
                        src={`exchanges/${queryExchange[
                          queryExchange.length - 1
                        ].exchange.toLowerCase()}.svg`}
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
                      {profit && (
                        <div className="w-24 text-right text-green-500">
                          + {profit.toFixed(2)} %
                        </div>
                      )}
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
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td className="flex flex-row items-center ">
                            {" "}
                            <img
                              src={`exchanges/${exchange.exchange.toLowerCase()}.svg`}
                              className="w-4 h-4 mr-2"
                              alt="logo"
                            />
                            {exchange.exchange}
                          </td>
                          <td>
                            {" "}
                            {selectToken && (
                              <div className="flex flex-row items-center">
                                <img
                                  src={selectToken.logo}
                                  className="w-4 h-4 mr-2 rounded-full"
                                  alt="logo"
                                />
                                {exchange.symbol}
                              </div>
                            )}
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
        </>
      )}
    </>
  );
}

export default SelectedTokens;
