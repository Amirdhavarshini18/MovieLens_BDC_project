from mrjob.job import MRJob

class MovieAverageRatings(MRJob):

    def mapper(self, _, line):
        line = line.strip()
        if not line:
            return
        fields = line.split('\t')
        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            yield movie_id, float(rating)

    def reducer(self, movie_id, ratings):
        total = 0.0
        count = 0
        for rating in ratings:
            total += rating
            count += 1
        yield movie_id, total / count

if __name__ == '__main__':
    MovieAverageRatings.run()
