import { useCallback, useContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import NoteBox from "../noteBox/noteBox";
import RotateArrow from "../rotateArrow";
import { authContext } from "@/context/authProvider";

interface NoteItem {
  title: string;
  content: string;
  date: string;
  time: string;
  direction: "right" | "left";
  id: string;
}
interface ItemLayout {
  length: number;
  offset: number;
  index: number;
}

const CustomFlatList = ({
  data,
  setData,
  preNoteFlastListPosition,
  setPreNoteFlastListPosition,
  setAddNoteBTNDisplay,
  renderItem,
}: {
  data: any;
  setData: any;
  preNoteFlastListPosition: undefined | number;
  setPreNoteFlastListPosition?: any;
  setAddNoteBTNDisplay?: any;
  renderItem?: any;
}) => {
  const { loading } = useContext(authContext);

  const renderNoteItem = useCallback(({ item }: { item: NoteItem }) => {
    return (
      <NoteBox
        title={item.title}
        content={item.content}
        date={item.date}
        time={item.time}
        direction={item.direction}
        id={item.id}
      />
    );
  }, []);

  const getItemLayout = (_: any, index: number): ItemLayout => ({
    length: 120,
    offset: 120 * index,
    index,
  });

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem || renderNoteItem}
      maxToRenderPerBatch={6}
      initialNumToRender={6}
      windowSize={10}
      removeClippedSubviews={true}
      getItemLayout={getItemLayout}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={setData}>
          <RotateArrow />
        </RefreshControl>
      }
      contentContainerStyle={{
        paddingVertical: 8,
        gap: 4,
      }}
      onScroll={(e: any) => {
        if (preNoteFlastListPosition !== undefined) {
          const currentPositon = e.nativeEvent.contentOffset.y;

          setPreNoteFlastListPosition(currentPositon);

          if (
            currentPositon > preNoteFlastListPosition &&
            currentPositon > 50
          ) {
            setAddNoteBTNDisplay(false);
          } else {
            setAddNoteBTNDisplay(true);
          }
        }
      }}
    />
  );
};

export default CustomFlatList;
