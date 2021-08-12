
const movieQueries = require("../services/movieQueries");


// Insert Movie
exports.insertMovie = async (db, req, res) => {
  
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var language = req.body.language;
    var director = req.body.director;
    var actors = req.body.actors;
    var movielink = req.body.movielink;    
    var movie_pic =  (!req.files['movie_pic'])?null:req.files['movie_pic'][0].filename;
    var isEnable = 1
    var ip = null;
    var datetime = new Date()
  
    try {
        if (!name) {
            return res.status(400).send({
                success: false,
                msg: "name required "
            });
        }
        if (!description) {
            return res.status(400).send({
                success: false,
                msg: "description required"
            });
        }
       
        if (!releaseDate) {
            return res.status(400).send({
                success: false,
                msg: "releaseDate  required"
            });
        }

        if (!language) {
            return res.status(400).send({
                success: false,
                msg: "language  required"
            });
        }
        if (!director) {
            return res.status(400).send({
                success: false,
                msg: "director  required"
            });
        }
        if (!actors) {
            return res.status(400).send({
                success: false,
                msg: "actors  required"
            });
        }
        if (!movielink) {
            return res.status(400).send({
                success: false,
                msg: "movielink  required"
            });
        }
        if (!movie_pic) {
            return res.status(400).send({
                success: false,
                msg: "movie_pic required"
            });
        }
        
        
        var movie = {
            name : name,
            description :description,
            releaseDate : releaseDate,
            language : language,
            director : director,
            actors : actors,
            movieLink : movielink,
           image : movie_pic,
            isEnable : isEnable,
            ip : ip,
            datetime : datetime
        }

    db.query(movieQueries.insertMovie,[movie], async function (error, data) {
            
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "unexpected error occured",
                    error
                });
            } else if (data) {
                return res.status(200).send({
                    success: true,
                    msg: "Movie Record Inserted Successfully"
                });
               }
    })
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "unexpected internal error",
            err
        });
    }

}

exports.insertReview = async (db, req, res) => {
  
    var movieId = req.body.movieId;
    var rating = req.body.rating;
    var review = req.body.review;
    var ip = null;
    var datetime = new Date()
  
    try {
        if (!movieId) {
            return res.status(400).send({
                success: false,
                msg: "movieId required "
            });
        }
        if (!rating) {
            return res.status(400).send({
                success: false,
                msg: "rating required"
            });
        }
       
        if (!review) {
            return res.status(400).send({
                success: false,
                msg: "review  required"
            });
        }

      
        
        var moviereview = {
           movieId : movieId,
            rating :rating,
            review : review,
            ip : ip,
            datetime : datetime
        }

    db.query(movieQueries.insertReview,[moviereview], async function (error, data) {
            
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "unexpected error occured",
                    error
                });
            } else if (data) {
                return res.status(200).send({
                    success: true,
                    msg: "Movie Review Inserted Successfully"
                });
               }
    })
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "unexpected internal error",
            err
        });
    }

}


exports.getMovieReviewDetail = async (db,req,res)=>{

    var movieId = req.body.movieId;

    if (!movieId) {
        return res.status(400).send({
            success: false,
            msg: "MovieId required"
        });
    }
    
    await db.query(movieQueries.getMovieReviewDetail,[movieId],function(error,data){
        if(error){
        return res.status(400).send({
            success: false,
            msg: "Error : Server not responding please try again later! ",
            error
        });
    }
        if(data.length>0){
    res.status(200).send({
        success:true,
        msg : "Moive Reviews Detail",
        response : data
     });
        }else{
            res.status(400).send({
                success:false,
                msg:"No Data"
            });            
        }
    });
    }
    


exports.getMovieDetail = async (db,req,res)=>{

    var id = req.body.id

    if (id=='') {
        return res.status(400).send({
            success: false,
            msg: "id required"
        });
    }
    
    await db.query(movieQueries.getMovieDetail,[id],function(error,data){
        if(error){
        return res.status(400).send({
            success: false,
            msg: "Error : Server not responding please try again later! ",
            error
        });
    }
        if(data.length>0){
    res.status(200).send({
        success:true,
        msg : "Movie Detail",
        response : data[0]
     });
        }else{
            res.status(400).send({
                success:false,
                msg:"No Data"
            });            
        }
    });
    }

    
exports.getAllMovieDetail = async (db,req,res)=>{


    var name = req.body.name;
    var sort = req.body.sort;
    var language = req.body.language;
    var actors = req.body.actors;
    var director = req.body.director;
    var offset = req.body.offset;
    var limit =req.body.limit;

    if(!limit && !offset){
        return res.status(400).send({
            success: false,
            msg: "Limit & Offset required"
        });
    }
    
    var sql = "select * from (select m.id,m.name,getMovieTypes(m.id) as MovieType,m.description,m.releaseDate,m.language,m.director,m.actors,m.movieLink,concat('http://espsofttech.tech:6013/uploads/',m.image) as image,case when m.isEnable=1 then 'Enable' else 'Disable' end as status from movie as m ) as a where 1";
    
    if (name) {
        var sql = sql+ ` and name like '%${name}%' `; 
    }
    if (language) {
        var sql = sql+ ` and language like '%${language}%' `; 
    }
    if (actors) {
        var sql = sql+ ` and actors like '%${actors}%' `; 
    }
    if (director) {
        var sql = sql+ ` and director like '%${director}%' `; 
    }
    if (sort) {
        var sql = sql+ ` order by id  ${sort} `; 
    }
    
    if (limit) {
        var sql = sql+ ` limit ${offset},${limit} `; 
    }

    await db.query(sql, async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg : "Movie ALL Details",
                offset :parseInt(limit)+parseInt(offset),
                response : data,

            });

        }
        else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
    }





exports.disableMovie = async (db, req, res) => {
  
    var movieId = req.body.movieId;
    var isEnable = req.body.isEnable;
   
    try {
        if (!movieId) {
            return res.status(400).send({
                success: false,
                msg: "Movie Id required "
            });
        }
      
        
    db.query(movieQueries.disablemovie,[isEnable,movieId], async function (error, data) {
            
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "unexpected error occured",
                    error
                });
            } else if (data) {
              if(isEnable ==1){
                return res.status(200).send({
                    success: true,
                    msg: "Movie  Enable Successfully"
                });
              }else{
                return res.status(200).send({
                    success: true,
                    msg: "Movie Disabled Successfully"
                });
              }
              
               }
    })
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "unexpected internal error",
            err
        });
    }

}


    