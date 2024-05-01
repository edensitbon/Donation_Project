import { useCheckWalletConnection } from "./hook/web3.utils";
import Routers from "./routers/index";

const App = () => {
  useCheckWalletConnection();
  return <Routers />;
};
export default App;
