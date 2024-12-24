import { Image } from "expo-image";

const Logo = ({ size = 150 }: { size?: number }) => (
  <Image
    source={require("@/assets/images/splash-icon.png")}
    style={{ height: size, width: size }}
    contentFit="contain"
  />
);

const CroppedLogo = ({ size = 200 }: { size?: number }) => (
  <Image
    source={require("@/assets/images/icon.png")}
    style={{ height: size, width: size }}
    contentFit="contain"
  />
);

export default Logo;
export { CroppedLogo };
