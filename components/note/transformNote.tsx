import { TouchableOpacity } from "react-native";
import CustomAlert from "../cutstomAlert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";

const TransformNoteBTN = () => {
  const { appMode } = useContext(authContext);
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        CustomAlert(
          "انتقال یادداشت",
          `آیا از انتقال این یادداشت به ${
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

export default TransformNoteBTN;
