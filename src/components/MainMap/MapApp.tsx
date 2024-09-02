import { useCallback, useEffect, useState, useMemo } from "react"
import { updateConfigs } from "../../config"
import MapComponent from "./MapComponent"
import Joyride, { CallBackProps, Step } from "react-joyride"
import Cookies from 'js-cookie'
import { useAppState } from "../../hooks/AppContext"

const TOUR_COOKIE_NAME = 'hasSeenTour'

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { state, dispatch } = useAppState()
    const isSceneCardVisible = state.resultBoundingBoxes.length > 0

    const steps: Step[] = useMemo(() => {
        const baseSteps: Step[] = [
            {
                target: '.logo',
                content: 'This is the logo of our application.',
                disableBeacon: true,
            },
            {
                target: '.search-input',
                content: 'Use this search box to find locations.',
            },
        ]

        if (isSceneCardVisible) {
            baseSteps.push({
                target: '.scene-card',
                content: 'This is scene card with results',
            })
        }

        return baseSteps
    }, [isSceneCardVisible])

    const handleJoyrideCallback = useCallback((data: CallBackProps) => {
        const { status, action, index } = data
        if (status === 'finished' || status === 'skipped') {
            dispatch({ type: "SET_RUN_TOUR", payload: false })
            // Only set the cookie if the tour wasn't manually triggered
            if (action !== "reset") {
                Cookies.set(TOUR_COOKIE_NAME, 'true', { expires: 365 }) // Cookie expires in 1 year
            }
        } else if (status === 'running' && isSceneCardVisible && index === steps.length - 1) {
            // If the scene card becomes visible during the tour, update the steps
            dispatch({ type: "SET_STEPS", payload: steps })
        }
    }, [dispatch, isSceneCardVisible, steps])

    useEffect(() => {
        async function loadConfig() {
            await updateConfigs()
            setIsLoaded(true)

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

    useEffect(() => {
        dispatch({ type: "SET_STEPS", payload: steps })
    }, [steps, dispatch])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Joyride
                steps={steps}
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