import {useCallback, useRef} from "react" 

export default function useDebounce(startCallback, stopCallback, delay) {
    const timer = useRef()

    const debouncedCallback = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current)
            startCallback()
        }
        timer.current = setTimeout(() => {
            stopCallback()
        }, delay)
    }, [stopCallback, delay])

    return debouncedCallback
}