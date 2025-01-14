import { Stack } from "expo-router";
import React from "react";
import { SessionProvider, useSession } from "./ctx";
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
  const {session} = useSession();
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
        <Stack screenOptions={{headerShown: false}}>
          {session?
            <Stack.Screen name="(auth)" />
            :
            <>
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="+not-found" />
            </>
          }
        </Stack>
      </SessionProvider>
    </ToastProvider>
  );
}