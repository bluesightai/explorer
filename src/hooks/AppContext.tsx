import { BoundingBoxResponse, SimilarBox } from "./supabaseTypes"
import React, { Dispatch, createContext, useContext, useReducer } from "react"

// Define the possible modes with their associated data
export type Mode = { type: "text"; query: string } | { type: "image"; targetBoundingBoxes: BoundingBoxResponse[] }

export interface AppState {
  mode: Mode
  areaId: number
  sliderValue: number
  isLoading: boolean
  isRestoringSearch: boolean
  negativeIDs: number[]
  resultBoundingBoxes: SimilarBox[]
  visibleBoundingBoxes: number[] | null
}

// Define all possible action types
export type AppAction =
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_TARGET_BOXES"; payload: BoundingBoxResponse[] }
  | { type: "SET_RESULT_BOXES"; payload: SimilarBox[] }
  | { type: "SET_AREA_ID"; payload: number }
  | { type: "SET_SLIDER_VALUE"; payload: number }
  | { type: "SET_NEGATIVE_IDS"; payload: number[] }
  | { type: "FINISH_RESTORE_SEARCH" }
  | {
      type: "RESTORE_SEARCH"
      payload: {
        negativeIDs: number[]
        targetBoundingBoxes: BoundingBoxResponse[]
        resultBoundingBoxes: SimilarBox[]
        areaId: number
        sliderValue: number
      }
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_VISIBLE_BOXES"; payload: number[] | null }

// Initial state
const initialState: AppState = {
  negativeIDs: [],
  resultBoundingBoxes: [],
  areaId: 5,
  sliderValue: 9,
  isLoading: false,
  isRestoringSearch: false,
  mode: {
    type: "text",
    query: "",
  },
  visibleBoundingBoxes: [],
}

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        mode: { type: "text", query: action.payload },
      }
    case "FINISH_RESTORE_SEARCH":
      return {
        ...state,
        isRestoringSearch: false,
      }
    case "RESTORE_SEARCH":
      return {
        ...state,
        ...action.payload,
        isRestoringSearch: true,
      }
    case "SET_NEGATIVE_IDS":
      return { ...state, negativeIDs: action.payload }
    case "SET_TARGET_BOXES":
      return {
        ...state,
        mode: { type: "image", targetBoundingBoxes: action.payload },
      }
    case "SET_RESULT_BOXES":
      return { ...state, resultBoundingBoxes: action.payload }
    case "SET_AREA_ID":
      return { ...state, areaId: action.payload }
    case "SET_SLIDER_VALUE":
      return { ...state, sliderValue: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_VISIBLE_BOXES":
      return { ...state, visibleBoundingBoxes: action.payload }
    default:
      return state
  }
}

// Create the context with a default value
export interface AppContextType {
  state: AppState
  dispatch: Dispatch<AppAction>
}

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null, // This is a no-op function as a placeholder
})

// Provider component
interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Custom hook to use the AppContext
export const useAppState = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}
