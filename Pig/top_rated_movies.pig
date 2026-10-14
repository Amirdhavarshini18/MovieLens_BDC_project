-- Load the data
ratings = LOAD '/user/maria_dev/ml-100k/u.data' USING PigStorage('\t') AS (user_id:int, movie_id:int, rating:int, timestamp:long);

-- Group by movie and calculate average rating + count
movie_group = GROUP ratings BY movie_id;
movie_stats = FOREACH movie_group GENERATE
    group AS movie_id,
    AVG(ratings.rating) AS avg_rating,
    COUNT(ratings) AS num_ratings;

-- Filter movies with at least 50 ratings (consistent with Hive/Spark/MapReduce)
top_rated_movies = FILTER movie_stats BY num_ratings >= 50;

-- Order by average rating in descending order
ordered_top_rated_movies = ORDER top_rated_movies BY avg_rating DESC;

-- Store the result
STORE ordered_top_rated_movies INTO '/output/top_rated_movies';
