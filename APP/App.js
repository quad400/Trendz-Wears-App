import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigations/MainNavigation";
import AuthProvider from "./context/AuthContext";
import FlashMessage from "react-native-flash-message";
import Layout from "./screens/Layout";
import { Provider } from "react-redux";
import { store } from "./context/store";

export default function App() {
  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <NavigationContainer>
            <MainNavigation />
            <FlashMessage position="bottom" />
          </NavigationContainer>
        </Layout>
      </AuthProvider>
    </Provider>
  );
}
