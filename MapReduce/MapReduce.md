## MapReduce

MapReduce is a powerful programming model for processing large datasets with a distributed algorithm on a Hadoop cluster. It simplifies data processing by dividing the task into two primary phases: the map phase and the reduce phase.

### MapReduce Streaming and Libraries

**MapReduce Streaming** is a utility that allows users to create and run MapReduce jobs with any executable or script as the mapper and/or reducer. This is particularly useful for developers familiar with languages like Python, Perl, and Ruby. 

In this project, we utilized **Hadoop Streaming** to integrate our Python scripts for data processing. Hadoop Streaming allows us to execute scripts using standard input (stdin) and standard output (stdout) for communication between the Hadoop framework and the user-defined scripts.

- **Standard Input (stdin)**: The input data for the mapper is passed as standard input. Each line of input is processed by the mapper.
- **Standard Output (stdout)**: The mapper writes the output key-value pairs to standard output, which is then passed to the reducer.

**mrjob**: We used the `mrjob` library, a Python package that simplifies writing and running Hadoop Streaming jobs. This library handles many complexities of Hadoop, making it easier to focus on the logic of data processing.

#### Using stdin and stdout

In our MapReduce implementation, the mapper reads input from stdin and writes output to stdout. This is how Hadoop Streaming interfaces with our Python scripts. Here’s a conceptual flow:

1. **Mapper**: Reads input from stdin, processes each line, and writes key-value pairs to stdout.
2. **Reducer**: Reads intermediate key-value pairs from stdin and writes the final output to stdout.

#### Running the MapReduce Scripts

You can run any of the six scripts directly using Python and `mrjob` on your local machine:

```powershell
# 1. Rating Distribution (Counts per rating 1-5)
python MapReduce/ratingsdistribution.py ml-100k/u.data

# 2. Movie Popularity (Sorted descending by number of ratings)
python MapReduce/moviepopularity.py ml-100k/u.data

# 3. User Activity (Sorted descending by number of ratings given by each user)
python MapReduce/useractivity.py ml-100k/u.data

# 4. Movie Average Ratings (Average rating per movie ID)
python MapReduce/movieaverageratings.py ml-100k/u.data

# 5. Rating Trends (Rating count and average rating per year)
python MapReduce/RatingTrends.py ml-100k/u.data

# 6. Top Rated Movies (Sorted descending by average rating, default min 50 ratings)
python MapReduce/topratedmovies.py ml-100k/u.data

# Optional: View all 1,682 movies without a minimum threshold
python MapReduce/topratedmovies.py ml-100k/u.data --min-ratings 0
```

**Prerequisites**:
- **Python**: 3.7+
- **mrjob library**: Install with `pip install mrjob`
- **Hadoop (Optional)**: Required only if running on a real Hadoop cluster with `-r hadoop`.

By utilizing `mrjob`, you can develop and test MapReduce algorithms locally on your laptop without needing a running Hadoop cluster, while remaining fully compatible with Hadoop Streaming in production.