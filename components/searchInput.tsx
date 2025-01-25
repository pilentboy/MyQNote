import { lightTheme } from "@/constants/theme";
import { TextInput, View } from "react-native";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";

const SearchInput = () => {
  const { searchValue, setSearchValue } = useContext(authContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 5,
      }}
    >
      <TextInput
        style={{
          width: "86%",
          height: 45,
          direction: "rtl",
          textAlign: "right",
          color: "white",
          backgroundColor: lightTheme.primaryColor,
          borderRadius: 10,
          paddingHorizontal: 20,
          fontSize: 15,
          fontFamily: "Yekan",
        }}
        placeholder="جستجو"
        placeholderTextColor="white"
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
      />
    </View>
  );
};

export default SearchInput;
