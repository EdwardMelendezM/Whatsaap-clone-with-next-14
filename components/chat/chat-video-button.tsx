"use client"

import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"

import { Video, VideoOff } from "lucide-react"
import ActionTooltip from "../action-tooltip"

export const ChatVideoButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isVideo = searchParams?.get("video")

  const Icon = isVideo ? VideoOff : Video
  const tooltipLabel = isVideo ? "Finalizar video" : "Empezar video"

  // const onClick = () => {
  //   const url = qs.stringifyUrl({
  //     url: pathname || "",
  //     query: {
  //       video: isVideo ? undefined : true
  //     }
  //   }, { skipNull: true })
  //   router.push(url)
  // }

  return (
    <ActionTooltip label={tooltipLabel}>
      <button className="hover:opacity-75 transition mr-4 bg-zinc-700 p-3 rounded">
        <Icon
          className="h-5 w-5 text-gray-300"/>
      </button>
    </ActionTooltip>
  )
}