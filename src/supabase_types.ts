export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clip_boxes: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_bay: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_houston: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_la: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_masks: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
          parent_tile_id: number | null
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
          parent_tile_id?: number | null
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
          parent_tile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clip_boxes_gcp_masks_parent_tile_id_fkey"
            columns: ["parent_tile_id"]
            isOneToOne: false
            referencedRelation: "clip_boxes_gcp"
            referencedColumns: ["id"]
          },
        ]
      }
      clip_boxes_gcp_ny: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_sf: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_gcp_sf_masks: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
          parent_tile_id: number | null
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
          parent_tile_id?: number | null
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
          parent_tile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clip_boxes_gcp_sf_masks_parent_tile_id_fkey"
            columns: ["parent_tile_id"]
            isOneToOne: false
            referencedRelation: "clip_boxes_gcp_sf"
            referencedColumns: ["id"]
          },
        ]
      }
      clip_boxes_old: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      clip_boxes_sf: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      defense_boxes: {
        Row: {
          chip_id: number | null
          embedding: string | null
          id: number
          location: unknown
        }
        Insert: {
          chip_id?: number | null
          embedding?: string | null
          id?: number
          location: unknown
        }
        Update: {
          chip_id?: number | null
          embedding?: string | null
          id?: number
          location?: unknown
        }
        Relationships: []
      }
      files_metadata: {
        Row: {
          bytes: number | null
          created_at: string | null
          filename: string | null
          id: string
        }
        Insert: {
          bytes?: number | null
          created_at?: string | null
          filename?: string | null
          id?: string
        }
        Update: {
          bytes?: number | null
          created_at?: string | null
          filename?: string | null
          id?: string
        }
        Relationships: []
      }
      ip_data: {
        Row: {
          created_at: string
          data: Json | null
          id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      models_metadata: {
        Row: {
          bytes: number | null
          created_at: string | null
          id: string
          task: Database["public"]["Enums"]["task_type"]
        }
        Insert: {
          bytes?: number | null
          created_at?: string | null
          id?: string
          task: Database["public"]["Enums"]["task_type"]
        }
        Update: {
          bytes?: number | null
          created_at?: string | null
          id?: string
          task?: Database["public"]["Enums"]["task_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          body: Json | null
          created_at: string
          headers: Json | null
          id: string
          ip: string | null
          method: string | null
          process_time: number | null
          query_params: Json | null
          response: Json | null
          response_status_code: number | null
          url: string | null
        }
        Insert: {
          body?: Json | null
          created_at?: string
          headers?: Json | null
          id?: string
          ip?: string | null
          method?: string | null
          process_time?: number | null
          query_params?: Json | null
          response?: Json | null
          response_status_code?: number | null
          url?: string | null
        }
        Update: {
          body?: Json | null
          created_at?: string
          headers?: Json | null
          id?: string
          ip?: string | null
          method?: string | null
          process_time?: number | null
          query_params?: Json | null
          response?: Json | null
          response_status_code?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_ip_fkey"
            columns: ["ip"]
            isOneToOne: false
            referencedRelation: "ip_data"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          id: number
          name: string | null
          negative_ids: number[] | null
          result_ids: number[] | null
          search_area_id: number | null
          target_ids: number[]
          top_k: number
        }
        Insert: {
          id?: number
          name?: string | null
          negative_ids?: number[] | null
          result_ids?: number[] | null
          search_area_id?: number | null
          target_ids: number[]
          top_k: number
        }
        Update: {
          id?: number
          name?: string | null
          negative_ids?: number[] | null
          result_ids?: number[] | null
          search_area_id?: number | null
          target_ids?: number[]
          top_k?: number
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_search_area_id_fkey"
            columns: ["search_area_id"]
            isOneToOne: false
            referencedRelation: "search_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      search_areas: {
        Row: {
          geometry: unknown | null
          id: number
          name: Database["public"]["Enums"]["region_enum"] | null
        }
        Insert: {
          geometry?: unknown | null
          id?: number
          name?: Database["public"]["Enums"]["region_enum"] | null
        }
        Update: {
          geometry?: unknown | null
          id?: number
          name?: Database["public"]["Enums"]["region_enum"] | null
        }
        Relationships: []
      }
      search_boxes: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
          search_area_id: number | null
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
          search_area_id?: number | null
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
          search_area_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_search_area"
            columns: ["search_area_id"]
            isOneToOne: false
            referencedRelation: "search_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      training_jobs: {
        Row: {
          created_at: string
          error: string | null
          finished_at: string | null
          hyperparameters: Json | null
          id: string
          status: string
          task: string
          trained_model: string | null
          training_file: string
          validation_file: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          finished_at?: string | null
          hyperparameters?: Json | null
          id?: string
          status?: string
          task: string
          trained_model?: string | null
          training_file: string
          validation_file?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          finished_at?: string | null
          hyperparameters?: Json | null
          id?: string
          status?: string
          task?: string
          trained_model?: string | null
          training_file?: string
          validation_file?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_polygon: {
        Args: {
          table_name: string
          lon: number
          lat: number
        }
        Returns: {
          id: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      find_similar_in_index: {
        Args: {
          input_ids: number[]
          top_k: number
          index_id: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      find_similar_tiles: {
        Args: {
          input_ids: number[]
          top_k?: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      generate_uid: {
        Args: {
          prefix: string
          size?: number
        }
        Returns: string
      }
      get_bounding_box: {
        Args: {
          table_name?: string
        }
        Returns: {
          min_lon: number
          min_lat: number
          max_lon: number
          max_lat: number
        }[]
      }
      get_bounding_box_coverage_for_clip: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_lon: number
          min_lat: number
          max_lon: number
          max_lat: number
        }[]
      }
      get_complete_saved_search_data: {
        Args: {
          p_saved_search_id: number
        }
        Returns: {
          search_area_id: number
          top_k: number
          negative_ids: number[]
          box_id: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
          is_target: boolean
        }[]
      }
      get_intersecting_search_boxes: {
        Args: {
          area_id: number
        }
        Returns: {
          box_id: number
        }[]
      }
      get_search_area_geojson: {
        Args: {
          area_id: number
        }
        Returns: Json
      }
      get_similar_boxes_with_negatives_for_california: {
        Args: {
          input_ids: number[]
          top_k: number
          negativeids: number[]
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      get_similar_tiles_with_negative_and_index: {
        Args: {
          input_ids: number[]
          top_k: number
          index_id: number
          negativeids: number[]
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      search_similar_boxes: {
        Args: {
          input_ids: number[]
          negativeids: number[]
          top_k: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      search_using_image: {
        Args: {
          table_name: string
          input_ids: number[]
          negativeids: number[]
          top_k: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      search_using_text: {
        Args: {
          table_name: string
          query_embedding: number[]
          negativeids: number[]
          k: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
        }[]
      }
      search_within_using_text:
        | {
            Args: {
              query_embedding: string
              k: number
              table_name: string
              search_within?: number[]
            }
            Returns: {
              id: number
              similarity: number
              min_lat: number
              min_lon: number
              max_lat: number
              max_lon: number
            }[]
          }
        | {
            Args: {
              table_name: string
              query_text: string
              k: number
              search_within?: number[]
            }
            Returns: {
              id: number
              similarity: number
              min_lat: number
              min_lon: number
              max_lat: number
              max_lon: number
            }[]
          }
      update_search_boxes_area: {
        Args: {
          box_ids: number[]
          area_id: number
        }
        Returns: number
      }
    }
    Enums: {
      region_enum: "San Francisco" | "Los Angeles" | "San Diego" | "Central"
      task_type: "classification" | "segmentation"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
