import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Chip, Surface } from "heroui-native";

import HeroUIShowcase from "@/components/hero-ui-showcase";

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="mx-auto w-full max-w-5xl gap-6 px-4 pb-16 pt-6">
        <Surface variant="secondary" className="gap-3">
          <Chip variant="soft" color="accent">
            <Chip.Label>Explore</Chip.Label>
          </Chip>
          <Text className="text-3xl font-semibold text-foreground">
            Full HeroUI component gallery
          </Text>
          <Text className="text-base leading-6 text-muted">
            This tab is the step-by-step implementation surface for HeroUI in the
            project. It covers layout, forms, collection patterns, overlays,
            utilities, and feedback.
          </Text>
        </Surface>

        <HeroUIShowcase />
      </ScrollView>
    </SafeAreaView>
  );
}
