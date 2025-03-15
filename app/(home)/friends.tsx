import React, { useMemo, useState , useEffect,useContext} from "react";
import { View, Text, ScrollView } from "react-native";
import useTheme from "@/context/themeProvider";
import FloatingActionButton from "./../../components/home/floatingActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView ,BottomSheetScrollView} from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { authContext } from "@/context/authProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/formInput";
import CustomLinearGradient from "@/components/linearGradient";
import { darkTheme, lightTheme } from "@/constants/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from "react-native-toast-message";

export default function Friends() {
  const { setTheme, theme } = useTheme();
  const [sheetIndex, setSheetIndex] = useState(-1); 
  const [usersFound,setUsersFound]=useState<any>([]);
  const {accessKey}=useContext(authContext)

  const snapPoints = useMemo(() => ["65%","80%"], []);
  
  const showToast = (type?:string,text?:string) => {
    Toast.show({
      type: type || "error",
      text2: text ||  "خطا در برقراری ارتباط",
    });
  };

  // log in schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری نمی تواند خالی باشد"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
	watch,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

	const searchedUsernameValue=watch('username');
	
		
	// make an api call for fetching users based on the searchedUsernameValue		
	const onSubmit = async () => {
		try{
			const res = await fetch(`http://10.0.2.2:3000/search_users?username=${searchedUsernameValue}`,{
			method:'GET',
			 headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
		   Authorization: `Bearer ${accessKey}`,
		},
				}
			);
			
			
			if(!res.ok){
				setUsersFound([]);
				return;
			}
			
			const data=await res.json()
			console.log(data)
			setUsersFound(data)
		
		}catch(error:any){
		showToast();
			console.log(error)
			setUsersFound([])
		}
	

    
	};
  
  useEffect(()=>{
	searchedUsernameValue ? onSubmit(searchedUsernameValue) :setUsersFound([]) ;
  },[searchedUsernameValue])
  
  
  
  // add friend request 
  const handleAddFriendRequest=async(receiverID:string)=>{

	try{
		const res=await fetch ("http://10.0.2.2:3000/friend_request",{
				method:'POST',
				 body: JSON.stringify({
				receiver_id:receiverID
    }),
			 headers: { 
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
		  Authorization: `Bearer ${accessKey}`,
		},
		})
		if(res.status === 400){
		const test=await res.json()
		console.log(test.error)
			showToast('info',test.error)
			return;
		}
		const result=await res.json()
		showToast('success',result.message)
		
	}catch(e:any){
		showToast();
		console.log(e,'error adding friend ')
	}
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FloatingActionButton
          display={true}
          action={() => setSheetIndex(0)}
          icon={<AntDesign name="adduser" size={24} color="white" />}
        />

        <BottomSheet
          snapPoints={snapPoints}
          index={sheetIndex}
          onChange={(index) => setSheetIndex(index)}
      onClose={() => setSheetIndex(-1)}
          enablePanDownToClose
          handleStyle={{ backgroundColor: lightTheme.primary }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
        >
			
          <BottomSheetView
            style={{
              flex: 1,
              padding: 15,
              alignItems: "center",
			  gap:4,
              backgroundColor: theme === "light" ? "white" : darkTheme.primary,
            }}
          >
            <View style={{ flex: 1 }}>
              <FormInput
                errors={errors.username}
                name="username"
                placeholder="نام کاربری"
                control={control}
              />
			
			{usersFound.length && <> 
				
					<BottomSheetScrollView  style={{ flex: 1 }}  contentContainerStyle={{ paddingBottom: 20 }} >
					<View style={{gap:5,marginTop:10}}> 
						{usersFound.map((user:any) => <View key={user.id} style={{
							flexDirection:'row',
							alignItems:'center',
							justifyContent:'space-between',
							borderBottomWidth:1,
							borderColor:'gray',
							paddingVertical:5
						}}> 
						
						<Text style={{color:'white',fontFamily:'yekan'}}> {user.username} </Text>
						<MaterialIcons name="person-add-alt-1" size={20} color="green" onPress={()=>handleAddFriendRequest(user.id)} />
						</View> )}
					</View>
				</BottomSheetScrollView>
			
			</>}
			  
			  
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
	
  );
}
