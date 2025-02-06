import {
  handleDefaultNoteMode,
  handleGetAppMode,
} from "@/utils/handleLocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userNotes: any;
  setUserNotes: React.Dispatch<React.SetStateAction<any[]>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  appMode: any;
  setAppMode: React.Dispatch<React.SetStateAction<any>>;
  accessKey: any;
  setAccessKey: React.Dispatch<React.SetStateAction<any>>;
}>({
  loading: true,
  setLoading: () => {},
  userNotes: [],
  setUserNotes: () => {},
  searchValue: "",
  setSearchValue: () => {},
  appMode: undefined,
  setAppMode: () => {},
  accessKey: undefined,
  setAccessKey: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [appMode, setAppMode] = useState<any>();
  const [accessKey, setAccessKey] = useState<any>();

  // set access key in state
  const handlesetAccessKey = async () => {
    try {
      const res = await AsyncStorage.getItem("access_key");
      if (res) return setAccessKey(JSON.parse(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAppMode = async () => {
      setAppMode(await handleGetAppMode());
    };
    handlesetAccessKey();
    getAppMode();
  }, []);

  return (
    <authContext.Provider
      value={{
        loading,
        setLoading,
        userNotes,
        setUserNotes,
        searchValue,
        setSearchValue,
        appMode,
        setAppMode,
        accessKey,
        setAccessKey,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
