import { lightTheme } from "@/constants/theme";
import { View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const NoteBox = ({ viewType }: { viewType: string }) => {
  return (
    <View
      style={{
        display: "flex",
        marginVertical: 5,
        width: viewType === "grid" ? 200 : "100%",
        minHeight: 150,
        maxHeight: "100%",
        backgroundColor: lightTheme.secondryColor,
        borderRadius: 10,
        padding: 5,
      }}
    >
      {/*  title & edit  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Yekan",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          پروژه Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
          atque, eaque necessitatibus blanditiis impedit aspernatur sapiente
          sunt neque ullam esse adipisci eligendi debitis! Fugit id, veritatis
          voluptate qui harum ut. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Omnis quas nihil facere voluptatem officiis minima
          in eaque vitae possimus quibusdam iusto recusandae, et sunt molestias
          consequuntur voluptas soluta exercitationem a?
        </Text>
      </View>
      {/* main content */}
    </View>
  );
};
export default NoteBox;
