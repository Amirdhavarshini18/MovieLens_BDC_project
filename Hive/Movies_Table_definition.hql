CREATE DATABASE IF NOT EXISTS movielens;
USE movielens;

-- Create the movies table for MovieLens 100K (u.item)
-- u.item has 24 pipe-delimited (|) fields:
-- movie_id | title | release_date | video_release_date | IMDb_URL |
-- unknown | Action | Adventure | Animation | Children's | Comedy | Crime |
-- Documentary | Drama | Fantasy | Film-Noir | Horror | Musical | Mystery |
-- Romance | Sci-Fi | Thriller | War | Western
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT,
    title STRING,
    release_date STRING,
    video_release_date STRING,
    imdb_url STRING,
    unknown INT,
    action INT,
    adventure INT,
    animation INT,
    childrens INT,
    comedy INT,
    crime INT,
    documentary INT,
    drama INT,
    fantasy INT,
    film_noir INT,
    horror INT,
    musical INT,
    mystery INT,
    romance INT,
    sci_fi INT,
    thriller INT,
    war INT,
    western INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '|';

-- Load data into the movies table (u.item contains movie metadata)
LOAD DATA INPATH '/user/maria_dev/ml-100k/u.item' INTO TABLE movies;
