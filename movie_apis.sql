
drop table if exists movieType;
create table movieType(
  id int(11) not null auto_increment,
  name char(100) not null,
  ip char(30),
  datetime timestamp default CURRENT_TIMESTAMP,
	PRIMARY KEY (id))
    ENGINE=INNODB DEFAULT CHARset=utf8;

drop table if exists movie;
create table movie(
  id int(11) not null auto_increment,
  name char(100) not null,
  description char(40) not null ,
  realeaseDate char(100),
  language char(50),
  director char(50),
  actors char(255),
  movieLink char(255),
  image char(100),
  isEnable tinyint(1) default 1 comment '0=false, 1=true',
  ip char(30),
  datetime timestamp default CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
    ENGINE=INNODB DEFAULT CHARset=utf8;



drop table if exists movieTypes;
create table movieTypes(
  id int(11) not null auto_increment,
  movieId int(11) not null,
  movieTypeId int(11) not null ,
  ip char(30),
  datetime timestamp default CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  foreign key(movieId) references movie(id)on delete restrict on update restrict,
  foreign key(movieTypeId) references movieType(id)on delete restrict on update restrict)
  ENGINE=INNODB DEFAULT CHARset=utf8;


drop table if exists movieReview;
create table movieReview(
  id int(11) not null auto_increment,
  movieId int(11) not null,
  rating int(11) not null ,
  review char(255) not null,
  ip char(30),
  datetime timestamp default CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  foreign key(movieId) references movie(id)on delete restrict on update restrict)
  ENGINE=INNODB DEFAULT CHARset=utf8;



drop FUNCTION  if exists getMovieTypes;
DELIMITER // 
CREATE FUNCTION  getMovieTypes(movie_id int(11))  RETURNS char(255)
BEGIN
DECLARE return_param char(255);
select group_concat(name) into return_param from movieTypes  as mts left join movieType as mt on mt.id=mts.movieTypeId where movieId=Movie_id;
 RETURN return_param;
END//

drop FUNCTION  if exists getMovieRating;
DELIMITER // 
CREATE FUNCTION  getMovieRating(movie_id int(11))  RETURNS char(255)
BEGIN
DECLARE return_param char(255);
select sum(rating)/count(id) into return_param from movieReview  where movieId=Movie_id;
 RETURN return_param;
END//


  insert into movieType(name)values('Comedy'),('Drama'),('Romance'),('Action'),('Thriller');