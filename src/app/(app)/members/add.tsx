import { Surface } from "heroui-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddMemberScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Surface className="flex-1 items-center justify-center">
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">Add Member</Text>
          <Text className="text-muted">Coming soon</Text>
        </View>
      </Surface>
    </SafeAreaView>
  );
}
