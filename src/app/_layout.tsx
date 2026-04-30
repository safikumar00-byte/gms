import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthProvider } from "@/providers/auth-provider";

const heroUIConfig = {
  textProps: {
    maxFontSizeMultiplier: 1.2,
  },
  toast: {
    defaultProps: {
      placement: "bottom" as const,
      variant: "default" as const,
    },
    insets: {
      left: 16,
      right: 16,
      bottom: 16,
    },
  },
  devInfo: {
    stylingPrinciples: false,
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={heroUIConfig}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthProvider>
            <AnimatedSplashOverlay />
            <Stack screenOptions={{ headerShown: false }} />
          </AuthProvider>
        </ThemeProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
