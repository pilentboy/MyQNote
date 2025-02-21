import { createContext, useContext, useEffect, useState } from "react";

const SubmitNoteTypeContext = createContext<{
  submitNoteType: "newNote" | "editNote";
  setSubmitNoteType: React.Dispatch<
    React.SetStateAction<"newNote" | "editNote">
  >;
}>({
  submitNoteType: "newNote",
  setSubmitNoteType: () => {},
});

function SubmitNoteTypeProvider({ children }: { children: React.ReactNode }) {
  const [submitNoteType, setSubmitNoteType] = useState<"newNote" | "editNote">(
    "newNote"
  );

  useEffect(() => {
    console.log(submitNoteType);
  }, [submitNoteType]);

  return (
    <SubmitNoteTypeContext.Provider
      value={{ submitNoteType, setSubmitNoteType }}
    >
      {children}
    </SubmitNoteTypeContext.Provider>
  );
}

const useSubmitNoteType = () => {
  return useContext(SubmitNoteTypeContext);
};
export default useSubmitNoteType;
export { SubmitNoteTypeProvider };
