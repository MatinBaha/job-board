import { useEffect, useState } from "react"

export function useIsDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === "undefined") return false
        return (
            document.documentElement.classList.contains("dark") ||
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        
        const update = () => {
            const hasDarkClass = document.documentElement.classList.contains("dark")
            setIsDarkMode(hasDarkClass || mediaQuery.matches)
        }

        update()

        const controller = new AbortController()
        mediaQuery.addEventListener('change', update, { signal: controller.signal })

        const observer = new MutationObserver(update)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        })

        return () => {
            controller.abort()
            observer.disconnect()
        }
    }, [])

    return isDarkMode
}
