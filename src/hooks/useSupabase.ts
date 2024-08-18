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
        table_name: "clip_boxes",
        lat,
        lon,
      })
      if (error) {
        console.error("Error fetching covered boxes:", error)
        throw error
      }
      return data || []
    })
  }

  const fetchClipBoxes = async (embedding: number[], top_k: number, negativeids: number[]): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<SimilarBox> = await supabase.rpc("search_using_text", {
        table_name: "clip_boxes",
        query_embedding: embedding,
        k: top_k,
        negativeids,
      })

      if (error) {
        console.error("Error fetching search boxes:", error)
        throw error
      }
      return data || []
    })
  }

  const findSimilarClip = async (ids: number[], top_k: number, negative_input_ids: number[]): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      const { data, error } = await supabase.rpc("search_using_image", {
        table_name: "clip_boxes",
        input_ids: ids,
        top_k: top_k, // optional, defaults to 5 if not provided
        negativeids: negative_input_ids,
      })

      if (error) {
        console.error("Error finding similar tiles:", error)
        throw error
      }
      return data
    })
  }

  return { fetchBoundingBoxes, supabase, fetchClipBoxes, findSimilarClip }
}
