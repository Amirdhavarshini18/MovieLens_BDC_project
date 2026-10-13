from mrjob.job import MRJob
from mrjob.step import MRStep

class MoviePopularity(MRJob):

    def steps(self):
        return [
            MRStep(mapper=self.mapper_count_ratings,
                   reducer=self.reducer_sum_ratings),
            MRStep(reducer=self.reducer_sort_popularity)
        ]

    def mapper_count_ratings(self, _, line):
        line = line.strip()
        if not line:
            return
        fields = line.split('\t')
        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            yield movie_id, 1

    def reducer_sum_ratings(self, movie_id, counts):
        # Route to a single reducer (key None) for global sorting
        yield None, (sum(counts), movie_id)

    def reducer_sort_popularity(self, _, movie_counts):
        # Sort descending by count; tie-break numerically by movie_id
        sorted_movies = sorted(
            movie_counts,
            key=lambda x: (x[0], -int(x[1]) if x[1].isdigit() else 0),
            reverse=True
        )
        for count, movie_id in sorted_movies:
            yield movie_id, count

if __name__ == '__main__':
    MoviePopularity.run()
