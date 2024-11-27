import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { sendPasswordResetEmail, usePasswordRecoveryHandler } from "./ForgotPasswordHandler";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  // Dùng hook xử lý sự kiện PASSWORD_RECOVERY
  usePasswordRecoveryHandler();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    const result = await sendPasswordResetEmail(email);
    if (result.success) {
      Alert.alert(
        "Success",
        "Password reset email sent! Check your inbox for the reset link."
      );
    } else {
      Alert.alert("Error", result.error || "Failed to send password reset email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send Reset Email" onPress={handlePasswordReset} />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
});
