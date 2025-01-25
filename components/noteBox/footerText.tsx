import { Text } from "react-native";

// date and time wraper
const FooterText = ({ value }: { value: string }) => (
  <Text
    style={{
      color: "black",
      fontWeight: "bold",
      fontSize: 11,
      fontFamily: "Vazir",
    }}
  >
    {value}
  </Text>
);

export default FooterText;
