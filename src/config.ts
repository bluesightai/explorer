import { useSupabase } from "./hooks/useSupabase"

export type Config = {
  style_id: string
  name: string
  table_name: string
  polygon: number[][]
  initial_lat: number
  initial_lon: number
  mask_table_name: string
  masks_bucket_name: string
  bucket_name: string
}

export const mapOptions = {
  disableDefaultUI: true,
  tilt: 0,
  mapTypeControl: false,
  streetViewControl: false,
}

export const GOOGLE_MAPS_API_KEY = "AIzaSyAuQYBLOs6UfgdRw7lliJ7ik1sVVWhbvM0"
export const GOOGLE_MAP_ID = "41d48ce57cfb9b71"

export const cali_config: Config = {
  name: "Bay Area",
  // style_id: "cm05fx10r00im01rb7h3haudx",
  mask_table_name: "clip_boxes_gcp_sf_masks",
  masks_bucket_name: "clip_boxes_gcp_sf_fixed_masks",

  style_id: "clip_boxes_gcp_sf",
  table_name: "clip_boxes_gcp_sf",
  bucket_name: "clip_boxes_gcp_sf_fixed",
  initial_lat: 37.760912,
  initial_lon: -122.438506,
  polygon: [
    [-122.331390380859, 37.809783953011],
    [-122.32177734375, 37.809783953011],
    [-122.32177734375, 37.8119538591927],
    [-122.331390380859, 37.8119538591927],
    [-122.331390380859, 37.809783953011],
  ],
}

export const la_config: Config = {
  masks_bucket_name: "",
  mask_table_name: "",
  name: "LA port",
  style_id: "clip_boxes_gcp_la",
  table_name: "clip_boxes_gcp_la",
  bucket_name: "",
  initial_lat: 0,
  initial_lon: 0,
  polygon: [],
}

const updateConfigCoordinates = async (config: Config) => {
  const supabase = useSupabase()
  const data = await supabase.getBoundingBox(config.table_name)
  if (data) {
    config.polygon = [
      [data.min_lon, data.min_lat],
      [data.max_lon, data.min_lat],
      [data.max_lon, data.max_lat],
      [data.min_lon, data.max_lat],
      [data.min_lon, data.min_lat],
    ]
    config.initial_lat = (data.min_lat + data.max_lat) / 2
    config.initial_lon = (data.min_lon + data.max_lon) / 2
  }
}

export const updateConfigs = async () => {
  await updateConfigCoordinates(cali_config)
}
