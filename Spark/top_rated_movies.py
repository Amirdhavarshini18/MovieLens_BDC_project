import sys
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count

# Initialize Spark Session
spark = SparkSession.builder.appName("TopRatedMovies").getOrCreate()

# Resolve data path: accepts command-line argument, falls back to local file if present, or HDFS default
input_path = sys.argv[1] if len(sys.argv) > 1 else (
    "ml-100k/u.data" if os.path.exists("ml-100k/u.data") else "/user/maria_dev/ml-100k/u.data"
)

# Load the ratings data
ratings = spark.read.csv(input_path, sep="\t", inferSchema=True)
ratings = ratings.withColumnRenamed("_c0", "user_id") \
                 .withColumnRenamed("_c1", "movie_id") \
                 .withColumnRenamed("_c2", "rating") \
                 .withColumnRenamed("_c3", "timestamp")

# Calculate the average rating and rating count per movie
minimum_ratings = 50
top_rated = ratings.groupBy("movie_id") \
                   .agg(avg("rating").alias("avg_rating"), count("rating").alias("num_ratings")) \
                   .filter(f"num_ratings >= {minimum_ratings}")

# Show the top-rated movies in descending order of average rating
top_rated.orderBy("avg_rating", ascending=False).show(10)

# Stop the Spark session
spark.stop()
