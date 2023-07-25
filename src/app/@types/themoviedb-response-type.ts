import { movieObject } from "./movie-object-type";

export type themoviedbResponse = {
    page: number;
    results: movieObject[];
    total_pages: number;
    total_results: number;
  };