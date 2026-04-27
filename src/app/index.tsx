import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Chip, Separator, Surface } from 'heroui-native';

import HeroUIShowcase from '@/components/hero-ui-showcase';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="mx-auto w-full max-w-5xl gap-6 px-4 pb-16 pt-6">
        <Surface className="gap-5 overflow-hidden">
          <View className="gap-4">
            <View className="flex-row flex-wrap gap-2">
              <Chip variant="soft" color="accent">
                <Chip.Label>Home</Chip.Label>
              </Chip>
              <Chip variant="secondary" color="success">
                <Chip.Label>HeroUI Setup Complete</Chip.Label>
              </Chip>
            </View>

            <View className="gap-3">
              <Text className="text-4xl font-semibold tracking-tight text-foreground">
                Native UI system installed and implemented in-app
              </Text>
              <Text className="max-w-3xl text-base leading-7 text-muted">
                The Expo starter has been replaced with a working HeroUI Native home experience.
                The second tab now contains an interactive gallery for the component families
                you asked to implement across the project.
              </Text>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <Card className="flex-1">
              <Card.Body className="gap-2">
                <Card.Title>What changed</Card.Title>
                <Card.Description>
                  Provider setup, Uniwind styling, Metro configuration, and a full HeroUI gallery are now part of the app.
                </Card.Description>
              </Card.Body>
            </Card>

            <Card className="flex-1">
              <Card.Body className="gap-2">
                <Card.Title>Where to continue</Card.Title>
                <Card.Description>
                  Use the Explore tab as a reference when you build real product screens from these patterns.
                </Card.Description>
              </Card.Body>
            </Card>
          </View>

          <Separator />

          <View className="flex-row flex-wrap gap-3">
            <Button>HeroUI Ready</Button>
            <Button variant="secondary">Explore Tab Next</Button>
          </View>
        </Surface>

        <HeroUIShowcase />
      </ScrollView>
    </SafeAreaView>
  );
}
