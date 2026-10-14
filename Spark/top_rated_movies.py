import sys
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count

# Initialize Spark Session
spark = SparkSession.builder.appName("TopRatedMovies").getOrCreate()

# Resolve data paths: accepts command-line argument, falls back to local file if present, or HDFS default
input_path = sys.argv[1] if len(sys.argv) > 1 else (
    "ml-100k/u.data" if os.path.exists("ml-100k/u.data") else "/user/maria_dev/ml-100k/u.data"
)
movies_path = sys.argv[2] if len(sys.argv) > 2 else (
    "ml-100k/u.item" if os.path.exists("ml-100k/u.item") else "/user/maria_dev/ml-100k/u.item"
)

# Load the ratings data (tab-delimited: user_id, movie_id, rating, timestamp)
ratings = spark.read.csv(input_path, sep="\t", inferSchema=True)
ratings = ratings.withColumnRenamed("_c0", "user_id") \
                 .withColumnRenamed("_c1", "movie_id") \
                 .withColumnRenamed("_c2", "rating") \
                 .withColumnRenamed("_c3", "timestamp")

# Load movie metadata (pipe-delimited, latin-1 encoding: movie_id, title, ...)
movies = spark.read.csv(movies_path, sep="|", inferSchema=True, encoding="iso-8859-1")
movies = movies.select(
    movies["_c0"].alias("movie_id"),
    movies["_c1"].alias("title")
)

# Calculate the average rating and rating count per movie
minimum_ratings = 50
top_rated = ratings.groupBy("movie_id") \
                   .agg(avg("rating").alias("avg_rating"), count("rating").alias("num_ratings")) \
                   .filter(f"num_ratings >= {minimum_ratings}")

# Join with movie titles
top_rated_with_titles = top_rated.join(movies, on="movie_id", how="left")

# Show the top-rated movies in descending order of average rating
top_rated_with_titles.select("movie_id", "title", "avg_rating", "num_ratings") \
                     .orderBy("avg_rating", ascending=False) \
                     .show(10, truncate=False)

# Stop the Spark session
spark.stop()
