import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addExchanges as addExchangesAction,
  addTokens as addTokensAction,
} from ".";

export const useResponse = () => {
  const dispatch = useDispatch();

  const { tokens, exchanges, lastPricesFetch } = useSelector((state) => state.responses);

  const handleAddExchange = useCallback(
    (data) => {
      dispatch(addExchangesAction({ exchanges: data }));
    },
    [dispatch]
  );

  const handleAddTokens = useCallback(
    (data) => {
      dispatch(addTokensAction({ tokens: data }));
    },
    [dispatch]
  );

  return {
    tokens,
    exchanges,
    lastPricesFetch,
    reducer: {
      handleAddExchange,
      handleAddTokens,
    },
  };
};
