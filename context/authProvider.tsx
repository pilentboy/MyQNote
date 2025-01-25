import { handleGetAppMode } from "@/utils/handleLocalStorage";
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
}>({
  loading: true,
  setLoading: () => {},
  userNotes: [],
  setUserNotes: () => {},
  searchValue: "",
  setSearchValue: () => {},
  appMode: undefined,
  setAppMode: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [appMode, setAppMode] = useState<any>();

  useEffect(() => {
    const getAppMode = async () => {
      setAppMode(await handleGetAppMode());
    };
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
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
