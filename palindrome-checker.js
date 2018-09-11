function palindrome(str) {

  let myRegex = /[0-9a-z]/gi;
  let newStr = str.toLowerCase().match(myRegex)

  let len = Math.floor(newStr.length / 2);

  for (let i = 0; i < len ; i++) {
    if (newStr[i] != newStr[newStr.length - 1 - i ]) {

      return false;
    }
  }
  return true;
}