import { createContext, useContext, useEffect, useState } from "react";

const EditContext = createContext<{
  textDirection: undefined | "right" | "left";
  setTextDirection: React.Dispatch<React.SetStateAction<any>>;
}>({
  textDirection: undefined,
  setTextDirection: () => {},
});

function EditProvider({ children }: { children: React.ReactNode }) {
  const [textDirection, setTextDirection] = useState<
    undefined | "right" | "left"
  >();

  useEffect(() => {
    console.log(textDirection);
  }, [textDirection]);
  return (
    <EditContext.Provider value={{ textDirection, setTextDirection }}>
      {children}
    </EditContext.Provider>
  );
}

const useEdit = () => {
  return useContext(EditContext);
};
export default useEdit;
export { EditProvider };
