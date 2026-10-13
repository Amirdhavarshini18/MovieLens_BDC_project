from mrjob.job import MRJob
import time

class RatingTrends(MRJob):

    def mapper(self, _, line):
        line = line.strip()
        if not line:
            return
        fields = line.split('\t')
        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            year = time.strftime('%Y', time.gmtime(int(timestamp)))
            yield year, float(rating)

    def reducer(self, year, ratings):
        total = 0.0
        count = 0
        for rating in ratings:
            total += rating
            count += 1
        avg_rating = round(total / count, 3)
        # Yield year and a structured summary with both count and average rating
        yield year, {"count": count, "average_rating": avg_rating}

if __name__ == '__main__':
    RatingTrends.run()
