import { TouchableOpacity } from "react-native";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import CustomAlert from "../common/CutstomAlert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const DeleteNoteBTN = () => {
  const { deleteNote } = useSubmitNoteType();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        CustomAlert("حذف", "آیا از حذف این یادداشت مطمئن هستید؟", deleteNote);
      }}
    >
      <MaterialIcons name="delete-forever" size={24} color="red" />
    </TouchableOpacity>
  );
};

export default DeleteNoteBTN;
