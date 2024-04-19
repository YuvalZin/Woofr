import { Provider } from "react-redux";
import RootNavigation from "./src/Navigation/root-navigation";
import store from "./src/redux/store";
import { I18nManager } from 'react-native';



export default function App() {
  I18nManager.forceRTL(true);
  I18nManager.isRTL = true; // Ensure RTL direction is set
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
