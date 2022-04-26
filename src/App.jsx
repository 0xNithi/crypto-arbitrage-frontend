/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import SelectedTokens from './components/SelectedTokens';

import ThemeSwitch from './components/ThemeSwitch';
import exchanges from './mock/exchange.json';
import tokens from './mock/tokens.json';
import { useResponse } from './state/responses/hook';

import config from './config.json';

function App() {
	const {
		lastPricesFetch,
		reducer: { handleAddExchange, handleAddTokens },
	} = useResponse();
	const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(100);

	const fetchLogoCoin = async () => {
		try {
			setLoading(true);
			// const response = await fetch(
			// 	`${config.BACKEND_ENDPOINT_URL}/support_currencies
			//   `,
			// 	{
			// 		method: 'GET',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	}
			// );
			// const res = await response.json();
			// handleAddTokens(res.data);
			handleAddTokens(tokens);
		} catch (error) {
			alert('ERR:Cannot Fetch Logo!');
			// fetchLogoCoin();
			console.log(error);
		}
		setLoading(false);
	};

	const fetchExchangesPrices = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${config.BACKEND_ENDPOINT_URL}/arbitrage
			  `,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const res = await response.json();
			const exchangeTemp = res.reduce((prev, curr) => {
				prev.push(
					...curr.data.map((coin) => {
						return { ...coin, exchange: curr.exchange };
					})
				);
				return prev;
			}, []);
			handleAddExchange(exchangeTemp);
		} catch (error) {
			alert('ERR:Cannot Fetch Price!');
			console.log(error);
		}
		setLoading(false);
	};

  useEffect(() => {
    setTimeout(() => {
      setCountDown(countDown - 1);
      if (countDown === 0) {
        setCountDown(100);
        fetchExchangesPrices();
      }
    }, 1000);
  });

	useEffect(() => {
		themeChange(false);

		fetchLogoCoin();
		fetchExchangesPrices();
	}, []);

	return (
		<>
			<div className="flex flex-col w-full max-w-3xl mx-auto">
				<div className="flex flex-row items-center justify-between w-full my-2">
					<div className="text-2xl font-medium">Crypto Arbitrage</div>
					<ThemeSwitch />
				</div>
				<div className="underline hover:cursor-pointer" onClick={fetchExchangesPrices}>
					Last update: {(new Date(lastPricesFetch)).toString()} [Click to re-scraping prices]
				</div>
        <div>Refetch in {countDown} secs</div>
				<SelectedTokens loading={loading} />
			</div>
		</>
	);
}

export default App;
