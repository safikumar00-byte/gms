import { router } from "expo-router";
import { Alert, Button, Card, Spinner, Surface } from "heroui-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMembers } from "../../../../services/memberService";

interface Member {
  id: string;
  name: string;
  phone?: string;
  created_at: string;
}

export default function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await getMembers();

      if (error) {
        setError(error.message);
        return;
      }

      setMembers(data || []);
    } catch (err) {
      setError("Failed to fetch members");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
          <Text className="mt-4 text-muted">Loading members...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="mx-auto w-full max-w-5xl gap-6 px-4 pb-16 pt-6">
        <Surface className="gap-6">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-semibold tracking-tight text-foreground">
                Members
              </Text>
              <Button onPress={() => router.push("/members/add")}>
                Add Member
              </Button>
            </View>

            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Unable to load members</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {members.length === 0 && !error ? (
              <Card>
                <Card.Body className="items-center py-12">
                  <Text className="text-lg font-medium text-muted">
                    No members yet
                  </Text>
                  <Text className="text-sm text-muted">
                    Add your first member to get started
                  </Text>
                </Card.Body>
              </Card>
            ) : (
              <View className="gap-4">
                {members.map((member) => (
                  <Card key={member.id}>
                    <Card.Body>
                      <View className="gap-2">
                        <Text className="text-lg font-semibold text-foreground">
                          {member.name}
                        </Text>
                        {member.phone && (
                          <Text className="text-sm text-muted">
                            {member.phone}
                          </Text>
                        )}
                      </View>
                    </Card.Body>
                  </Card>
                ))}
              </View>
            )}
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}
