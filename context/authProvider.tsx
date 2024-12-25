import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: true,
  setLoading: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkLogin = () => {
    router.replace("/(home)");

    //   setTimeout(() => {
    //     // if (loggedIn) {
    //     //   router.push("/(home)");
    //     // }
    //     setLoading(false);
    //   }, 500);
    // };
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <authContext.Provider value={{ loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
