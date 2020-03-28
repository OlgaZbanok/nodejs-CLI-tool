 function ceaserCipher(str, amount, isEncode) {
 try {
  const shift = isEncode ? amount : (26 - amount) % 26;

  return String.fromCharCode(
    ...str.split('').map(char => {
      let code = char.charCodeAt();
      if (char.match(/[a-zA-Z]/i)) {
        if (code >= 65 && code <= 90) {
          code = ((code - 65 + shift) % 26) + 65;
        } else if (code >= 97 && code <= 122) {
          code = ((code - 97 + shift) % 26) + 97;
        }
      }
      return code;
    })
  );
 } catch (error) {
   console.error(`${error}`);
   process.exit(1);
 }
}
module.exports = ceaserCipher;
