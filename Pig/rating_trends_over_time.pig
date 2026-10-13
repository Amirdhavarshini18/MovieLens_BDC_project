-- Load the data
ratings = LOAD '/user/maria_dev/ml-100k/u.data' USING PigStorage('\t') AS (user_id:int, movie_id:int, rating:int, timestamp:int);

-- Extract year from the timestamp (using Pig built-in DateTime functions: timestamp in seconds * 1000L to milliseconds)
ratings_with_year = FOREACH ratings GENERATE movie_id, rating, GetYear(ToDate((long)timestamp * 1000L)) AS year;
-- Note: An alternate arithmetic approximation is: (int)(timestamp / 31556926 + 1970) AS year;

-- Calculate average rating per year
year_group = GROUP ratings_with_year BY year;
average_ratings_per_year = FOREACH year_group GENERATE group AS year, AVG(ratings_with_year.rating) AS avg_rating;

-- Order by year
ordered_average_ratings_per_year = ORDER average_ratings_per_year BY year;

-- Store the result
STORE ordered_average_ratings_per_year INTO '/output/rating_trends_over_time';
