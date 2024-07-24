import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import { Database } from "../supabase_types";

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
}

interface SimilarBox extends BoundingBoxResponse {
  similarity: number;
}

export const useSupabase = () => {
  const fetchBoundingBoxes = async (
    lat: number,
    lon: number
  ): Promise<BoundingBoxResponse[]> => {
    const { data, error }: PostgrestResponse<BoundingBoxResponse> =
      await supabase.rpc("find_polygon", {
        lat,
        lon,
      });
    if (error) {
      console.error("Error fetching covered boxes:", error);
      return [];
    }
    console.log("Data is", data);
    return data || [];
  };

  const findSimilarTiles = async (
    ids: number[],
    top_k: number
  ): Promise<SimilarBox[]> => {
    console.log("Length of input ids is", ids);
    console.log("top k is", top_k);
    const { data, error }: PostgrestResponse<SimilarBox> = await supabase.rpc(
      "find_similar_tiles",
      {
        input_ids: ids,
        top_k: top_k, // optional, defaults to 5 if not provided
      }
    );
    if (error) {
      console.error("Error finding similar tiles:", error);
      return [];
    }
    console.log("length of data is", data.length);

    return data || [];
  };

  return { fetchBoundingBoxes, findSimilarTiles };
};
