// exports.hello = name => {
//   return "Hello " + name;
// };

// exports.goodMorning = name => {
//   return "Good Morning " + name;
// };

const crypto = require("crypto");
const qrGen = require("qr-image");
const fs = require("fs");

module.exports = function(key) {
  this.key = key;
  return {
    encode: str => {
      let encodeStr = crypto.createCipher("aes-256-ctr", this.key);
      return encodeStr.update(str, "utf8", "hex");
    },
    decode: str => {
      let decodeStr = crypto.createDecipher("aes-256-ctr", this.key);
      return decodeStr.update(str, "hex", "utf8");
    },
    qrImage: (dataToEncode, outputImage) => {
      let data = dataToEncode || null;
      let file = outputImage || null;
      if (data !== null && file !== null) {
        qrGen
          .image(dataToEncode, {
            type: "png",
            size: 20
          })
          .pipe(fs.createWriteStream(outputImage));
        return true;
      } else {
        return false;
      }
    }
  };
};
