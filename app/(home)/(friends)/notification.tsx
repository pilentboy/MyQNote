
import { View, Text, ScrollView } from "react-native";
import { useContext ,useEffect,useState} from "react";
import useTheme from "@/context/themeProvider";
import { darkTheme, lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Notification() {

 const { setTheme, theme } = useTheme();
  const {accessKey}=useContext(authContext)
  const [notifications,setNotifications]=useState<any>([])
  
  const handleGetNotifications=async ()=>{
	try{
	const res=await fetch ("https://myqnoteapi.liara.run/notification",{
			 headers: { 
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
		  Authorization: `Bearer ${accessKey}`,
		},
		})
		
		const data=await res.json()
		setNotifications(data.notifications)
		console.log(data)
	}catch(e:any){
		console.log(e,'error Notification')
	}
  }
  
  
    const handleDeleteFriendRequet=async (friendRequestID:string)=>{
	try{
	const res=await fetch ("https://myqnoteapi.liara.run/delete_friend_request",{
	method:'DELETE',
		body:JSON.stringify({friendRequestID: friendRequestID})
		,
			 headers: { 
        "Content-Type": "application/json",
	
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
		  Authorization: `Bearer ${accessKey}`,
		},
		})
		
		const data=await res.json()
		//setNotifications(data.notifications)
		console.log(data)
	}catch(e:any){
		console.log(e,'error Notification')
	}
  }
  
   const handleAcceptFriendRequest=async (friendRequestID:string)=>{
	try{
	const res=await fetch ("https://myqnoteapi.liara.run/accept_friend_request",{
			method:"PUT",
			body:JSON.stringify({friendRequestID:friendRequestID}),
			 headers: { 
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
		  Authorization: `Bearer ${accessKey}`,
		},
		})
		
		const data=await res.json()
		await handleGetNotifications()
		console.log(data)
	}catch(e:any){
		console.log(e,'error Notification')
	}
  }
  
  useEffect(()=>{
	handleGetNotifications()
  },[])
  
	return  <View style={{ flex: 1 , padding:10, backgroundColor: theme === "light" ? "white" : "#222831"}}>
      
        />
		
		{notifications.length ? notifications.map((notif:any) =>  <View key={notif.id} style={{width:'100%',height:45,padding:8,borderRadius:10,borderColor:'gray',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderWidth:1}}>
			
			<Text style={{color:'white',fontSize:16}}>{notif.sender_username} </Text>
			<View style={{flexDirection:'row',alignItems:'center',gap:10}}> 
				<Ionicons name="remove-circle-outline" size={26} color="red" onPress={()=> handleDeleteFriendRequet(notif.id)} />
				<AntDesign name="checkcircleo" size={24} color="green" onPress={()=> handleAcceptFriendRequest(notif.id)}/>
			</View> 
			
			
	</View>) :      <View
                  style={{
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: theme === "light" ? lightTheme.primary : "white",
                      fontSize: 15,
                      fontFamily: "Yekan",
                    }}
                  >
				 هیچ اعلانی ندارید
                  </Text>

            
				  <Ionicons name="notifications-off-outline" size={24} color={lightTheme.primary} />
                </View> }
		</View>
		

}
