import { Image } from "expo-image";

const Logo = () => (
  <Image
    source={require("@/assets/images/logo.png")}
    style={{ height: 122, width: 122 }}
    contentFit="contain"
  />
);

export default Logo;
