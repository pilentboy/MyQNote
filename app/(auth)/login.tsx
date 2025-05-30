import { View } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/FormInput";
import { useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/AuthFormContainer";
import { useContext,useState } from "react";
import { authContext } from "@/context/authProvider";
import Loading from "@/components/common/Loading";
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
  const {setAccessKey, setAppMode } =
    useContext(authContext);
  const router = useRouter();
  const [showPass,setShowPass]=useState<boolean>(false);
  const [ loading, setLoading]=useState<boolean>(false);

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


  const showToast = (type?:error,text?:string) => {
    Toast.show({
      type: type || "success",
      text2: text || "با موفقیت وارد شدید",
    });
  };

  // submit log in form
  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await login(data);
	setLoading(false);


	if(res.connectionError) return showToast("error",res.connectionError)
    if (res.error) {
	
	const fieldsToSet = ['username', 'password'];
      
	  fieldsToSet.forEach(field => {
    const error = res.error.find(e => e.field === field);
	
    if (error) {
      setError(field, {
        type: "manual",
        message: error.msg
      });
    }

	 
  });
  
    } else {
		
      await handleSetAccessKey(res.data.token);
      await handleDefaultNoteMode("online");
      setAccessKey(res.data.token);
      setAppMode("online");
      showToast();

		router.replace("/(home)");
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
		  showPass={showPass}
		  setShowPass={setShowPass}
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
