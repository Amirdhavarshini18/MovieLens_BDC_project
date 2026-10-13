
from mrjob.job import MRJob
from mrjob.step import MRStep


class TopRatedMovies(MRJob):

    def configure_args(self):
        super().configure_args()

        self.add_passthru_arg(
            '--min-ratings',
            type=int,
            default=50,
            help='Minimum number of ratings required'
        )

        self.add_file_arg(
            '--movies',
            default='u.item',
            help='Path to movie metadata file'
        )

    def steps(self):
        return [
            MRStep(
                mapper=self.mapper_get_ratings,
                reducer=self.reducer_calculate_average
            ),
            MRStep(
                reducer=self.reducer_sort_movies
            )
        ]

    def mapper_get_ratings(self, _, line):
        fields = line.strip().split('\t')

        if len(fields) == 4:
            user_id, movie_id, rating, timestamp = fields
            yield movie_id, float(rating)

    def reducer_calculate_average(self, movie_id, ratings):
        total_rating = 0.0
        count = 0

        for rating in ratings:
            total_rating += rating
            count += 1

        if count >= self.options.min_ratings:
            average_rating = total_rating / count
            yield None, (average_rating, count, movie_id)

    def reducer_sort_movies(self, _, movie_data):
        sorted_movies = sorted(
            movie_data,
            key=lambda x: (x[0], x[1]),
            reverse=True
        )

        movie_titles = {}

        with open(self.options.movies, encoding='latin-1') as file:
            for line in file:
                fields = line.strip().split('|')

                if len(fields) >= 2:
                    movie_titles[fields[0]] = fields[1]

        for average_rating, count, movie_id in sorted_movies:
            title = movie_titles.get(movie_id, 'Unknown title')

            yield None, {
                'movie_id': movie_id,
                'title': title,
                'average_rating': round(average_rating, 3),
                'rating_count': count
            }


if __name__ == '__main__':
    TopRatedMovies.run()
