# Sqoop.md

## Overview

Apache Sqoop is a powerful tool designed for efficiently transferring bulk data between Apache Hadoop and structured datastores such as relational databases. Sqoop supports data import/export operations, allowing you to transfer data from external datastores into Hadoop Distributed File System (HDFS) or from HDFS to external datastores. This capability is crucial for data ingestion and extraction in big data workflows.

## Project Implementation

### Data Transfer with Sqoop

1. **Data Import**:
   We used Sqoop to import data from a MySQL database into HDFS. The import process involves generating Java classes based on the table schema, which enables further processing in the Hadoop ecosystem.

2. **Data Export**:
   Sqoop was also employed to export processed data from HDFS back into a MySQL database. This step is essential for making the processed data available for further analysis or application use in a structured datastore.

3. **Incremental Imports**:
   For handling large datasets with regular updates, Sqoop supports incremental imports, which can efficiently transfer only the newly added or modified rows, reducing the overall data transfer volume.

### Points to Remember

- **Project Status (Apache Attic)**: Apache Sqoop was officially retired in June 2021. For modern production pipelines, tools such as Apache NiFi, Spark JDBC, or Debezium/Kafka Connect are commonly used.
- **Connection Management & Drivers**: Ensure correct configuration of JDBC connection parameters. Modern MySQL Connector/J uses `com.mysql.cj.jdbc.Driver` instead of legacy `com.mysql.jdbc.Driver`.
- **Field Delimiters**: When exporting Hive tables, ensure `--input-fields-terminated-by` matches the Hive table definition (`\t` for tab-separated tables like `ratings`, `|` for pipe-separated tables like `movies`).
- **Data Types and Schema Mapping**: Sqoop automatically handles data type mapping between Hadoop and relational databases. However, it is essential to review and adjust the mappings if necessary to ensure data integrity.
- **Error Handling**: Monitor Sqoop jobs for errors and manage error logs to ensure reliable data transfer.
- **Performance Tuning**: Optimize Sqoop performance by tuning parameters like `-m 1` or `--num-mappers` to control parallelism during data transfer operations.
- **Table Preparation**: Ensure that the tables you will use for Sqoop import and export are defined prior to running the Sqoop commands.

### Important Commands

1. **Basic Data Import**:
   ```bash
   sqoop import --connect jdbc:mysql://localhost/dbname --username user --password pass --table tablename --target-dir /user/hdfs/tablename
   ```

2. **Data Import with Query**:
   ```bash
   sqoop import --connect jdbc:mysql://localhost/dbname --username user --password pass --query 'SELECT * FROM tablename WHERE $CONDITIONS' --split-by id --target-dir /user/hdfs/tablename
   ```

3. **Data Export**:
   ```bash
   sqoop export --connect jdbc:mysql://localhost/dbname --username user --password pass --table tablename --export-dir /user/hdfs/tablename
   ```

4. **Incremental Import**:
   ```bash
   sqoop import --connect jdbc:mysql://localhost/dbname --username user --password pass --table tablename --target-dir /user/hdfs/tablename --incremental append --check-column id --last-value 100
   ```

5. **List Databases**:
   ```bash
   sqoop list-databases --connect jdbc:mysql://localhost/ --username user --password pass
   ```

6. **List Tables**:
   ```bash
   sqoop list-tables --connect jdbc:mysql://localhost/dbname --username user --password pass
   ```

### Setup and Running Locally

1. **Install Sqoop**:
   Ensure Sqoop is installed on your local machine. You can download and install it from the Apache Sqoop website.

2. **Set Up Environment Variables**:
   Configure the necessary environment variables, such as `SQOOP_HOME` and `PATH`.

3. **Sample Command to Run Sqoop**:
   ```bash
   sqoop import --connect jdbc:mysql://localhost/dbname --username user --password pass --table tablename --target-dir /user/hdfs/tablename
   ```

By following these guidelines and utilizing the key points mentioned, one can effectively use Apache Sqoop for efficient data transfer between Hadoop and relational databases.