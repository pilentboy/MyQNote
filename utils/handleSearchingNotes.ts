// display search notes
const handleSearchingNotes = (notes: any, filterText: string) => {
  try {
    const searchedNotes = notes?.filter((notes: any) =>
      notes.title.includes(filterText)
    );
    return searchedNotes;
  } catch (error) {
    console.error("خطا در فیلتر داده ها :", error);
  }
};
export default handleSearchingNotes