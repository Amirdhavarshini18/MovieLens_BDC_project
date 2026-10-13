from mrjob.job import MRJob

class RatingsDistribution(MRJob):

    def mapper(self, _, line):
        line = line.strip()
        if not line:
            return
        fields = line.split('\t')
        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            yield rating, 1

    def reducer(self, rating, counts):
        yield rating, sum(counts)

if __name__ == '__main__':
    RatingsDistribution.run()
