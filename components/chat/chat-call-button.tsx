"use client"

import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation"

import {Phone, PhoneOff} from "lucide-react"
import ActionTooltip from "../action-tooltip"
import qs from "query-string";

interface ChatCallButtonProps {
    conversationId: string

}

export const ChatCallButton = (
    {conversationId}: ChatCallButtonProps
) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const isAudio = searchParams?.get("call")

    const Icon = isAudio ? PhoneOff : Phone
    const tooltipLabel = isAudio ? "Finalizar llamada" : "Empezar llamada"

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: `/call/${conversationId}`,
            query: {
                audio: isAudio ? undefined : true
            }
        }, {skipNull: true})
        router.push(url)
    }

    return (
        <ActionTooltip label={tooltipLabel}>
            <button className="hover:opacity-75 transition mr-4 bg-zinc-700 p-3 rounded"
                    onClick={onClick}>
                <Icon
                    className="h-5 w-5 text-gray-300"/>
            </button>
        </ActionTooltip>
    )
}