import { useEffect } from "react";
import supabase from "../SuperbaseConnector";

/**
 * Sends a password reset email to the user.
 * @param {string} email - The email address of the user.
 * @returns {Object} - An object containing success or error.
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "StudentNote://reset-password", // Thay "your-app://reset-password" bằng URL của bạn
    });

    if (error) {
      console.error("Error sending password reset email:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
};

/**
 * Handles the password reset flow when the user clicks the reset link.
 */
export const usePasswordRecoveryHandler = () => {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          const newPassword = prompt("Please enter your new password:");

          if (newPassword) {
            const { data, error } = await supabase.auth.updateUser({
              password: newPassword,
            });

            if (error) {
              alert("Error updating password: " + error.message);
            } else {
              alert("Password updated successfully!");
            }
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
