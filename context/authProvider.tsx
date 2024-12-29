import { createContext, useEffect, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updatingNotes: boolean;
  setUpdatingNotes: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: true,
  setLoading: () => {},
  updatingNotes: true,
  setUpdatingNotes: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [updatingNotes, setUpdatingNotes] = useState(false);

  useEffect(() => {
    console.log(updatingNotes, "upding notes state......");
  }, [updatingNotes]);

  return (
    <authContext.Provider
      value={{ loading, setLoading, updatingNotes, setUpdatingNotes }}
    >
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
