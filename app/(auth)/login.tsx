import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { lightTheme } from "@/constants/theme";
import FormInput from "@/components/formItems/formInput";
import { Link, useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/authFormContainer";
import handleLogin from "@/utils/handleLogin";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import Loading from "@/components/loading";
import FormTitle from "@/components/formItems/formTitle";
import BottomGuideText from "@/components/formItems/bottomGuideText";

const Login = () => {
  const { loading, setLoading } = useContext(authContext);
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await handleLogin(data.username, data.password);
    setLoading(false);
    !res
      ? Alert.alert("خطا", "نام کاربری یا رمز عبور اشتباه است.")
      : router.push("/(home)");
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
