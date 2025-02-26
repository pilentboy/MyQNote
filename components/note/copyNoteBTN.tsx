import { TouchableOpacity } from "react-native";
import CustomAlert from "../cutstomAlert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";
import { storeDataInLocalStorage } from "@/utils/handleLocalStorage";

const CopyNoteBTN = () => {
  const { appMode } = useContext(authContext);
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        CustomAlert(
          "کپی یادداشت",
          `آیا از کپی کردن این یادداشت به ${
            appMode === "online"
              ? "به حافظه آفلاین (محلی)"
              : "حساب آنلاین (ابری)"
          } اطمینان دارید؟ 
          `,
          () => {}
        );
      }}
    >
      <MaterialIcons
        name="transform"
        size={16}
        color={theme == "light" ? "black" : "white"}
      />
    </TouchableOpacity>
  );
};

export default CopyNoteBTN;
