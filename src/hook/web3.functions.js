import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { WalletConsumer } from "../context/index";

export const useWeb3Functions = () => {
  const { dispatch } = WalletConsumer();
  const web3Modal = new Web3Modal({
    providerOptions: {},
    cacheProvider: true,
    disableInjectedProvider: false,
  });

  const walletConnect = async () => {
    try {
      const provider = await web3Modal.connect();

      const ethersProvider = new ethers.providers.Web3Provider(provider, "any");
      const signer = ethersProvider.getSigner();
      const account = await signer.getAddress();
      const balance = (await signer.getBalance()).toString();
      dispatch({
        isWalletConnected: true,
        signer,
        ethersProvider,
        account,
        balance,
      });
      console.log({ account });
    } catch (err) {
      console.log("wallet connect error: ", err);
    }
  };

  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    dispatch({
      isWalletConnected: false,
      signer: null,
      account: null,
    });
  };

  return { walletConnect, disconnectWallet };
};
