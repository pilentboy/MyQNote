import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { lightTheme } from "@/constants/theme";
import FormInput from "@/components/formItems/formInput";
import { Link, useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/authFormContainer";
import handleRegister from "@/utils/handleRegister";
import Loading from "@/components/loading";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";

const Register = () => {
  const { loading, setLoading } = useContext(authContext);
  const router = useRouter();
  const { theme } = useTheme();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        "نام کاربری باید فقط شامل حروف و اعداد انگلیسی باشد"
      )
      .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
      .max(12, "حداکثر کاراکتر مجاز برای نام کاربری 12 عدد می باشد")
      .required("نام کاربری الزامی است"),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        "رمز عبور باید شامل حروف کوچک، حروف بزرگ و اعداد باشد"
      )
      .required("رمز عبور الزامی است"),
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
    const res = await handleRegister(data.username, data.email, data.password);
    setLoading(false);
    !res
      ? alert("کاربری با این نام کاربری و ایمیل وجود دارد!")
      : router.push("/(home)");
  };

  if (loading) return <Loading />;

  return (
    <AuthFormContainer>
      <View style={{ gap: 10, alignItems: "center", paddingTop: 10 }}>
        <Text
          style={{
            fontFamily: "Vazir",
            fontSize: 21,
            paddingTop: 70,
            color: theme === "light" ? "black" : "white",
          }}
        >
          ثبت نام و شروع کن!
        </Text>
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
            ثبت نام
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
          <Text
            style={{
              fontFamily: "Vazir",
              fontSize: 14,
              color: theme === "light" ? "black" : "white",
            }}
          >
            قبلا ثبت نام کردی؟
          </Text>

          <Link
            href={"/(auth)/login"}
            onPress={() => clearErrors()}
            style={{
              color: lightTheme.primary,
              fontSize: 15,
              fontFamily: "Vazir",
            }}
          >
            ورود
          </Link>
        </View>
      </View>
    </AuthFormContainer>
  );
};
export default Register;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
