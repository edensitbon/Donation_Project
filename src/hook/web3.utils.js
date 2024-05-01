import { useLayoutEffect, useRef } from "react";
import { WalletConsumer } from "../context/index";
import { useWeb3Functions } from "./web3.functions";

// checks the wallet connection status and update state if wallet is connected on page refresh
export const useCheckWalletConnection = () => {
  const hasBeenChecked = useRef(false);
  const { walletConnect } = useWeb3Functions();
  const { dispatch } = WalletConsumer();

  useLayoutEffect(() => {
    (() => {
      const isConnected = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
      if (!isConnected) return dispatch({ isWalletStatusSynced: true });
      if (!hasBeenChecked.current) {
        walletConnect();
        hasBeenChecked.current = true;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
