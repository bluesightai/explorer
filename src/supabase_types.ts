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
      files_metadata: {
        Row: {
          bytes: number
          created_at: string | null
          filename: string
          id: string
        }
        Insert: {
          bytes: number
          created_at?: string | null
          filename: string
          id: string
        }
        Update: {
          bytes?: number
          created_at?: string | null
          filename?: string
          id?: string
        }
        Relationships: []
      }
      ip_data: {
        Row: {
          created_at: string
          data: Json | null
          ip: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          ip: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          ip?: string
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
          body: Json
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
          body: Json
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
          body?: Json
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
            referencedColumns: ["ip"]
          },
        ]
      }
      saved_searches: {
        Row: {
          id: number
          name: string
          result_ids: number[]
          search_area_id: number | null
          target_ids: number[]
        }
        Insert: {
          id?: number
          name: string
          result_ids: number[]
          search_area_id?: number | null
          target_ids: number[]
        }
        Update: {
          id?: number
          name?: string
          result_ids?: number[]
          search_area_id?: number | null
          target_ids?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "fk_search_area"
            columns: ["search_area_id"]
            isOneToOne: false
            referencedRelation: "search_areas"
            referencedColumns: ["id"]
          },
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
          fine_tuned_model: string | null
          finished_at: string | null
          hyperparameters: Json | null
          id: string
          status: string
          task: string
          training_file: string
          validation_file: string | null
        }
        Insert: {
          created_at: string
          error?: string | null
          fine_tuned_model?: string | null
          finished_at?: string | null
          hyperparameters?: Json | null
          id: string
          status: string
          task: string
          training_file: string
          validation_file?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          fine_tuned_model?: string | null
          finished_at?: string | null
          hyperparameters?: Json | null
          id?: string
          status?: string
          task?: string
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
          lat: number
          lon: number
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
