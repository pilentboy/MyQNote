import moment from "jalali-moment";

function convertToPersianDigits(input: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input.replace(/\d/g, (digit: any) => persianDigits[digit]);
}

const getCurrentDate = () => {
  const currentDate = moment().locale("fa").format("YYYY/MM/DD");
  const currentTime = moment().locale("fa").format("HH:mm:ss");
  return [
    convertToPersianDigits(currentDate),
    convertToPersianDigits(currentTime),
  ];
};
export default getCurrentDate;
