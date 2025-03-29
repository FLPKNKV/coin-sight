// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFirebaseErrorMessage = (errorCode: string) => {
    const errorMap: Record<string, string> = {
      "auth/invalid-email": "Invalid email format.",
      "auth/email-already-in-use": "This email is already registered.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Try again.",
      "auth/invalid-credential": "Invalid email or password.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
  
    return errorMap[errorCode] || "An unknown error occurred.";
  };
  