# Apache Tez Overview

Apache Tez is an application framework built on Hadoop YARN that allows for a complex directed-acyclic-graph (DAG) of tasks for processing data. Tez improves the performance of big data applications by enabling complex query execution in a more efficient manner compared to traditional MapReduce.

## Configure Hive to Use Tez

In `hive-site.xml`:
```xml
<property>
    <name>hive.execution.engine</name>
    <value>tez</value>
</property>
<property>
    <name>tez.lib.uris</name>
    <value>${fs.defaultFS}/apps/tez/tez.tar.gz</value>
</property>
```

Alternatively, set the execution engine inside the Hive shell:
```sql
SET hive.execution.engine=tez;
```

## Run a Sample Hive Query Using Tez

### 1. Open Hive Shell
Access the Hive shell from your terminal:
```bash
hive
```

### 2. Create and Load Table
```sql
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT,
    title STRING,
    release_date STRING,
    video_release_date STRING,
    imdb_url STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '|'
STORED AS TEXTFILE;

LOAD DATA INPATH '/user/maria_dev/ml-100k/u.item' INTO TABLE movies;

SELECT * FROM movies LIMIT 10;
```

## Performance Differences

1. **Tez vs. MapReduce**: Tez provides a more flexible and efficient execution framework compared to traditional MapReduce. It enables complex DAGs of tasks, reducing the need for multiple stages and intermediate disk writes, leading to significant performance improvements.
2. **Tez vs. Spark**: While both Tez and Spark offer DAG-based execution, Spark tends to be faster for iterative algorithms and in-memory processing. Tez, however, is often more efficient for single-pass, batch-oriented jobs, especially when integrated with Hive.
3. **Tez vs. Pig**: Pig scripts can also benefit from Tez as the execution engine (`pig -x tez`), leading to better performance. However, Pig is more abstract and high-level compared to direct Tez API usage.
4. **Tez vs. Hive**: Hive with Tez as the execution engine performs significantly better than Hive on MapReduce, offering lower latency and better resource utilization for SQL-like queries.

## Conclusion

Adding Tez to your project enhances the performance of your data processing tasks, making your Hadoop environment more efficient and flexible.
	
