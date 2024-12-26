import { Text } from "react-native";

const FooterText = ({ value }: { value: string }) => (
  <Text
    style={{
      color: "black",
      fontWeight: "bold",
      fontSize: 10,
      fontFamily: "Vazir",
    }}
  >
    {value}
  </Text>
);

export default FooterText;
