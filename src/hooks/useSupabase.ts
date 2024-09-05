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
  const saveQueryResult = async (query: string): Promise<void> => {
    return retryOperation(async () => {
      const { error } = await supabase.from("queries").insert({ query: query })

      if (error) {
        console.error("Error saving query result:", error)
        throw error
      }
    })
  }

  const fetchBoundingBoxes = async (
    table_name: string,
    masks_table_name: string,
    lat: number,
    lon: number,
  ): Promise<BoundingBoxResponse[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<BoundingBoxResponse> = await supabase.rpc("get_all_matching_masks", {
        table_name: table_name,
        masks_table_name,
        lat,
        lon,
      })
      console.log("Data is data", data)
      if (error) {
        console.error("Error fetching covered boxes:", error)
        throw error
      }
      return data || []
    })
  }

  const fetchClipBoxes = async (
    table_name: string,
    embedding: number[],
    top_k: number,
    negativeids: number[],
  ): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      const { data, error }: PostgrestResponse<SimilarBox> = await supabase.rpc("search_using_text", {
        table_name: table_name,
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

  const findSimilarClip = async (
    table_name: string,
    ids: number[],
    top_k: number,
    negative_input_ids: number[],
  ): Promise<SimilarBox[]> => {
    return retryOperation(async () => {
      const { data, error } = await supabase.rpc("search_using_image", {
        table_name: table_name,
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

  const getBoundingBox = async (
    table_name: string,
  ): Promise<{ min_lon: number; min_lat: number; max_lon: number; max_lat: number } | null> => {
    return retryOperation(async () => {
      const { data, error } = await supabase.rpc("get_bounding_box", { table_name: table_name }).single()

      if (error) {
        console.error("Error fetching bounding box:", error)
        throw error
      }

      return data
    })
  }

  const loadImageFromSupabase = async (tableName: string, boundingBox: BoundingBoxResponse): Promise<string> => {
    try {
      const { data, error } = await supabase.storage.from(tableName).createSignedUrl(`${boundingBox.id}.png`, 60) // 60 seconds expiration

      if (error) {
        throw error
      }

      if (!data || !data.signedUrl) {
        throw new Error("No signed URL returned")
      }

      return data.signedUrl
    } catch (error) {
      console.error("Error loading image from Supabase:", error)
      throw error
    }
  }

  return {
    saveQueryResult,
    fetchBoundingBoxes,
    supabase,
    fetchClipBoxes,
    findSimilarClip,
    getBoundingBox,
    loadImageFromSupabase,
  }
}
