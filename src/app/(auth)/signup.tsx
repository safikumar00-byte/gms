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

import { signUp } from "../../../services/authService";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
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
      setErrorMessage("Enter a valid email and password to create your account.");
      setNotice("");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setNotice("");

    const { data, error } = await signUp(email.trim(), password);

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);

    if (data.session) {
      router.replace("/");
      return;
    }

    setNotice("Your account was created. Check your email if confirmation is required.");
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
              Create account
            </Text>
            <Text className="text-3xl font-semibold tracking-tight text-foreground">
              Sign up with email
            </Text>
            <Text className="text-base leading-6 text-muted">
              Create your account first, then we can connect the member module next.
            </Text>
          </View>

          {errorMessage ? (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to sign up</Alert.Title>
                <Alert.Description>{errorMessage}</Alert.Description>
              </Alert.Content>
            </Alert>
          ) : null}

          {notice ? (
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Account created</Alert.Title>
                <Alert.Description>{notice}</Alert.Description>
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
                <Description>Use an email you can access right now.</Description>
                {emailError ? <FieldError>{emailError}</FieldError> : null}
              </TextField>

              <TextField isRequired isInvalid={Boolean(passwordError)}>
                <Label>Password</Label>
                <Input
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="new-password"
                />
                <Description>Choose a password with at least 6 characters.</Description>
                {passwordError ? <FieldError>{passwordError}</FieldError> : null}
              </TextField>

              <Button
                onPress={handleSubmit}
                isDisabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>

              <Link href="/login" asChild>
                <Button variant="tertiary" isDisabled={isSubmitting}>
                  Back to sign in
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}
