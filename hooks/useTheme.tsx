import AsyncStorage from "@react-native-async-storage/async-storage";

const useTheme = async () => {
  const currentTheme = await AsyncStorage.getItem("theme");
  if (!currentTheme) {
    await AsyncStorage.setItem("theme", "light");
    return "light";
  }
  return currentTheme;
};

export default useTheme;
