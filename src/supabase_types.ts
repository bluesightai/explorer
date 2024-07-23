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
      search_boxes: {
        Row: {
          embedding: string | null
          id: number
          location: unknown
          references_to_other_boxes: number[] | null
        }
        Insert: {
          embedding?: string | null
          id?: number
          location: unknown
          references_to_other_boxes?: number[] | null
        }
        Update: {
          embedding?: string | null
          id?: number
          location?: unknown
          references_to_other_boxes?: number[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_multiple_polygons: {
        Args: {
          input_min_lat: number
          input_min_lon: number
          input_max_lat: number
          input_max_lon: number
        }
        Returns: {
          id: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
          references_to_other_boxes: number[]
        }[]
      }
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
          references_to_other_boxes: number[]
        }[]
      }
      find_similar_search_boxes: {
        Args: {
          input_id: number
          top_k: number
        }
        Returns: {
          id: number
          similarity: number
          min_lat: number
          min_lon: number
          max_lat: number
          max_lon: number
          references_to_other_boxes: number[]
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
