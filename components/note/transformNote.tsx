import { TouchableOpacity } from "react-native";
import CustomAlert from "../cutstomAlert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/authProvider";

const TransformNoteBTN = () => {
  const { appMode } = useContext(authContext);
  useEffect(() => {
    console.log(appMode);
  }, []);
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
      <MaterialIcons name="transform" size={16} color="white" />
    </TouchableOpacity>
  );
};

export default TransformNoteBTN;
