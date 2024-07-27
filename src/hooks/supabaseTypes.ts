export interface BoundingBoxResponse {
  id: number
  min_lat: number
  min_lon: number
  max_lat: number
  max_lon: number
}

export interface SimilarBox extends BoundingBoxResponse {
  similarity: number
}
