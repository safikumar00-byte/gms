import { Button, Text, View } from "react-native";

import { createMember, getMembers } from "../../../services/memberService";
import { signIn, signUp } from "../../../services/authService";

export default function TestScreen() {
  const handleSignup = async () => {
    const res = await signUp("test2@gmail.com", "123456");
    console.log("signup:", res);
  };

  const handleSignin = async () => {
    const res = await signIn("test2@gmail.com", "123456");
    console.log("signin:", res);
  };

  const handleAddMember = async () => {
    const res = await createMember({
      name: "Test Member",
      branch_id: "b27a1c9f-f0bb-4818-b3e8-4d561311162a",
      organization_id: "fa8d2e30-2e59-47a5-973b-89246147ed39",
    });
    console.log("create member:", res);
  };

  const handleGetMembers = async () => {
    const res = await getMembers();
    console.log("members:", res);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Test Screen</Text>

      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Sign In" onPress={handleSignin} />
      <Button title="Add Member" onPress={handleAddMember} />
      <Button title="Get Members" onPress={handleGetMembers} />
    </View>
  );
}
