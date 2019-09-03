const qrImage = require("qr-image");
const fs = require("fs");

//node qr "http://www.google.com" "QRCode.png"

const dataToEncode = process.argv[2] || null;
const outputImage = process.argv[3] || null;

if (dataToEncode !== null && outputImage !== null) {
  qrImage
    .image(dataToEncode, {
      type: "png",
      size: 20
    })
    .pipe(fs.createWriteStream(outputImage));
  console.log("QR Code Generated");
} else {
  console.log("Check your Command Line Arguments! ");
}
