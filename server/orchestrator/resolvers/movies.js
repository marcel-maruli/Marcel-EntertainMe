const moviesAxios = require("axios").default.create({
  baseURL: `http://localhost:3001`,
});
const Redis = require("ioredis");
const redis = new Redis();

const moviesQueryResolver = {
  movies: async () => {
    try {
      const movies = await redis.get("movies");
      const parsedMovies = JSON.parse(movies);
      if (!parsedMovies || !parsedMovies.length) {
        const { data } = await moviesAxios.get("/movies");
        await redis.set("movies", JSON.stringify(data));
        return data;
      } else {
        return parsedMovies
      }
    } catch (err) {
      return err;
    }
  },
  findOneMovie: async (_, { movieId }) => {
    try {
      const movies = await redis.get("movies");
      const parsedMovies = JSON.parse(movies);
      if (!parsedMovies || !parsedMovies.length) {
        const { data } = await moviesAxios.get(`/movies/${movieId}`);
        return data;
      } else {
        const selectMovie = parsedMovies.filter(
          (movie) => movie._id === movieId
        );
        return selectMovie[0]
      }
    } catch (err) {
      return err;
    }
  },
};

const moviesMutationResolver = {
  addMovie: async (_, args) => {
    try {
      const newMovieData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      const { data } = await moviesAxios.post("/movies", newMovieData);
      await redis.del("movies");
      return data;
    } catch (err) {
      return err;
    }
  },
  updateMovie: async (_, args) => {
    try {
      const movieId = args.movieId;
      const movieUpdateData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      const { data } = await moviesAxios.put(
        `/movies/${movieId}`,
        movieUpdateData
      );
      const responseData = {
        status: data.result.ok,
        count: data.result.n,
      };
      await redis.del("movies");
      return responseData;
    } catch (err) {
      return err;
    }
  },
  deleteMovie: async (_, args) => {
    try {
      const movieId = args.movieId;
      const { data } = await moviesAxios.delete(`/movies/${movieId}`);
      const responseData = {
        status: data.result.ok,
        count: data.result.n
      }
      await redis.del("movies");
      return responseData;
    } catch (err) {
      return err;
    }
  },
};

module.exports = {
  moviesQueryResolver,
  moviesMutationResolver,
};
