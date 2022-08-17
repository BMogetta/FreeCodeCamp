function convertToRoman(arabic) {
  //approach: not optimal but easy to read
    const Roman = {
      0: 0,
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
      20: "XX",
      30: "XXX",
      40: "XL",
      50: "L",
      60: "LX",
      70: "LXX",
      80: "LXXX",
      90: "XC",
      100: "C",
      200: "CC",
      300: "CCC",
      400: "CD",
      500: "D",
      600: "DC",
      700: "DCC",
      800: "DCCC",
      900: "CM",
      1000: "M",
      2000: "MM",
      3000: "MMM"
    }
    let thousand = "", hundred = "", ten ="", unit = ""

    const numStr = arabic.toString()
                          .padStart(4,0)
                          .split("")
                          .reverse();

    switch (numStr.length) {
      case 4: //has a thousand
        thousand = Roman[numStr[3]*1000].valueOf() 
      case 3: //has a hundred
        hundred = Roman[numStr[2]*100].valueOf() 
      case 2: //has a ten
        ten = Roman[numStr[1]*10].valueOf() 
      case 1: //tiene unit
        unit = Roman[numStr[0]].valueOf() 
    }
    const romanNumber = [thousand,hundred,ten,unit].join("")
                                                    .replace(/0/g,"")
    return romanNumber
}
