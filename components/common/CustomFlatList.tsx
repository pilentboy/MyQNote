import { useContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import RotateArrow from "./RotateArrow";
import { authContext } from "@/context/authProvider";

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

  const getItemLayout = (_: any, index: number): ItemLayout => ({
    length: 120,
    offset: 120 * index,
    index,
  });

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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
