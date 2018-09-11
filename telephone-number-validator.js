function telephoneCheck(str) {
  let numRegex = /[0-9]/gi;
  let len = str.match(numRegex).length;
  
  if (len > 11 || len < 9) {
	  return false;
  }
  
  if (len === 11) {
	if (str[0] != 1) {
		return false;
	}
  }
  
  let ex1 = /1?\s?\([0-9]{3}\)\s?-?[0-9]{3}-?[0-9]{4}/;
  let ex2 = /1\s?[0-9]{3}\s?-?[0-9]{3}\s?-?[0-9]{4}/;
  let ex3 = /^[0-9]{3}\s?-?[0-9]{3}\s?-?[0-9]{4}/;

  if (str.match(ex1)) {
	return true;
  }
  
  if (str.match(ex2)) {
	return true;
  }
  
  if (str.match(ex3)) {
	return true;
  }
  
  return false;
}
