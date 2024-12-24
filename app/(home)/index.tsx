import { View } from "react-native";
import AddNoteBTN from "@/components/addNoteBTN";
import { useState } from "react";
import NoteBox from "@/components/noteBox";

const index = () => {
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <NoteBox display={display} />

      <AddNoteBTN action={() => setDisplay((pre) => !pre)} />
    </View>
  );
};

export default index;
