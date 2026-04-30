import { Link, router } from "expo-router";
import {
  Alert,
  Button,
  Card,
  Description,
  FieldError,
  Input,
  Label,
  Surface,
  TextField,
} from "heroui-native";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signIn } from "../../../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailError = useMemo(() => {
    if (!email) {
      return "";
    }

    return /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email address.";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) {
      return "";
    }

    return password.length >= 6
      ? ""
      : "Password must be at least 6 characters.";
  }, [password]);

  const handleSubmit = async () => {
    if (!email || !password || emailError || passwordError) {
      setErrorMessage("Enter a valid email and password to continue.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await signIn(email.trim(), password);

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-4 py-6"
      >
        <Surface className="mx-auto w-full max-w-md gap-6">
          <View className="gap-2">
            <Text className="text-sm font-medium uppercase tracking-[2px] text-accent">
              Welcome back
            </Text>
            <Text className="text-3xl font-semibold tracking-tight text-foreground">
              Sign in to your account
            </Text>
            <Text className="text-base leading-6 text-muted">
              Use your email and password to continue into the app.
            </Text>
          </View>

          {errorMessage ? (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to sign in</Alert.Title>
                <Alert.Description>{errorMessage}</Alert.Description>
              </Alert.Content>
            </Alert>
          ) : null}

          <Card>
            <Card.Body className="gap-4">
              <TextField isRequired isInvalid={Boolean(emailError)}>
                <Label>Email</Label>
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <Description>Use the email attached to your account.</Description>
                {emailError ? <FieldError>{emailError}</FieldError> : null}
              </TextField>

              <TextField isRequired isInvalid={Boolean(passwordError)}>
                <Label>Password</Label>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <Description>Your password must be at least 6 characters.</Description>
                {passwordError ? <FieldError>{passwordError}</FieldError> : null}
              </TextField>

              <Button
                onPress={handleSubmit}
                isDisabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              <Link href="/signup" asChild>
                <Button variant="tertiary" isDisabled={isSubmitting}>
                  Create a new account
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}
