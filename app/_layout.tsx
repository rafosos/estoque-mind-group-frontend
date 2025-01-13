import { Stack } from "expo-router";
import { SessionProvider } from "./ctx";
import { useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
 } from "@expo-google-fonts/inter";
import { ToastProvider } from "react-native-toast-notifications";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";

export const unstable_settings = {
  initialRouteName: 'login'
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  return (
    <ToastProvider>
      <SessionProvider>
        <Stack screenOptions={{contentStyle: styles.AndroidSafeArea}}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SessionProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: colors.cinza.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
