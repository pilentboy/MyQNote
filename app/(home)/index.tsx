import { Button, ScrollView, View } from "react-native";
import { useRef, useState } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notePara, setNotePara] = useState<string>("");
  const [grid, setGrid] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const notes = [
    {
      title: "اولین روز مدرسه",
      mainContent:
        "به یاد دارم که دست مادرم را محکم گرفته بودم و وارد کلاس شدم. بوی کتاب‌های نو و صدای گفت‌وگوی بچه‌ها فضای کلاس را پر کرده بود.",
    },
    {
      title: "سفر تابستانی به ساحل",
      mainContent:
        "شن‌های طلایی زیر پاهایم گرم بودند و امواج به آرامی می‌خروشیدند. ما بزرگ‌ترین قلعه شنی آن روز را ساختیم.",
    },
    {
      title: "ماجرای روز بارانی",
      mainContent: `آن روز صبح باران شدیدی می‌بارید و ما اصلاً برنامه‌ای برای بیرون رفتن نداشتیم. اما ناگهان، وقتی صدای رعد و برق آرام شد، تصمیم گرفتیم با چترهایمان بیرون برویم و کمی در باران قدم بزنیم. هوای خنک و بوی خاک خیس‌شده بسیار دلپذیر بود. ابتدا آرام قدم می‌زدیم و صدای چکیدن قطرات باران از شاخه‌ها به زمین گوش می‌دادیم. اما کم‌کم، احساس ماجراجویی بر ما غلبه کرد.
  
  با دوستانم شروع کردیم به دویدن در کوچه‌ها. چاله‌های پر از آب در همه جا دیده می‌شدند و ما با شوق کودکانه در آن‌ها می‌پریدیم. لباس‌هایمان کاملاً خیس شده بود، اما اهمیتی نمی‌دادیم. خنده‌هایمان بلند بود و هر لحظه‌ای که می‌گذشت، بیشتر از قبل لذت می‌بردیم.
  
  بعد از مدتی، به پارکی رسیدیم که درختان بلندش هنوز قطرات باران را روی برگ‌هایشان نگه داشته بودند. زیر یک درخت بزرگ نشستیم و کمی استراحت کردیم، در حالی که صدای آرام باران همچنان ادامه داشت. یکی از دوستانم گفت: 'این بهترین روز غیرمنتظره‌ای بود که تا به حال داشتم!' و همه با هم موافق بودیم.
  
  وقتی به خانه برگشتیم، کفش‌هایمان پر از گل و آب شده بود و مادرهایمان به ما نگاه می‌کردند، نیمی ناراحت و نیمی خندان. آن روز فهمیدم که شادی می‌تواند در ساده‌ترین لحظه‌ها پنهان باشد، فقط کافی است کمی جسارت داشته باشی و از آن لحظات استفاده کنی.`,
    },
  ];

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingHorizontal: 10,
        }}
      >
        {/* Main Content */}
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: "18%",
              flexDirection: "row",
              alignContent: "center",
              flexWrap: "wrap",
              gap: 4,
              direction: "rtl",
            }}
          >
            {notes.map((value, index) => (
              <NoteBox
                key={index}
                grid={grid}
                title={value.title}
                mainContent={value.mainContent}
              />
            ))}
          </View>
        </ScrollView>

        <HomeBottomSheet
          bottomSheetRef={bottomSheetRef}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          setNotePara={setNotePara}
          notePara={notePara}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
