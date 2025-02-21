import { createContext, useContext, useEffect, useState } from "react";

const SubmitNoteTypeContext = createContext<{
  submitNoteType: "newNote" | "editNote";
  submitAction: any;
  deleteNote: any;
  setDeleteNote: any;
  setSubmitAction: any;
  setSubmitNoteType: React.Dispatch<
    React.SetStateAction<"newNote" | "editNote">
  >;
}>({
  submitNoteType: "newNote",
  submitAction: undefined,
  setSubmitAction: undefined,
  deleteNote: undefined,
  setDeleteNote: undefined,
  setSubmitNoteType: () => {},
});

function SubmitNoteTypeProvider({ children }: { children: React.ReactNode }) {
  const [submitNoteType, setSubmitNoteType] = useState<"newNote" | "editNote">(
    "newNote"
  );
  const [submitAction, setSubmitAction] = useState<any>(); // only for adding and editing notes
  const [deleteNote, setDeleteNote] = useState<any>(); // delete cloud or local note

  useEffect(() => {
    console.log(submitNoteType);
  }, [submitNoteType]);

  return (
    <SubmitNoteTypeContext.Provider
      value={{
        submitNoteType,
        setSubmitNoteType,
        submitAction,
        setSubmitAction,
        deleteNote,
        setDeleteNote
      }}
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
