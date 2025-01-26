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
import FormTitle from "@/components/formItems/formTitle";
import SubmitBTN from "@/components/formItems/submitBTN";
import BottomGuideText from "@/components/formItems/bottomGuideText";

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
    !res ? alert("خطا در ثبت نام!") : router.push("/(home)");
  };

  if (loading) return <Loading />;

  return (
    <AuthFormContainer>
      <View style={{ gap: 10, alignItems: "center", paddingTop: 10 }}>
        <FormTitle title="ثبت نام و شروع کن!" />
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
        <SubmitBTN title="ثبت نام" action={handleSubmit(onSubmit)} />
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
          <BottomGuideText title="قبلا ثبت نام کردی؟" />

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
