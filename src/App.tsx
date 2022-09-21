import { GameContainer } from "./GameContainer";
import { StatusBar } from "@capacitor/status-bar";

if ((window as any).StatusBar) {
  StatusBar.hide();
}

const App: React.FC = () => <GameContainer />;

export default App;
