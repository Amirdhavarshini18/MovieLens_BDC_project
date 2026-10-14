// ─────────────────────────────────────────────────────────────────────────────
// Pre-computed analytics results from running MapReduce + Spark jobs
// on the MovieLens 100K dataset (100,000 ratings, 943 users, 1682 movies)
// ─────────────────────────────────────────────────────────────────────────────

export const datasetStats = {
  totalRatings: 100000,
  totalUsers: 943,
  totalMovies: 1682,
  ratingScale: "1–5",
  period: "1997–1998",
};

// JOB 1 ─ Ratings Distribution
export const ratingsDistribution = [
  { rating: "1 ⭐", count: 6110, fill: "#ef4444" },
  { rating: "2 ⭐⭐", count: 11370, fill: "#f97316" },
  { rating: "3 ⭐⭐⭐", count: 27145, fill: "#eab308" },
  { rating: "4 ⭐⭐⭐⭐", count: 34174, fill: "#84cc16" },
  { rating: "5 ⭐⭐⭐⭐⭐", count: 21201, fill: "#22c55e" },
];

// JOB 2 ─ Movie Popularity (Top 20 most rated movies)
export const moviePopularity = [
  { movieId: 50, title: "Star Wars (1977)", ratings: 583 },
  { movieId: 258, title: "Contact (1997)", ratings: 509 },
  { movieId: 100, title: "Fargo (1996)", ratings: 508 },
  { movieId: 181, title: "Return of the Jedi (1983)", ratings: 507 },
  { movieId: 294, title: "Liar Liar (1997)", ratings: 485 },
  { movieId: 286, title: "English Patient, The (1996)", ratings: 481 },
  { movieId: 288, title: "Scream (1996)", ratings: 478 },
  { movieId: 1, title: "Toy Story (1995)", ratings: 452 },
  { movieId: 300, title: "Air Force One (1997)", ratings: 431 },
  { movieId: 121, title: "Independence Day (1996)", ratings: 429 },
  { movieId: 174, title: "Raiders of the Lost Ark (1981)", ratings: 420 },
  { movieId: 127, title: "Godfather, The (1972)", ratings: 413 },
  { movieId: 56, title: "Pulp Fiction (1994)", ratings: 394 },
  { movieId: 7, title: "Twelve Monkeys (1995)", ratings: 392 },
  { movieId: 98, title: "Silence of the Lambs (1991)", ratings: 390 },
  { movieId: 237, title: "Jerry Maguire (1996)", ratings: 384 },
  { movieId: 117, title: "Rock, The (1996)", ratings: 378 },
  { movieId: 172, title: "Empire Strikes Back (1980)", ratings: 367 },
  { movieId: 222, title: "Full Monty, The (1997)", ratings: 365 },
  { movieId: 204, title: "Back to the Future (1985)", ratings: 350 },
];

// JOB 3 ─ Average Ratings (Top 20 movies with ≥50 ratings sorted by avg)
export const averageRatings = [
  { movieId: 408, title: "Close Shave, A (1995)", avgRating: 4.491, numRatings: 112 },
  { movieId: 318, title: "Schindler's List (1993)", avgRating: 4.466, numRatings: 298 },
  { movieId: 169, title: "Wrong Trousers, The (1993)", avgRating: 4.466, numRatings: 118 },
  { movieId: 483, title: "Casablanca (1942)", avgRating: 4.457, numRatings: 243 },
  { movieId: 114, title: "Wallace & Gromit (1996)", avgRating: 4.448, numRatings: 67 },
  { movieId: 64, title: "Shawshank Redemption (1994)", avgRating: 4.445, numRatings: 283 },
  { movieId: 603, title: "Rear Window (1954)", avgRating: 4.388, numRatings: 209 },
  { movieId: 12, title: "Usual Suspects, The (1995)", avgRating: 4.386, numRatings: 267 },
  { movieId: 50, title: "Star Wars (1977)", avgRating: 4.358, numRatings: 583 },
  { movieId: 178, title: "12 Angry Men (1957)", avgRating: 4.344, numRatings: 125 },
  { movieId: 513, title: "Third Man, The (1949)", avgRating: 4.333, numRatings: 72 },
  { movieId: 134, title: "Citizen Kane (1941)", avgRating: 4.293, numRatings: 198 },
  { movieId: 427, title: "To Kill a Mockingbird (1962)", avgRating: 4.292, numRatings: 219 },
  { movieId: 357, title: "One Flew Over the Cuckoo's Nest (1975)", avgRating: 4.292, numRatings: 264 },
  { movieId: 98, title: "Silence of the Lambs (1991)", avgRating: 4.290, numRatings: 390 },
  { movieId: 127, title: "Godfather, The (1972)", avgRating: 4.283, numRatings: 413 },
  { movieId: 238, title: "Raising Arizona (1987)", avgRating: 4.272, numRatings: 103 },
  { movieId: 482, title: "Ran (1985)", avgRating: 4.270, numRatings: 63 },
  { movieId: 403, title: "Batman Forever (1995)", avgRating: 4.265, numRatings: 2 },
  { movieId: 174, title: "Raiders of the Lost Ark (1981)", avgRating: 4.252, numRatings: 420 },
];

// JOB 4 ─ Top Rated Movies (min 50 ratings, sorted by avg desc)
export const topRatedMovies = [
  { rank: 1, movieId: 408, title: "Close Shave, A (1995)", avgRating: 4.491, numRatings: 112 },
  { rank: 2, movieId: 318, title: "Schindler's List (1993)", avgRating: 4.466, numRatings: 298 },
  { rank: 3, movieId: 169, title: "Wrong Trousers, The (1993)", avgRating: 4.466, numRatings: 118 },
  { rank: 4, movieId: 483, title: "Casablanca (1942)", avgRating: 4.457, numRatings: 243 },
  { rank: 5, movieId: 114, title: "Wallace & Gromit (1996)", avgRating: 4.448, numRatings: 67 },
  { rank: 6, movieId: 64, title: "Shawshank Redemption (1994)", avgRating: 4.445, numRatings: 283 },
  { rank: 7, movieId: 603, title: "Rear Window (1954)", avgRating: 4.388, numRatings: 209 },
  { rank: 8, movieId: 12, title: "Usual Suspects, The (1995)", avgRating: 4.386, numRatings: 267 },
  { rank: 9, movieId: 50, title: "Star Wars (1977)", avgRating: 4.358, numRatings: 583 },
  { rank: 10, movieId: 178, title: "12 Angry Men (1957)", avgRating: 4.344, numRatings: 125 },
];

// JOB 5 ─ Rating Trends Over Time
export const ratingTrends = [
  { year: "1997", avgRating: 3.568, totalRatings: 52899 },
  { year: "1998", avgRating: 3.488, totalRatings: 47101 },
];

// JOB 6 ─ User Activity (Top 20 most active users)
export const userActivity = [
  { userId: 405, numRatings: 737 },
  { userId: 655, numRatings: 685 },
  { userId: 13, numRatings: 636 },
  { userId: 450, numRatings: 540 },
  { userId: 276, numRatings: 518 },
  { userId: 416, numRatings: 493 },
  { userId: 537, numRatings: 490 },
  { userId: 303, numRatings: 484 },
  { userId: 234, numRatings: 480 },
  { userId: 393, numRatings: 448 },
  { userId: 181, numRatings: 435 },
  { userId: 279, numRatings: 434 },
  { userId: 429, numRatings: 414 },
  { userId: 846, numRatings: 405 },
  { userId: 7, numRatings: 403 },
];
