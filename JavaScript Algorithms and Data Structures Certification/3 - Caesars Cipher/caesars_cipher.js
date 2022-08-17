function rot13(string) {
  
    const rot = 13 //change this to change the cipher
      
    const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
    const planeText = string.split("");
  
    let cipher = [];
  
    planeText.forEach(letter => {
      if(alphabet.includes(letter)) {
  
        const index = alphabet.indexOf(letter);
        let displacement = index + rot;
  
        if(displacement >= alphabet.length) {
          displacement -= alphabet.length
        }
        cipher.push(alphabet[displacement])
  
      } else {
        cipher.push(letter)
      }
    });
    return cipher.join("")
  }
