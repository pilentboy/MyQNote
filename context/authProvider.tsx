import { createContext, useEffect, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userNotes: any;
  setUserNotes: React.Dispatch<React.SetStateAction<any[]>>;
}>({
  loading: true,
  setLoading: () => {},
  userNotes: [],
  setUserNotes: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<any[]>([]);

  return (
    <authContext.Provider
      value={{ loading, setLoading, userNotes, setUserNotes }}
    >
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
