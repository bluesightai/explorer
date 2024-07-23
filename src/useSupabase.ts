import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import { BBox } from "geojson";
import { Database } from "./supabase_types";

const url = "https://biccczfztgnfaqzmizan.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2NjemZ6dGduZmFxem1pemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyODY5ODcsImV4cCI6MjAzNTg2Mjk4N30.R9UmU-WIgcFfNIHqDmjl--kFDECNiYspE5IzTHG9Vf8";

const supabase = createClient<Database>(url, key);

export interface BoundingBoxResponse {
  id: number;
  min_lat: number;
  min_lon: number;
  max_lat: number;
  max_lon: number;
  references_to_other_boxes: number[];
}

interface SimilarBox extends BoundingBoxResponse {
  similarity: number;
}

export const useSupabase = () => {
  const fetchBoundingBoxes = async (
    bounds: BBox
  ): Promise<BoundingBoxResponse[]> => {
    console.log("Fetching coverage for", bounds);
    const { data, error }: PostgrestResponse<BoundingBoxResponse> =
      await supabase.rpc("find_multiple_polygons", {
        input_min_lat: bounds[1],
        input_min_lon: bounds[0],
        input_max_lat: bounds[3],
        input_max_lon: bounds[2],
      });
    if (error) {
      console.error("Error fetching covered boxes:", error);
      return [];
    }
    console.log("Data is", data);
    return data || [];
  };

  //   const findSimilarTiles = async (bounds: BBox): Promise<SimilarBox[]> => {
  //     console.log("Fetching similar for", bounds);
  //     const { data, error }: PostgrestResponse<SimilarBox> = await supabase.rpc(
  //       "find_similar_search_boxes",
  //       {
  //         north: bounds[3],
  //         south: bounds[1],
  //         east: bounds[2],
  //         west: bounds[0],
  //         top_k: 5, // optional, defaults to 5 if not provided
  //       }
  //     );
  //     if (error) {
  //       console.error("Error finding similar tiles:", error);
  //       return [];
  //     }
  //     return data || [];
  //   };

  return { fetchBoundingBoxes };
};
