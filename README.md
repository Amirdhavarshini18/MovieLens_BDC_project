# MovieLens 100K - Big Data Analytics Project

## Project Overview

This project implements an end-to-end Big Data analytics pipeline for the **MovieLens 100K dataset** across the Apache Hadoop ecosystem. It demonstrates distributed storage, batch computation, relational warehousing, interactive querying, and modern in-memory data processing using:

- **HDFS**: Distributed file storage for raw datasets (`u.data`, `u.item`).
- **MapReduce (`mrjob`)**: Python-based streaming MapReduce jobs for distributed data aggregations.
- **Apache Hive (3.1.3)**: Data warehousing, table schemas, aggregations, and multi-table MapReduce joins via Beeline.
- **Apache Spark (PySpark 4.2.0)**: In-memory distributed DataFrame processing and analytics.
- **MySQL (8.0)**: Relational datastore containing 6 tables and 100,000+ records for analytics and ETL integration.
- **Apache Pig & Apache Sqoop**: Script specifications for Pig Latin transformations and Sqoop RDBMS-Hadoop ETL operations.

---

## Architecture & Infrastructure

The project runs on a containerized and host-integrated hybrid environment:

```
+--------------------------------------------------------------------------------+
|                               HOST MACHINE (Windows)                           |
|  - Python 3.10 / Java 23 / PySpark 4.2.0 / mrjob                               |
|  - MapReduce Scripts (MapReduce/*.py) & Spark Jobs (Spark/*.py)                |
+--------------------------------------------------------------------------------+
                                       |
                   Docker Virtual Network (fintech-net)
                                       |
    +-------------------+   +--------------------+   +-------------------+
    |  fintech-namenode |   |  fintech-datanode  |   |   movielens-hive  |
    |  Hadoop 3.2.1     |<->|  Hadoop 3.2.1      |<->|   Hive 3.1.3      |
    |  (HDFS Master)    |   |  (HDFS Storage)    |   |   (Beeline/HS2)   |
    +-------------------+   +--------------------+   +-------------------+
              |                                                |
              +-----------------------+------------------------+
                                      |
                            +--------------------+
                            |   fintech-mysql    |
                            |   MySQL 8.0        |
                            |   (Port 13306)     |
                            +--------------------+
```

### Active Containers

| Container Name | Technology | Ports / Mode | Role |
| :--- | :--- | :--- | :--- |
| `fintech-namenode` | Hadoop 3.2.1 | `19000:9000`, `19870:9870` | HDFS NameNode master |
| `fintech-datanode` | Hadoop 3.2.1 | `9864` | HDFS DataNode storage |
| `movielens-hive` | Apache Hive 3.1.3 | `10000:10000` | HiveServer2 & Beeline CLI |
| `fintech-mysql` | MySQL 8.0 | `13306:3306` | Relational database (`movielens`) |

---

## Project Structure & Features Matrix

The project implements **six core analytics dimensions** across all processing engines:

| Analytics Feature | MapReduce (`MapReduce/`) | Hive (`Hive/`) | Spark (`Spark/`) | Pig (`Pig/`) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Ratings Distribution** | `ratingsdistribution.py` | `ratings_distribution.hql` | `ratings_distribution.py` | `rating_distribution.pig` |
| **2. Movie Popularity** | `moviepopularity.py` | `Movie_popularity.hql` | `movie_popularity.py` | `movie_popularity.pig` |
| **3. Average Ratings** | `movieaverageratings.py` | `average_ratings.hql` | `movie_average_ratings.py` | `average_ratings.pig` |
| **4. Top Rated Movies** | `topratedmovies.py` | `top_rated_movies.hql` | `top_rated_movies.py` | `top_rated_movies.pig` |
| **5. Rating Trends** | `RatingTrends.py` | `rating_trends_over_time.hql` | `rating_trends_over_time.py` | `rating_trends_over_time.pig` |
| **6. User Activity** | `useractivity.py` | `user_activity.hql` | `user_activity.py` | `user_activity.pig` |

---

## Setup & Verification Guide

### 1. Verify Running Infrastructure
Verify that the cluster containers are healthy:
```bash
docker ps
```

### 2. Verify HDFS Data Ingestion
Check that the MovieLens dataset files reside on HDFS:
```bash
docker exec fintech-namenode hdfs dfs -ls /user/movielens/ml-100k/
docker exec fintech-namenode hdfs dfs -ls /user/maria_dev/ml-100k/
```
*Expected files: `u.data` (1,979,173 bytes) and `u.item` (236,344 bytes).*

---

### 3. Hive Queries & Verified Outputs

Connect to HiveServer2 and run queries using Beeline:

#### A. Total Ratings Count
```bash
docker exec movielens-hive beeline -u "jdbc:hive2://localhost:10000" -n hive \
  -e "SELECT COUNT(*) FROM ratings;"
```
**Verified Output:**
```text
+---------+
|   _c0   |
+---------+
| 100000  |
+---------+
```

#### B. Ratings Distribution Aggregation
```bash
docker exec movielens-hive beeline -u "jdbc:hive2://localhost:10000" -n hive \
  -e "SELECT rating, COUNT(*) AS count FROM ratings GROUP BY rating ORDER BY rating;"
```
**Verified Output:**
```text
+---------+--------+
| rating  | count  |
+---------+--------+
| 1       | 6110   |
| 2       | 11370  |
| 3       | 27145  |
| 4       | 34174  |
| 5       | 21201  |
+---------+--------+
```

#### C. Top Rated Movies (JOIN + GROUP BY + HAVING)
```bash
docker cp Hive/top_rated_movies.hql movielens-hive:/tmp/top_rated_movies.hql
docker exec movielens-hive beeline -u "jdbc:hive2://localhost:10000" -n hive \
  -f /tmp/top_rated_movies.hql
```
**Verified Output:**
```text
+-------------+--------------------------------------------------------+---------------------+--------------+
| m.movie_id  |                        m.title                         |     avg_rating      | num_ratings  |
+-------------+--------------------------------------------------------+---------------------+--------------+
| 408         | Close Shave, A (1995)                                  | 4.491071428571429   | 112          |
| 318         | Schindler's List (1993)                                | 4.466442953020135   | 298          |
| 169         | Wrong Trousers, The (1993)                             | 4.466101694915254   | 118          |
| 483         | Casablanca (1942)                                      | 4.45679012345679    | 243          |
| 114         | Wallace & Gromit: The Best of Aardman Animation (1996) | 4.447761194029851   | 67           |
| 64          | Shawshank Redemption, The (1994)                       | 4.445229681978798   | 283          |
| 603         | Rear Window (1954)                                     | 4.3875598086124405  | 209          |
| 12          | Usual Suspects, The (1995)                             | 4.385767790262173   | 267          |
| 50          | Star Wars (1977)                                       | 4.3584905660377355  | 583          |
| 178         | 12 Angry Men (1957)                                    | 4.344               | 125          |
+-------------+--------------------------------------------------------+---------------------+--------------+
```

---

### 4. MySQL Relational Database Verification

Verify the MovieLens database in MySQL:
```bash
docker exec fintech-mysql mysql -u root -p<YOUR_MYSQL_PASSWORD> movielens \
  -e "SELECT 'genres' tbl, count(*) cnt FROM genres UNION ALL SELECT 'genres_movies', count(*) FROM genres_movies UNION ALL SELECT 'movies', count(*) FROM movies UNION ALL SELECT 'occupations', count(*) FROM occupations UNION ALL SELECT 'ratings', count(*) FROM ratings UNION ALL SELECT 'users', count(*) FROM users;"
```
**Verified Output:**
```text
tbl            cnt
genres         18
genres_movies  2891
movies         1682
occupations    21
ratings        100000
users          943
```

---

### 5. PySpark Execution & Verified Output

Run any Spark analytics script using local or HDFS data:
```powershell
python Spark/ratings_distribution.py ml-100k/u.data
```
**Verified Output:**
```text
+------+-----+
|rating|count|
+------+-----+
|     1| 6110|
|     2|11370|
|     3|27145|
|     4|34174|
|     5|21201|
+------+-----+
```

---

### 6. MapReduce (`mrjob`) Execution

Run MapReduce streaming jobs locally:
```powershell
python MapReduce/ratingsdistribution.py ml-100k/u.data
```
Generated job outputs are preserved under `MapReduce/output_*/part-*` and summarized in the root `.txt` files (`ratings_distribution.txt`, `movie_popularity.txt`, `movie_average_ratings.txt`, `top_rated_movies.txt`, `user_activity.txt`, `rating_trends.txt`).

---

## Pig & Sqoop Status & Execution Requirements

### Apache Pig (`Pig/*.pig`)
- **Status**: The repository includes 6 Pig Latin scripts (`average_ratings.pig`, `movie_popularity.pig`, `rating_distribution.pig`, `rating_trends_over_time.pig`, `top_rated_movies.pig`, `user_activity.pig`).
- **Prerequisites to execute**: Requires an Apache Pig runtime (Pig 0.17+), Java 8/11, and `$HADOOP_HOME` configuration pointing to the cluster.
- **Command to run** (if Pig is installed):
  ```bash
  pig -x mapreduce Pig/rating_distribution.pig
  ```

### Apache Sqoop (`Sqoop/*`)
- **Status**: Script templates for HDFS import, Hive import, and MySQL export are provided in `Sqoop/*.txt`. The relational target database (`movielens`) has already been initialized with all 6 tables and 100,000 records via `Sqoop/movielens_dataset_up_commands.sql`.
- **Prerequisites to execute**: Requires Apache Sqoop 1.4.7+, MySQL Connector/J driver jar in `$SQOOP_HOME/lib`, and Hadoop client classpath.
- **Industry Note**: Apache Sqoop was officially retired by the Apache Software Foundation in June 2021. Modern data pipelines achieve equivalent ETL using Spark JDBC:
  ```python
  spark.read.format("jdbc").option("url", "jdbc:mysql://fintech-mysql:3306/movielens")...
  ```
