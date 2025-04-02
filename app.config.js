require("dotenv").config();

export default {
  expo: {
    name: "MyQNote",
    slug: "MyQNote",
    version: "3.2.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.pilentboy.MyQNote",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
        apiUrl: process.env.EXPO_PUBLIC_API_URL,
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
      },
      eas: {
        projectId: "a9ddd274-d353-480f-88a2-7b496ad6275c",
      },
    },
  },
};
