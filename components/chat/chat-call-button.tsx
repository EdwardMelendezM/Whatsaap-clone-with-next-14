"use client"

import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"

import { Phone, PhoneOff } from "lucide-react"
import ActionTooltip from "../action-tooltip"

export const ChatCallButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isVideo = searchParams?.get("call")

  const Icon = isVideo ? PhoneOff : Phone
  const tooltipLabel = isVideo ? "Finalizar llamada" : "Empezar llamada"

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