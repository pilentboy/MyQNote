import { View } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { lightTheme } from "@/constants/theme";
import FormInput from "@/components/formItems/formInput";
import { Link, useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/authFormContainer";
import Loading from "@/components/loading";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import FormTitle from "@/components/formItems/formTitle";
import SubmitBTN from "@/components/formItems/submitBTN";
import BottomGuideText from "@/components/formItems/bottomGuideText";
import Toast from "react-native-toast-message";
import handleRegister from "@/api/handleRegister";

const Register = () => {
  const { loading, setLoading } = useContext(authContext);
  const router = useRouter();

  // registering schema
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
      .max(16, "رمز عبور باید حداثر 16 کاراکتر باشد")
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
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // display toast after a successfull registration
  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "ثبت نام شما با موفقیت انجام شد",
    });
  };

  // handle register form
  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await handleRegister(data);
    setLoading(false);

    if (res.error) {
      setError("username", {
        type: "manual",
        message: res.error,
      });
    } else {
      showToast();
      router.replace("/(auth)/login");
    }
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
            replace
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
