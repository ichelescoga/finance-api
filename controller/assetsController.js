const AWS = require("aws-sdk");

  exports.uploadS3 = async (req, res, next) => {
    try {
        let imageUrl = "";
        await uploadFileS3(req.body.file, req.body.fileName, req.body.transactionType)
            .then(async (s3Response) => {
                if (s3Response) {
                    imageUrl = s3Response;
                }
            })
        res.json({ s3Response: imageUrl })
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Payments list generation error.",
      });
    }
  };

  function uploadFileS3(imageBase64, fileName, transactionType){
    try {
        let s3Bucket;
        s3Bucket = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
            region: process.env.AWS_S3_REGION,
            params: {
                Bucket: process.env.AWS_S3_BUCKET_NAME
            }
        });

        let filePath = `dpiupload/${fileName}`;

        let buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
        let imageData = {
            Key: filePath,
            Body: buffer,
            ContentEncoding: "base64",
            ContentType: "image/jpeg",
            CacheControl: "max-age=172800"
        };

        return new Promise((resolve) => {
            s3Bucket.upload(imageData, function (err, data) {
                if (err) {
                    console.error(err);
                    reject(false);
                }
                if (process.env.AWS_CLOUDFRONT_URL) {
                    resolve(process.env.AWS_CLOUDFRONT_URL + data.Key);
                } else {
                    resolve(data.Location);
                }
            });
        });

    } catch (error) {
        
    }
    

  }




