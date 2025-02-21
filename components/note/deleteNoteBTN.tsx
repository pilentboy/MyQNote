import { TouchableOpacity } from "react-native";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomAlert from "../cutstomAlert";

const DeleteNoteBTN = () => {
  const { deleteNote } = useSubmitNoteType();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        CustomAlert("حذف", "آیا از حذف این یادداشت مطمئن هستید؟", deleteNote);
      }}
    >
      <FontAwesome name="remove" size={24} color="red" />
    </TouchableOpacity>
  );
};

export default DeleteNoteBTN;
