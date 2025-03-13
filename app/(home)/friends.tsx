import React, { useMemo, useState , useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import useTheme from "@/context/themeProvider";
import FloatingActionButton from "./../../components/home/floatingActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/formInput";
import CustomLinearGradient from "@/components/linearGradient";
import { darkTheme, lightTheme } from "@/constants/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function Friends() {
  const { setTheme, theme } = useTheme();
  const [sheetIndex, setSheetIndex] = useState(-1); 
  const [usersFound,setUsersFound]=useState<any>([]);

  const snapPoints = useMemo(() => ["65%","80%"], []);

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
	const onSubmit = async (data: any) => {
   
	console.log(data,'22')
	

    
	};
  
  useEffect(()=>{
	searchedUsernameValue ? onSubmit(searchedUsernameValue) : null;
  },[searchedUsernameValue])
  
  
  
  // add friend request 
  const handleAddFriendRequest=async()=>{
	console.log('hi')
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
			
					<View style={{gap:5,flex:1,marginTop:10}}> 
						
						<View style={{
							flexDirection:'row',
							alignItems:'center',
							justifyContent:'space-between',
							borderBottomWidth:1,
							borderColor:'gray',
							paddingVertical:5
						}}> 
						
						<Text style={{color:'white',fontFamily:'yekan'}}> pilentboy </Text>
						<MaterialIcons name="person-add-alt-1" size={20} color="green" onPress={handleAddFriendRequest} />
						</View>
						
						
					
					</View>
			
			</>}
			  
			  
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
