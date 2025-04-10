import { lightTheme } from "@/constants/theme";
import useTheme from "@/context/themeProvider";
import { Controller } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import InputLabel from "./InputLabel";
import Feather from '@expo/vector-icons/Feather';


interface FormInputProps {
  errors: any;
  label?: string;
  control: any;
  name: string;
  placeholder?: string;
  showPass?:boolean;
  setShowPass?:()=>{}
}
const FormInput = ({
  errors,
  label,
  control,
  name,
  placeholder,
  showPass,
  setShowPass
}: FormInputProps) => {
  const { theme } = useTheme();
  console.log('x')
  return (
    <View style={{ gap: 6 }}>
      <View
        style={{
          paddingHorizontal: 10,
          gap: 1,
        }}
      >
        {label && <InputLabel label={label} />}
        {errors && (
          <Text style={{ color: "red", fontFamily: "Yekan", fontSize: 12 }}>
            {errors.message}
          </Text>
        )}
      </View>
	  <View style={{position:'relative',width:"100%"}}>
	    <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={theme === "light" ? "black" : "white"}
            secureTextEntry={showPass ? false : name === 'password' ? true : undefined}
            style={{
              textAlign: "left",
              width: 300,
              height: 45,
              borderWidth: 2,
              borderRadius: 15,
              color: theme === "light" ? "black" : "white",
              fontFamily: "Vazir",
              fontSize: 16,
              padding: 10,
              borderColor: errors ? "red" : lightTheme.primary,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
	  {showPass !== undefined &&  <Feather name={showPass ? 'eye':'eye-off' } size={18} color="white" style={{position:'absolute',top:12,right:10}} onPress={()=> setShowPass((pre) => !pre)} />}
	  </View>

    </View>
  );
};

export default FormInput;
