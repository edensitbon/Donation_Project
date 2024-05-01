import { ethers } from "ethers";
import abi from "../ABIs/Crowdfunding.json";

export const getContractInstance = (signer = null) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  return new ethers.Contract(
    "0xd301570f9826df9da361166CBbCF1d4b9cA9D343",
    abi,
    signer || provider
  );
};
