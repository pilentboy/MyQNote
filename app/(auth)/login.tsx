import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { lightTheme } from "@/constants/theme";
import FormInput from "@/components/formItems/formInput";
import { Link, useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/authFormContainer";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import Loading from "@/components/loading";
import FormTitle from "@/components/formItems/formTitle";
import BottomGuideText from "@/components/formItems/bottomGuideText";
import Toast from "react-native-toast-message";
import {
  handleDefaultNoteMode,
  handleSetAccessKey,
} from "@/utils/handleLocalStorage";

const Login = () => {
  const { loading, setLoading, setAccessKey, setAppMode } =
    useContext(authContext);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری نمی تواند خالی باشد"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "ورود با موفقیت",
    });
  };
  const handleLogin = async (data: any) => {
    try {
      const res = await fetch("http://10.0.2.2:3000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }

      const success = await res.json();
      return success;
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await handleLogin(data);
    setLoading(false);

    console.log(res, "x");

    if (res.error) {
      setError("username", {
        type: "manual",
        message: res.error,
      });
    } else {
      await handleSetAccessKey(res?.token);
      setAccessKey(res?.token);
      await handleDefaultNoteMode("online");
      setAppMode("online");
      showToast();
      router.navigate("/(home)");
    }
  };

  if (loading) return <Loading />;

  return (
    <AuthFormContainer>
      <View
        style={{
          paddingTop: 10,
          gap: 10,
          alignItems: "center",
        }}
      >
        <FormTitle title="ورود" />
        <FormInput
          errors={errors.username}
          control={control}
          label="نام کاربری"
          name="username"
        />

        <FormInput
          errors={errors.password}
          control={control}
          label="رمز عبور"
          name="password"
        />
        <TouchableOpacity
          style={{
            width: 300,
            height: 45,
            borderWidth: 0,
            borderRadius: 15,
            backgroundColor: lightTheme.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Yekan",
              fontSize: 18,
            }}
          >
            ورود
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            width: 300,
            justifyContent: "center",
            paddingTop: 5,
            borderTopWidth: 1,
            borderColor: "#C0C0C0",
          }}
        >
          <BottomGuideText title="ثبت نام نکردی؟" />

          <Link
            href={"/(auth)/register"}
            onPress={() => clearErrors()}
            style={{
              color: lightTheme.primary,
              fontSize: 15,
              fontFamily: "Vazir",
            }}
          >
            ثبت نام
          </Link>
        </View>
      </View>
    </AuthFormContainer>
  );
};
export default Login;
