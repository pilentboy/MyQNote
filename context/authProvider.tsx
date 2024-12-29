import { createContext, useState } from "react";

const authContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: true,
  setLoading: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);



  return (
    <authContext.Provider value={{ loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
}
export { AuthProvider, authContext };
