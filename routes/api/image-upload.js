const express = require('express');
const router = express.Router();
const upload = require('../../services/image-upload');
const aws = require('aws-sdk')
const config = require ('config');

const singleUpload = upload.single('image');

// @route  GET api/aws/image-upload
// @desc   Uploads a single picture to s3 bucket
// @access Public
router.post('/image-upload', (req, res) => {

    singleUpload(req, res, (err) => {
        
        if (err) {
            return res.status(422).json({ msg: err.message });
        }

        return res.json({
            'imageUrl': req.file.location,
            'imageKey': req.file.key
        });
    })
});

// @route  DELETE api/aws/delete/:image_key
// @desc   Uploads a single picture to s3 bucket
// @access Public
router.delete('/remove/:image_key', (req, res) => {
    const s3 = new aws.S3({
        secretAccessKey: config.get('awsSecretKey'),
        accessKeyId: config.get('awsAccessKey'),
        region: config.get('awsRegion')
      });
      
      const params = {
          Bucket: 'soen341igclone-1',
          Key: req.params.image_key
      };

      s3.getObject(params, (error, data) => {
        if (error) {
            return res.status(404).send("File does not exist");
        } else {
            s3.deleteObject(params, (error, data) => {
                if (error) {
                  return res.status(500).send(error);
                }
                return res.status(200).send("File has been deleted successfully");
            });
        }
      });
})

module.exports = router;