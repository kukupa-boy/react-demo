import RouterView from "./router";
import { HashRouter } from "react-router-dom";
import {KeepAliveProvider} from "keepalive-react-component"

const App = function App() {
  return (
      <HashRouter>
         <KeepAliveProvider> <RouterView /></KeepAliveProvider>
      </HashRouter>
  );
}
export default App;