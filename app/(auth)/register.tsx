import { View } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/FormInput";
import { useRouter } from "expo-router";
import AuthFormContainer from "@/components/formItems/AuthFormContainer";
import Loading from "@/components/common/Loading";
import { authContext } from "@/context/authProvider";
import FormTitle from "@/components/formItems/FormTitle";
import SubmitBTN from "@/components/formItems/SubmitBTN";
import Toast from "react-native-toast-message";
import { register } from "@/api";
import AuthSwitchPropmt from "@/components/formItems/AuthSwitchPropmt";

const Register = () => {
  const router = useRouter();
   const [ loading, setLoading]=useState<boolean>(false);
   const [showPass,setShowPass]=useState<boolean>(false);

	  
  // registering schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        "نام کاربری باید فقط شامل حروف و اعداد انگلیسی باشد"
      )
      .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
      .max(16, "حداکثر کاراکتر مجاز برای نام کاربری 14 می باشد")
      .required("نام کاربری الزامی است"),
    password: Yup.string()
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



const showToast = (type?:error,text?:string) => {
    Toast.show({
      type: type || "success",
      text2: text ||"ثبت نام شما با موفقیت انجام شد",
    });
  };
  // handle register form
  const onSubmit = async (data: any) => {
    setLoading(true);

    const res = await register(data);
    setLoading(false);
	
	if(res.connectionError) return showToast("error",res.connectionError)
    if (res.error) {
		console.log(res)
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
		  name='username'
    
        />
        <FormInput
          errors={errors.password}
          control={control}
          label="رمز عبور"
          name="password"
		  showPass={showPass}
		  setShowPass={setShowPass}
        />
        <SubmitBTN title="ثبت نام" action={handleSubmit(onSubmit)} />

        <AuthSwitchPropmt
          title="حساب کاربری دارید؟"
          linkPath="login"
          linkTitle="ورود"
          clearErorrs={clearErrors}
        />
      </View>
    </AuthFormContainer>
  );
};

export default Register;
