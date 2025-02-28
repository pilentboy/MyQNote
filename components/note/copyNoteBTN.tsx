import { TouchableOpacity } from "react-native";
import CustomAlert from "../cutstomAlert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";
import { storeDataInLocalStorage } from "@/utils/handleLocalStorage";
import handleAddingCloudNotes from "@/api/handleAddUserCloudNote";
import { v4 as uuidv4 } from "uuid";
import Toast from "react-native-toast-message";


interface CopyNoteBTNProps {
  title: string;
  content: string;
  date: string;
  time: string;
  textDirection: string;
}
const CopyNoteBTN: React.FC<CopyNoteBTNProps> = ({
  title,
  content,
  date,
  time,
  textDirection,
}) => {
  const { appMode } = useContext(authContext);
  const { theme } = useTheme();
  const { accessKey, setLoading } = useContext(authContext);

  const showToast = (message?: string, type?: "error") => {
    Toast.show({
      type: type || "success",
      text2: message || "با موفقیت کپی شد",
    });
  };

  useEffect(() => {
    console.log(textDirection);
  }, []);

  const handleCopyingNote = async (): Promise<void> => {
    setLoading(true);
    try {
      if (appMode === "offline") {
        const res = await handleAddingCloudNotes(
          { title, content },
          date,
          time,
          textDirection,
          accessKey
        );
        if (!res.ok) {
          showToast("خطا در کپی کردن یادداشت", "error");
        } else {
          showToast();
        }
      } else {
        const res = await storeDataInLocalStorage({
          id: uuidv4(),
          title,
          content,
          date,
          time,
          direction: textDirection,
        });
        if (res) {
          showToast();
        } else {
          showToast("خطا در کپی کردن یادداشت", "error");
        }
      }
    } catch (error) {
      showToast("خطا در برقراری ارتباط", "error");
    } finally {
      setLoading(false);
    }
  };

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
          () => handleCopyingNote()
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
