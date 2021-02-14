const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require ('config');
 
aws.config.update({
    secretAccessKey: config.get('awsSecretKey'),
    accessKeyId: config.get('awsAccessKey'),
    region: config.get('awsRegion')
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'soen341igclone-1',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;