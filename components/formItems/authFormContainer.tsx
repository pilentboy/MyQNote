import { ReactNode } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/components/logo";

const AuthFormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          padding: 20,
          alignItems: "center",
          direction: "rtl",
        }}
      >
        <Logo />
        <LinearGradient
          colors={["rgba(1, 196, 202, 0.3)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />

        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AuthFormContainer;
