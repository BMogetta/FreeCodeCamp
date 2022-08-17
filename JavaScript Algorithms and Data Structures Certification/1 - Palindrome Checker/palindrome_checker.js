function palindrome(string) {
    const direct= string.slice()
                        .toLowerCase()
                        .replace(/\W/g,"")
                        .replace("_","");
    const inverse = direct.slice()
                          .split("")
                          .reverse()
                          .join("");
  return direct == inverse
}