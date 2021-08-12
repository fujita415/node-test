var db = require('../utils/connection');

module.exports = {
   insertMovie : "insert into movie SET ?",
   insertReview : "insert into movieReview SET ?",
   getMovieDetail : "select * from (select m.id,m.name,getMovieTypes(m.id) as MovieType,m.description,m.releaseDate,m.language,m.director,m.actors,m.movieLink,concat('http://espsofttech.tech:6013/api/uploads/',m.image) as image,case when m.isEnable=1 then 'Enable' else 'Disable' end as status from movie as m ) as a where id=?",
   disablemovie : "UPDATE movie SET isEnable = ? where id =?",
   getMovieReviewDetail : "select m.id as movieId,m.name as movieName,mr.review,mr.rating,date_format(mr.datetime,'%d-%M-%Y') as date from movieReview as mr left join movie as m on m.id=mr.movieId where movieId=?"

}