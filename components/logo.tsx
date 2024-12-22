import { Image } from "expo-image";

const Logo = () => (
  <Image
    source={require("@/assets/images/logo.png")}
    style={{ height: 200, width: 200 }}
    contentFit="contain"
  />
);

export default Logo;
