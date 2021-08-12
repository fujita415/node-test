
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var config = require('../config');
var db = require('../utils/connection');


router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// ---------------Controllers--------
const movies = require('../controllers/movies');



var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      var filetype = '';
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'image/jpg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'video/mp4') {
        filetype = 'mp4';profile
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});
var pageUpload = upload.fields([{ name: 'movie_pic', maxCount: 1 }])

const getFile = require('../controllers/getFile');

router.get("/uploads/:image", getFile.getImage);
 router.post('/insertmovie',pageUpload,movies.insertMovie.bind(this, db));
 router.post('/insertreview',movies.insertReview.bind(this, db));
 router.post('/getmoviedetail',movies.getMovieDetail.bind(this, db));
 router.post('/disablemovie',movies.disableMovie.bind(this, db));
 router.post('/getmoviereviewdetail',movies.getMovieReviewDetail.bind(this, db));
 router.post('/getallmovieDetail',movies.getAllMovieDetail.bind(this, db));
 
/* ---------------------------------------------------------------------------------------- */





router.get("/", function (request, response) {
    response.contentType("routerlication/json");
    response.end(JSON.stringify("Node is running"));
});

router.get("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}", 
    });
});

router.post("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});


module.exports.routes = router;
