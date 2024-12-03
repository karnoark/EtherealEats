import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    regular: require('@/assets/fonts/Poppins-Regular.ttf'),
    light: require('@/assets/fonts/Poppins-Light.ttf'),
    bold: require('@/assets/fonts/Poppins-Bold.ttf'),
    medium: require('@/assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if(fontsLoaded){
      onLayoutRootView();
    }
  }, [fontsLoaded, onLayoutRootView])

  if (!fontsLoaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
