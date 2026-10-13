import sys
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_unixtime, year, avg

# Initialize Spark Session
spark = SparkSession.builder.appName("RatingTrendsOverTime").getOrCreate()

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

# Convert timestamp to year
ratings = ratings.withColumn("year", year(from_unixtime(col("timestamp"))))

# Calculate the average rating per year
average_rating_per_year = ratings.groupBy("year").agg(avg("rating").alias("avg_rating"))

# Show the trends in ratings over the years
average_rating_per_year.orderBy("year").show()

# Stop the Spark session
spark.stop()
