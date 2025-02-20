import { lightTheme } from "@/constants/theme";
import useTheme from "@/context/themeProvider";
import { Controller } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import FormInputLabel from "./formInputTitle";
const FormInput = ({
  errors,
  label,
  control,
  name,
}: {
  label: string;
  control: any;
  name: string;
  errors: any;
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <View
        style={{
          paddingHorizontal: 10,
          gap: 1,
        }}
      >
        <FormInputLabel label={label} />
        {errors && (
          <Text style={{ color: "red", fontFamily: "Yekan", fontSize: 12 }}>
            {errors.message}
          </Text>
        )}
      </View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={name === "password"}
            style={{
              textAlign: "left",
              width: 300,
              height: 45,
              borderWidth: 1,
              borderRadius: 15,
              color: theme === "light" ? "black" : "white",
              fontFamily: "Vazir",
              fontSize: 16,
              padding: 12,
              borderColor: errors ? "red" : lightTheme.primary,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </View>
  );
};

export default FormInput;
