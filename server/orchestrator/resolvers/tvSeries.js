const tvSeriesAxios = require("axios").default.create({
  baseURL: `http://localhost:3002`,
});
const Redis = require("ioredis");
const redis = new Redis();

const tvSeriesQueryResolver = {
  tvSeries: async () => {
    try {
      const tvSeries = await redis.get("tvSeries");
      const parsedtvSeries = JSON.parse(tvSeries);
      if (!parsedtvSeries || !parsedtvSeries.length) {
        const { data } = await tvSeriesAxios.get("/tvSeries");
        await redis.set("tvSeries", JSON.stringify(data));
        return data;
      } else {
        return parsedtvSeries;
      }
    } catch (err) {
      return err;
    }
  },
  findOneTvSeries: async (_, { tvSeriesId }) => {
    try {
      const tvSeries = await redis.get("tvSeries");
      const parsedtvSeries = JSON.parse(tvSeries);
      if (!parsedtvSeries || !parsedtvSeries.length) {
        const { data } = await tvSeriesAxios.get(`/tvSeries/${tvSeriesId}`);
        return data;
      } else {
        const selectTvSeries = parsedtvSeries.filter(
          (tvSeries) => tvSeries._id === tvSeriesId
        );
        return selectTvSeries[0]
      }
    } catch (err) {
      return err;
    }
  },
};

const tvSeriesMutationResolver = {
  addTvSeries: async (_, args, context, info) => {
    try {
      const newTvSeriesData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      const { data } = await tvSeriesAxios.post("/tvSeries", newTvSeriesData);
      await redis.del("tvSeries");
      return data;
    } catch (err) {
      return err;
    }
  },
  updateTvSeries: async (_, args) => {
    try {
      const tvSeriesId = args.tvSeriesId;
      const tvSeriesUpdateData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      const { data } = await tvSeriesAxios.put(
        `/tvSeries/${tvSeriesId}`,
        tvSeriesUpdateData
      );
      const responseData = {
        status: data.result.ok,
        count: data.result.n,
      };
      await redis.del("tvSeries");
      return responseData;
    } catch (err) {
      return err;
    }
  },
  deleteTvSeries: async (_, args) => {
    try {
      const tvSeriesId = args.tvSeriesId;
      const { data } = await tvSeriesAxios.delete(`/tvSeries/${tvSeriesId}`);
      const responseData = {
        status: data.result.ok,
        count: data.result.n,
      };
      await redis.del("tvSeries");
      return responseData;
    } catch (err) {
      return err;
    }
  },
};

module.exports = {
  tvSeriesQueryResolver,
  tvSeriesMutationResolver,
};
