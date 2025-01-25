import { createContext, useEffect, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userNotes: any;
  setUserNotes: React.Dispatch<React.SetStateAction<any[]>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}>({
  loading: true,
  setLoading: () => {},
  userNotes: [],
  setUserNotes: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <authContext.Provider
      value={{
        loading,
        setLoading,
        userNotes,
        setUserNotes,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
