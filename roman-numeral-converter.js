var hash = {
  0: "",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

function convertToRoman(num) {
  let str = num.toString().split('');
  let roman = "";
  let thousand = 0;
  let hundred = 0;
  let ten = 0;
  let one = 0;

  switch (str.length) {
    case 4:
      thousand = str[0];
      hundred = str[1];
      ten = str[2];
      one = str[3];

      for (let i = 0; i < thousand; i++){
        roman += "M";
      }

      if (hundred == 9) {
        roman += "CM";
        hundred -= 9;        
      }

      if (hundred >= 5){
        roman += "D";
        hundred -= 5;
      }

      if (hundred == 4) {
        roman += "CD";
        hundred -= 4;
      }

      for (let i = 0; i < hundred; i++){
        roman += "C";
      }

      if (ten == 9) {
        roman += "XC";
        ten -= 9;        
      }
      
      if (ten >= 5){
        roman += "L";
        ten -= 5;
      }

      if (ten == 4){
        roman += "XL";
        ten -= 4;
      }
      
      for (let i = 0; i < ten; i++){
        roman += "X";
      }

      roman += hash[one]
      break;

    case 3:
      hundred = str[0];
      ten = str[1];
      one = str[2]; 

      if (hundred == 9) {
        roman += "CM";
        ten -= 9;        
      } 

      if (hundred >= 5){
        roman += "D";
        hundred -= 5;
      }

      if (hundred == 4) {
        roman += "CD";
        hundred -= 4;
      }

      for (let i = 0; i < hundred; i++){
        roman += "C";
      }

      if (ten == 9) {
        roman += "XC";
        ten -= 9;        
      }

      if (ten >= 5){
        roman += "L";
        ten -= 5;
      }

      if (ten == 4){
        roman += "XL";
        ten -= 4;
      }

      for (let i = 0; i < ten; i++){
        roman += "X";
      }

      roman += hash[one]
      break;

    case 2:
      ten = str[0];
      one = str[1];
      if (ten == 9) {
        roman += "XC";
        ten -= 9;        
      }

      if (ten >= 5){
        roman += "L";
        ten -= 5;
      }

      if (ten == 4){
        roman += "XL";
        ten -= 4;
      }

      for (let i = 0; i < ten; i++){
        roman += "X";
      }

      roman += hash[one]
      break;

    case 1:
      one = str[0];
      roman = hash[one];
      break;

    default:
      return "number too big"      
  }
  
 return roman;
}
