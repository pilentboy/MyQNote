import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import SettingsTitle from "./SettingsTitle";
import useTheme from "@/context/themeProvider";

const CustomRadioButton = ({
  data,
  action,
  title,
  selected,
}: {
  data: any;
  action: () => void;
  title: string;
  selected: any;
}) => {
  const { theme } = useTheme();
  return (
    <>
      <RadioGroup
        radioButtons={data}
        onPress={action}
        layout="row"
        labelStyle={{ color: theme === "light" ? "black" : "white" }}
        selectedId={selected}
      />
      <SettingsTitle title={title} theme={theme} />
    </>
  );
};

export default CustomRadioButton;
