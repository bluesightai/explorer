import { Database } from "../supabase_types"
import { BoundingBoxResponse, SimilarBox } from "./supabaseTypes"
import { PostgrestResponse, createClient } from "@supabase/supabase-js"

const url = "https://biccczfztgnfaqzmizan.supabase.co"
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2NjemZ6dGduZmFxem1pemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyODY5ODcsImV4cCI6MjAzNTg2Mjk4N30.R9UmU-WIgcFfNIHqDmjl--kFDECNiYspE5IzTHG9Vf8"

const MAX_RETRIES = 5
const RETRY_DELAY = 50 // 1 second
const supabase = createClient<Database>(url, key)

async function retryOperation<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: any
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      console.warn(`Attempt ${attempt + 1} failed. Retrying in ${RETRY_DELAY}ms...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }
  throw lastError
}

export const useSupabase = () => {
  const fetchBoundingBoxes = async (lat: number, lon: number): Promise<BoundingBoxResponse[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<BoundingBoxResponse> = await supabase.rpc("find_polygon", {
        lat,
        lon,
      })
      if (error) {
        console.error("Error fetching covered boxes:", error)
        throw error
      }
      console.log("Data is", data)
      return data || []
    })
  }

  const fetchClipBoxes = async (
    embedding: number[],
    top_k: number,
    negativeids: number[],
  ): Promise<BoundingBoxResponse[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<BoundingBoxResponse> = await supabase.rpc("get_top_k_clip", {
        query_embedding: embedding,
        k: top_k,
      })

      if (error) {
        console.error("Error fetching search boxes:", error)
        throw error
      }

      console.log("Data is", data)
      return data || []
    })
  }

  const findSimilarTiles = async (ids: number[], top_k: number, negativeids: number[]): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<SimilarBox> = await supabase.rpc(
        "get_similar_boxes_with_negatives_for_california",
        {
          input_ids: ids,
          negativeids,
          top_k: top_k, // optional, defaults to 5 if not provided
        },
      )

      if (error) {
        console.error("Error finding similar tiles:", error)
        throw error
      }
      console.log("length of data is", data.length)
      return data
    })
  }

  const findSimilarIndex = async (
    ids: number[],
    top_k: number,
    index_id: number,
    negative_input_ids: number[],
  ): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      console.log("Ids are", ids)
      console.log("negative_input_ids", negative_input_ids)
      console.log("top k is", top_k)

      const { data, error } = await supabase.rpc("get_similar_tiles_with_negative_and_index", {
        input_ids: ids,
        top_k: top_k, // optional, defaults to 5 if not provided
        index_id,
        negativeids: negative_input_ids,
      })

      if (error) {
        console.error("Error finding similar tiles:", error)
        throw error
      }
      console.log("data os", data)

      console.log("length of data is", data.length)
      return data
    })
  }

  return { fetchBoundingBoxes, findSimilarTiles, findSimilarIndex, supabase, fetchClipBoxes }
}
