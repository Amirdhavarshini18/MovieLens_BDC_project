USE movielens;

-- Convert timestamp to year and create a temporary table
CREATE TEMPORARY TABLE ratings_with_year AS
SELECT *, FROM_UNIXTIME(timestamp, 'yyyy') AS year
FROM ratings;

-- Query to find the average rating per year
SELECT year, AVG(rating) AS avg_rating
FROM ratings_with_year
GROUP BY year
ORDER BY year;
