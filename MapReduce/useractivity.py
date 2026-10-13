from mrjob.job import MRJob
from mrjob.step import MRStep

class UserActivity(MRJob):

    def steps(self):
        return [
            MRStep(mapper=self.mapper_count_activity,
                   reducer=self.reducer_sum_activity),
            MRStep(reducer=self.reducer_sort_activity)
        ]

    def mapper_count_activity(self, _, line):
        line = line.strip()
        if not line:
            return
        fields = line.split('\t')
        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            yield user_id, 1

    def reducer_sum_activity(self, user_id, counts):
        # Route to a single reducer (key None) for global sorting
        yield None, (sum(counts), user_id)

    def reducer_sort_activity(self, _, user_counts):
        # Sort descending by count; tie-break numerically by user_id
        sorted_users = sorted(
            user_counts,
            key=lambda x: (x[0], -int(x[1]) if x[1].isdigit() else 0),
            reverse=True
        )
        for count, user_id in sorted_users:
            yield user_id, count

if __name__ == '__main__':
    UserActivity.run()
