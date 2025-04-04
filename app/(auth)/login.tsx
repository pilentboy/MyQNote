import { View } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/FormInput";
import { useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/AuthFormContainer";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import Loading from "@/components/loading";
import FormTitle from "@/components/formItems/FormTitle";
import Toast from "react-native-toast-message";
import {
  handleDefaultNoteMode,
  handleSetAccessKey,
} from "@/utils/handleLocalStorage";
import { login } from "@/api";
import AuthSwitchPropmt from "@/components/formItems/AuthSwitchPropmt";
import SubmitBTN from "@/components/formItems/SubmitBTN";

const Login = () => {
  const { loading, setLoading, setAccessKey, setAppMode } =
    useContext(authContext);
  const router = useRouter();

  // log in schema
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

  // display toast after a successfull log in
  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "با موفقیت وارد شدید",
    });
  };

  // submit log in form
  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await login(data);

    if (res.error) {
      setError("username", {
        type: "manual",
        message: res.error,
      });
    } else {
      await handleSetAccessKey(res.token);
      await handleDefaultNoteMode("online");
      setAccessKey(res.token);
      setAppMode("online");
      showToast();
      router.replace("/(home)");
    }
    setLoading(false);
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

        <SubmitBTN action={handleSubmit(onSubmit)} title="ورود" />

        <AuthSwitchPropmt
          title="ثبت نام نکردی؟"
          linkPath="register"
          linkTitle="ثبت نام"
          clearErorrs={clearErrors}
        />
      </View>
    </AuthFormContainer>
  );
};
export default Login;
