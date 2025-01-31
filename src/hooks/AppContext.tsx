import { Config, cali_config } from "../config"
import { BoundingBoxResponse, SimilarBox } from "./supabaseTypes"
import React, { Dispatch, createContext, useContext, useReducer } from "react"

// Define the possible modes with their associated data
export type Mode =
  | { type: "text"; query: string; searched_for: string }
  | { type: "image"; targetBoundingBoxes: BoundingBoxResponse[] }

type HelpTour = "first" | "second" | "off"

export interface AppState {
  largeObjects: boolean
  config: Config
  mode: Mode
  areaId: number
  sliderValue: number
  isLoading: boolean
  isRestoringSearch: boolean
  negativeBoxes: BoundingBoxResponse[]
  resultBoundingBoxes: SimilarBox[]
  visibleBoundingBoxes: number[] | null
  helpTour: HelpTour
}

// Define all possible action types
export type AppAction =
  | { type: "SET_CONFIG"; payload: Config }
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_TARGET_BOXES"; payload: BoundingBoxResponse[] }
  | { type: "SET_RESULT_BOXES"; payload: SimilarBox[] }
  | { type: "SET_AREA_ID"; payload: number }
  | { type: "SET_SLIDER_VALUE"; payload: number }
  | { type: "SET_NEGATIVE_BOXES"; payload: BoundingBoxResponse[] }
  | { type: "FINISH_RESTORE_SEARCH" }
  | {
      type: "RESTORE_SEARCH"
      payload: {
        negativeBoxess: BoundingBoxResponse[]
        targetBoundingBoxes: BoundingBoxResponse[]
        resultBoundingBoxes: SimilarBox[]
        areaId: number
        sliderValue: number
      }
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_VISIBLE_BOXES"; payload: number[] | null }
  | { type: "SET_HELP_TOUR"; payload: HelpTour }
  | { type: "SET_LARGE_OBJECTS"; payload: boolean }

// Initial state
const initialState: AppState = {
  largeObjects: false,
  config: cali_config,
  negativeBoxes: [],
  resultBoundingBoxes: [],
  areaId: 5,
  sliderValue: 45,
  isLoading: false,
  isRestoringSearch: false,
  mode: {
    type: "text",
    query: "",
    searched_for: "",
  },
  visibleBoundingBoxes: [],
  helpTour: "off",
}

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        config: action.payload,
      }
    case "SET_TEXT":
      return {
        ...state,
        mode: {
          type: "text",
          query: action.payload,
          searched_for: state.mode.type == "text" ? state.mode.searched_for : "",
        },
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
    case "SET_NEGATIVE_BOXES":
      return { ...state, negativeBoxes: action.payload }
    case "SET_TARGET_BOXES":
      return {
        ...state,
        mode: { type: "image", targetBoundingBoxes: action.payload },
      }
    case "SET_RESULT_BOXES":
      return {
        ...state,
        resultBoundingBoxes: action.payload,
        mode: state.mode.type == "text" ? { ...state.mode, searched_for: state.mode.query } : state.mode,
      }
    case "SET_AREA_ID":
      return { ...state, areaId: action.payload }
    case "SET_SLIDER_VALUE":
      return { ...state, sliderValue: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_VISIBLE_BOXES":
      return { ...state, visibleBoundingBoxes: action.payload }
    case "SET_HELP_TOUR":
      return { ...state, helpTour: action.payload }
    case "SET_LARGE_OBJECTS":
      return { ...state, largeObjects: action.payload }
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
