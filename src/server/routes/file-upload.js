const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config(); //load env
const { v4 } = require("uuid");

const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { checkCookie } = require("../middlewares/sessioncookies");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

//image compressor
const sharp = require("sharp");

router.post("/", checkCookie, upload.single("avatar"), async (req, res) => {
  try {
    // const cookie = parseCookie(req.headers.cookie);
    // const sessionObject = await checkForSession(cookie.session_id);
    // const { user_id } = sessionObject.session;

    if (req.file) {
      const imageName = v4();
      //decompress(change to smaller size) image before storing into cloud
      const compressed = await sharp(req.file.buffer)
        .webp({ quality: 20 })
        .toBuffer();
      //upload to s3 command
      const uploadCmd = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: compressed,
        ContentType: req.file.mimetype,
      });
      //execute upload cmd
      const saved = await s3.send(uploadCmd);
      if (saved) {
        //get from s3 command
        const getCmd = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageName,
        });
        //execute getter cmd
        await s3.send(getCmd);
        //signed url great for temporary access like for "displaying" preview of what user just uploaded
        const URL = await getSignedUrl(s3, getCmd, { expiresIn: 3000 });
        res.status(200).send({
          message: "Avatar uploaded to cloud",
          avatarURL: URL,
        });
        //attach signed url to response so client can pick that img url
      } else {
        //handle error with s3
        console.log("s3 error", saved);
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
