import { Surface } from "heroui-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GymOnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Surface className="flex-1 items-center justify-center">
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">
            Gym Owner Onboarding
          </Text>
          <Text className="text-muted">
            Coming soon: Set up your gym details
          </Text>
        </View>
      </Surface>
    </SafeAreaView>
  );
}
