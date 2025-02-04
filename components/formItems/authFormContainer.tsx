import { ReactNode } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";

import  { CroppedLogo } from "@/components/logo";
import CustomLinearGradient from "../linearGradient";

const AuthFormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: 20,
          direction: "rtl",
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("window").height,
        }}
      >
        <CustomLinearGradient />
        <CroppedLogo />
        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AuthFormContainer;
