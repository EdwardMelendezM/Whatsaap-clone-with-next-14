'use client'
import {useEffect, useState} from "react";

interface ChatScrollProps {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
}

export const useChatScroll = ({
                                  chatRef,
                                  bottomRef
                              }: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);
    const [distanceFromBottom, setDistanceFromBottom] = useState(0);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }
            if (!topDiv) {
                return false;
            }
            setDistanceFromBottom( topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight)
            return distanceFromBottom < 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 1000);
        }
    }, [bottomRef, chatRef, hasInitialized, distanceFromBottom]);

    const onAutoScroll = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return { onAutoScroll, distanceFromBottom }
};
