const crypto = require("crypto");
class Enigma {
  constructor(key) {
    this.key = key;
  }

  encode(str) {
    const iv = crypto.pbkdf2Sync(
      this.key,
      crypto.randomBytes(16),
      10000,
      16,
      "sha512"
    );

    console.log("IV", iv);

    const key = Buffer.from(this.key, "binary");
    console.log("Key", key);

    const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
    console.log("Cipher", cipher);

    let encodedText = cipher.update(str, "utf8", "base64");
    console.log("Encoded Text", encodedText);

    encodedText += cipher.final();

    return encodedText + "." + iv.toString("base64");
  }

  decode(str) {
    const encodedString = str.split(".")[0];

    const iv = Buffer.from(str.split(".")[1], "base64");

    const key = Buffer.from(this.key, "binary");

    const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);

    let decodedText = decipher.update(encodedString, "base64");

    decodedText += decipher.final();

    return decodedText;
  }
}

module.exports = Enigma;
