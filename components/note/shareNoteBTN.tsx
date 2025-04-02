import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";
import Entypo from "@expo/vector-icons/Entypo";

interface ShareNoteBTNProps {
  id: string;
}

const ShareNoteBTN: React.FC<ShareNoteBTNProps> = ({ id }: { id: string }) => {
  const { theme } = useTheme();

  const { setHomeBottomSheetDisplay, setSharingNoteID } =
    useContext(authContext);

  const handleOpenSharingBottomSheet = () => {
    setSharingNoteID(id);
    setHomeBottomSheetDisplay(0);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOpenSharingBottomSheet}
    >
      <Entypo
        name="share"
        size={16}
        color={theme == "light" ? "black" : "white"}
      />
    </TouchableOpacity>
  );
};

export default ShareNoteBTN;
