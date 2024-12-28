import { Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet } from "react-native";
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
  return (
    <View style={{ gap: 6 }}>
      <View
        style={{
          paddingHorizontal: 10,
          gap: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#2A3335",

            fontFamily: "Yekan",
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
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
            style={{
              textAlign: "left",
              width: 300,
              height: 45,
              borderWidth: 1,
              borderRadius: 15,
              color: "black",
              fontFamily: "Vazir",
              fontSize: 16,
              padding: 12,
              borderColor: errors ? "red" : "#C0C0C0",
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

const styles = StyleSheet.create({
  inputError: {
    borderColor: "red",
  },
});
export default FormInput;
