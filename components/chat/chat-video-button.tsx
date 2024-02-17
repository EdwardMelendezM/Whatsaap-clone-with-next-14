"use client"

import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation"

import qs from "query-string"

import {Video, VideoOff} from "lucide-react"
import ActionTooltip from "../action-tooltip"

interface ChatVideoButtonProps {
    conversationId: string

}

export const ChatVideoButton = (
    {conversationId}: ChatVideoButtonProps
) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const isVideo = searchParams?.get("video")

    const Icon = isVideo ? VideoOff : Video
    const tooltipLabel = isVideo ? "Finalizar video" : "Empezar video"

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: `/call/${conversationId}`,
            query: {
                video: isVideo ? undefined : true
            }
        }, {skipNull: true})
        router.push(url)
    }

    return (
        <ActionTooltip label={tooltipLabel}>
            <button className="hover:opacity-75 transition mr-4 bg-zinc-700 p-3 rounded" onClick={onClick}>
                <Icon
                    className="h-5 w-5 text-gray-300"/>
            </button>
        </ActionTooltip>
    )
}