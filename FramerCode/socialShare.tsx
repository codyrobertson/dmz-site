import { useEffect, useState } from "react"
import { Override } from "framer"

export function useSocialShareOverride(props): Override {
    const [deferredPrompt, setDeferredPrompt] = useState(null)

    useEffect(() => {
        console.log("SocialShare override mounted")

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        return () => {
            console.log("SocialShare override unmounted")
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        }
    }, [])

    const handleShare = () => {
        console.log("handleShare triggered")

        const url = props.customUrl || window.location.href
        console.log("Share URL:", url)

        if (navigator.share) {
            console.log("Web Share API is supported")

            navigator
                .share({
                    title: document.title,
                    url: url,
                })
                .then(() => console.log("Successfully shared"))
                .catch((error) => console.error("Error sharing", error))
        } else {
            console.warn("Web Share API is not supported in this browser.")
            alert("Web Share API is not supported in this browser. Please use the browser's share button.")
        }
    }

    const handleAddToHomeScreen = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt')
                } else {
                    console.log('User dismissed the A2HS prompt')
                }
                setDeferredPrompt(null)
            })
        } else {
            alert("Add to Home Screen is not supported in this browser. Please use the browser's menu to add to home screen.")
        }
    }

    return {
        onClick: handleShare,
        onAddToHomeScreen: handleAddToHomeScreen,
    }
}