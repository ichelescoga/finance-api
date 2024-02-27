const accountService = require("../services/accountService");
const BeecommRepository = require("../repository/BeecommRepository");
const AWS = require("aws-sdk");

exports.getDMSByExp = async (req, res, next) => {
    try {
        let expId = req.params.expId  
        let dms = await BeecommRepository.getDMSByExp(expId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

exports.deactivateDMS = async (req, res, next) => {
    try {
        let params = {
            detailDMSId: req.params.detailDMSId,
            status: 0
        }
        let dmsDetail = await BeecommRepository.getDMSDetailByStatus(params);
        if (dmsDetail.length > 0){
            res.status(200).json({
                success: false,
                response: "DMS Detail id doesn't exist or is already inactive"
            });
            return
        }
            
        let dms = await BeecommRepository.deactivateDMS(params.detailDMSId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

exports.activateDMS = async (req, res, next) => {
    try {
        let params = {
            detailDMSId: req.params.detailDMSId,
            status: 1
        }
        let dmsDetail = await BeecommRepository.getDMSDetailByStatus(params);
        if (dmsDetail.length > 0){
            res.status(200).json({
                succes: false,
                response: "DMS Detail id doesn't exist or is already active"
            });
            return
        }            
        let dms = await BeecommRepository.activateDMS(params.detailDMSId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

exports.updateDMSFreeText = async (req, res, next) => {
    try {
        let params = {
            detailDMSId: req.body.detailDMSId,
            freeText: req.body.freeText
        }
        let dms = await BeecommRepository.updateDMSFreeText(params);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

exports.createTariffItem = async (req, res, next) => {
    try {
        let params = {

            code: req.body.code,
            description: req.body.description,
            tariff: req.body.dai.toString(),
            section: "11",
            iva: "12",
            observation: "",
            firstUnit: req.body.firstUnit,
            secondUnit: req.body.secondUnit,
            thirdUnit: req.body.thirdUnit

        }
        //Partidas de 10 digitos
        if (params.code.length === 10){
            /*console.log(params.code)
            console.log(params.code.length)
            console.log(params.code.substring(params.code.length - 2))
            console.log(params.code.substring(0,4))
            console.log(params.code.substring(4,6))
            console.log(params.code.substring(6,8))
            console.log(params.code.substring(8,10))*/
            let codeDigits = []
            codeDigits.push(params.code.substring(0,4))
            codeDigits.push(params.code.substring(4,6))
            codeDigits.push(params.code.substring(6,8))
            codeDigits.push(params.code.substring(8,10))

            params.codeDai = codeDigits[0] + "." + codeDigits[1] + "." + codeDigits[2] + "." + codeDigits[3]
            params.codeUnit = codeDigits[0] + codeDigits[1] + codeDigits[2]
            console.log(params)

            let sac = await BeecommRepository.getSAC(params);
            let dai = await BeecommRepository.getSATDai(params);
            let tariffMeasurementUnits = await BeecommRepository.getTariffMeasurementUnits(params);

            if (sac.length > 0){
                res.status(406).json({
                    succes: false,
                    response: "Codigo in sac table is already exist.",
                    sac: sac
                });
                return
            }
            else if (dai.length > 0){
                res.status(406).json({
                    succes: false,
                    response: "Partida in sat dai table is already exist.",
                    dai: dai
                });
                return
            }
            else if (tariffMeasurementUnits.length > 0){
                res.status(406).json({
                    succes: false,
                    response: "Inciso in sat unidades medida arancel table is already exist.",
                    tariffMeasurementUnits: tariffMeasurementUnits
                });
                return
            }



            sac = await BeecommRepository.createSAC(params);
            dai = await BeecommRepository.createSATDai(params);
            tariffMeasurementUnits = await BeecommRepository.createTariffMeasurementUnits(params);
            res.status(200).json({
                succes: true,
                response: {
                    sac: sac,
                    dai: dai,
                    tariffMeasurementUnits: tariffMeasurementUnits
                }
            });
            return
        }

        res.status(406).json({
            succes: false
        });

        
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

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

function uploadFileS3(fileBuffer, fileName, transactionType){
    try {
        let s3Bucket;
        s3Bucket = new AWS.S3({
            accessKeyId: process.env.AWS_S3_BEECOMM_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_BEECOMM_ACCESS_KEY_SECRET,
            region: process.env.AWS_S3_BEECOMM_REGION,
            params: {
                Bucket: process.env.AWS_S3_BEECOMM_BUCKET_NAME
            }
        });

        let filePath = `beeupload/${fileName}`;
        let buffer = undefined;
        let fileData = {}

        if (transactionType === 'imagen'){
            buffer = Buffer.from(fileBuffer.replace(/^data:image\/\w+;base64,/, ""), "base64");
            fileData = {
                Key: filePath,
                Body: buffer,
                ContentEncoding: "base64",
                ContentType: "image/jpeg",
                CacheControl: "max-age=172800"
            };
        }
            
        if (transactionType === 'pdf'){
            buffer = fileBuffer
            fileData = {
                Key: filePath,
                Body: buffer,
                ContentType: "application/pdf",
                CacheControl: "max-age=172800"
            };
        }

        if (transactionType === 'csv'){
            buffer = Buffer.from(fileBuffer.replace(/^data:image\/\w+;base64,/, ""), "base64");
            fileData = {
                Key: filePath,
                Body: buffer,
                ContentType: "text/csv",
                CacheControl: "max-age=172800"
            };
        }

        if (transactionType === 'xml'){
            buffer = Buffer.from(fileBuffer.replace(/^data:image\/\w+;base64,/, ""), "base64");
            fileData = {
                Key: filePath,
                Body: buffer,
                ContentType: "text/xml",
                CacheControl: "max-age=172800"
            };
        }

        if (transactionType === 'text'){
            buffer = Buffer.from(fileBuffer.replace(/^data:image\/\w+;base64,/, ""), "base64");
            fileData = {
                Key: filePath,
                Body: buffer,
                ContentType: "text/plain",
                CacheControl: "max-age=172800"
            };
        }

        return new Promise((resolve) => {
            s3Bucket.upload(fileData, function (err, data) {
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
        console.error(error)
    }
    

  }

