import {useEffect, useState} from "react";

interface ChatScrollProps {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
}

export const useChatScroll = ({
    chatRef,
    bottomRef
}:ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false)
    useEffect(() => {
        const bottomDiv = bottomRef?.current
        const topDiv = chatRef?.current

        const shouldAutoScroll = () => {
            if(!hasInitialized && bottomDiv) {
                setHasInitialized(true)
                return true
            }
            if (!topDiv) {
                return false
            }
            const distanceFromButton = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceFromButton < 100
        }

        if (shouldAutoScroll()) {
            setTimeout(()=> {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth"
                })
            }, 1000)
        }

    }, [bottomRef, chatRef]);
}