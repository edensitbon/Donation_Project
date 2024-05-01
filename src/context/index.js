import { createContext, useContext, useReducer } from "react";

const initialState = {
  signer: null,
  isWalletConnected: false,
  ethersProvider: null,
  account: null,
  balance: 0,
};
const WalletContext = createContext(initialState);

export const WalletContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, payload) => ({ ...state, ...payload }),
    initialState
  );

  return (
    <WalletContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletConsumer = () => useContext(WalletContext);
