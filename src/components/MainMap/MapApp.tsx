import { useCallback, useEffect, useState } from "react"
import { updateConfigs } from "../../config"
import MapComponent from "./MapComponent"
import Joyride, { CallBackProps, Step } from "react-joyride"
import Cookies from 'js-cookie'
import { useAppState } from "../../hooks/AppContext"

const TOUR_COOKIE_NAME = 'hasSeenTour'

const initialSteps: Step[] = [
    {
        target: '.logo',
        content: 'This is the logo of our application.',
        disableBeacon: true,
    },
    {
        target: '.search-input',
        content: 'Use this search box to find locations.',
    },
    {
        target: '.scene-card',
        content: 'This is scene card with resulst',
    },

]

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { state, dispatch } = useAppState()
    const isSceneCardVisible = state.resultBoundingBoxes.length > 0

    const handleJoyrideCallback = useCallback((data: CallBackProps) => {
        const { status, action } = data
        if (status === 'finished' || status === 'skipped') {
            dispatch({ type: "SET_RUN_TOUR", payload: false })
            // Only set the cookie if the tour wasn't manually triggered
            if (action !== "reset") {
                Cookies.set(TOUR_COOKIE_NAME, 'true', { expires: 365 }) // Cookie expires in 1 year
            }
        }
    }, [])

    useEffect(() => {
        async function loadConfig() {
            await updateConfigs()
            setIsLoaded(true)

            // Set initial steps
            dispatch({ type: "SET_STEPS", payload: initialSteps })

            // Check if the user has seen the tour before
            const hasSeenTour = Cookies.get(TOUR_COOKIE_NAME)

            if (!hasSeenTour) {
                console.log("Scheduling setRunTour")
                setTimeout(() => {
                    console.log("Calling setRunTour")
                    dispatch({ type: "SET_RUN_TOUR", payload: true })
                }, 500)
            }
        }
        loadConfig()
    }, [dispatch])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Joyride
                steps={state.steps}
                run={state.runTour}
                continuous={true}
                showSkipButton={true}
                showProgress={true}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
            />
            <MapComponent />
        </>
    )
}