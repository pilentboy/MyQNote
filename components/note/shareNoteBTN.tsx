import { TouchableOpacity } from "react-native";
import CustomAlert from "../cutstomAlert";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";
import { storeDataInLocalStorage } from "@/utils/handleLocalStorage";
import handleAddingCloudNotes from "@/api/handleAddUserCloudNote";
import { v4 as uuidv4 } from "uuid";
import Toast from "react-native-toast-message";
import Entypo from '@expo/vector-icons/Entypo';



const ShareNoteBTN: React.FC<ShareNoteBTNProps> = ({id,content,title,date,time,direction}:{ title: string;
  content: string;
  date: string;
  time: string;
  id: string;
  date:string,
  time:string,
  direction: "right" | "left"}) => {
  const { theme } = useTheme();

   const {
	setHomeBottomSheetDisplay,
	setSharingNoteID,
	setSharingNoteData
  } = useContext(authContext);



  const handleOpenSharingBottomSheet = () => {
	setSharingNoteID(id);
	setHomeBottomSheetDisplay(0)
	setSharingNoteData({content,date,time,id,direction,title,id})
  };

  return (<TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOpenSharingBottomSheet}
    >	
	<Entypo name="share" size={16} color={theme == "light" ? "black" : "white"}/>
    </TouchableOpacity>
  );
};

export default ShareNoteBTN;
