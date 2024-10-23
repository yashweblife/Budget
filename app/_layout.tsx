import { useColorScheme } from '@/hooks/useColorScheme';
import { PurchaseProvider } from '@/store/purchase';
import SettingsProvider from '@/store/settings';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <PurchaseProvider>
        <SettingsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="settings/index" options={{ headerShown: false }} />
            <Stack.Screen name="graphs/index" options={{ headerShown: false }} />
          </Stack>
        </SettingsProvider>
      </PurchaseProvider>
    </PaperProvider>
  );
}
