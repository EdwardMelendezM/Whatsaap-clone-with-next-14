'use client'

import {MessageType} from "@/dtype"
import {cn} from "@/lib/utils"
import {useSession} from "@clerk/nextjs"
import {useEffect, useState} from "react"
import {format} from "date-fns"

import {
    Angry,
    ArrowLeftSquare,
    CheckCheckIcon,
    CopyIcon,
    Heart,
    Laugh,
    PencilIcon,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/ui/menubar";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import axios from "axios";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    message: z.string().min(1)
})


interface ChatInputBoxProps {
    data: MessageType
    isLast?: boolean
}

const ChatItemBox = ({
                         data,
                         isLast
                     }: ChatInputBoxProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const session = useSession()

    const isOwn = session?.session?.user?.phoneNumbers[0].phoneNumber === data.sender?.phone

    const seenList = (data.seen || [])
        .filter((user) => user.phone !== data?.sender?.phone)
        .map(user => user.name)
        .join(', ')

    const container = cn("flex gap-3 px-4 py-1", isOwn && 'justify-end')
    const body = cn("flex gap-2 bg-zinc-700 rounded-lg pr-14 relative h-fit  max-w-[400px]",
        isOwn && "items-end bg-emerald-900",
        isEditing && "bg-zinc-700",)

    const message = cn("text-sm w-fit h-fit text-gray-300",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );


    const copyText = (text: string | undefined | null) => {
        if (!text) return
        navigator.clipboard.writeText(text)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: data.body ?? ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await axios.put(`/api/socket/message/${data.id}`, {
                ...values,
                conversationId: data.conversationId,
            })
            data.body = values.message
            setIsEditing(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEditing(false)
            }
        }
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);


    return (
        <div className={container}>
            <div className={body}>
                <div>
                    {
                        isOwn && !isEditing && (
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger className="bg-transparent  m-0 p-0 border-0">
                                        <div className={message}>
                                            {data.body}
                                            {
                                                isLast && isOwn && seenList.length > 0 && (
                                                    <div className="text-xs font-light text-gray-400">
                                                        {`Visto by ${seenList}`}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </MenubarTrigger>
                                    <MenubarContent className="bg-zinc-800/90 border border-zinc-700 shadow-xl">
                                        <div className="flex justify-around">
                                            <MenubarItem>
                                                <ThumbsUp
                                                    className=" w-10 h-10 text-gray-400  rounded-xl p-2  cursor-pointer"/>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <ThumbsDown
                                                    className=" w-10 h-10 text-gray-400  rounded-xl p-2 cursor-pointer"/>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Heart
                                                    className=" w-10 h-10 text-gray-400  rounded-xl p-2  cursor-pointer"/>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Laugh
                                                    className=" w-10 h-10 text-gray-400  rounded-xl p-2  cursor-pointer"/>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Angry
                                                    className=" w-10 h-10 text-gray-400  rounded-xl p-2  cursor-pointer"/>
                                            </MenubarItem>
                                        </div>
                                        <MenubarSeparator/>
                                        <MenubarItem className="p-4">
                                            <ArrowLeftSquare className="w-5 h-5 text-gray-300"/>
                                            <p className="text-zinc-300 text-start ml-2">
                                                Responder
                                            </p>
                                        </MenubarItem>
                                        <MenubarItem className="p-4" onClick={() => copyText(data.body)}>
                                            <CopyIcon className="w-5 h-5 text-gray-300"/>
                                            <p className="text-zinc-300 text-start ml-2">
                                                Copiar
                                            </p>
                                        </MenubarItem>
                                        <MenubarItem className="p-4"
                                                     onClick={() => setIsEditing(true)}>
                                            <PencilIcon className="w-5 h-5 text-gray-300"/>
                                            <p className="text-zinc-300 text-start ml-2">
                                                Editar
                                            </p>
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        )
                    }
                    {
                        !isOwn && !isEditing && (
                            <div className={message}>
                                {data.body}
                                {
                                    isLast && isOwn && seenList.length > 0 && (
                                        <div className="text-xs font-light text-gray-400">
                                            {`Visto by ${seenList}`}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        isOwn && isEditing && (
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name={'message'}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <input
                                                        {...field}
                                                        disabled={isLoading}
                                                        className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200 bg-zinc-700 placeholder:text-gray-300 py-2 px-3 text-sm rounded"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}/>
                                </form>
                            </Form>

                        )
                    }
                    <div className="absolute text-xs text-gray-400 bottom-1 right-2 flex gap-x-1">
                        {format(new Date(data.createdAt), 'HH:mm')}
                        {
                            isOwn && !isEditing && (
                                <CheckCheckIcon
                                    className={cn(
                                        "w-3 h-3",
                                        isLast && isOwn && seenList.length > 0 ? "text-blue-500" : "text-gray-400"
                                    )}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItemBox;