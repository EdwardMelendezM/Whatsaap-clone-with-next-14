"use client"

import {useEffect, useState} from "react"
import {User} from "@prisma/client";
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import "@livekit/components-styles"

import {Loader2} from "lucide-react";

interface MediaRoomProps {
    conversationId: string;
    currentUser: User;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({
                              conversationId,
                              audio,
                              video,
                              currentUser
                          }: MediaRoomProps) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const name = currentUser.name;
        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${conversationId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [conversationId, currentUser.name]);

    if (token === '') {
        return (
            <div className='h-full flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4'/>
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Loading...
                </p>

            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-token='default'
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
            token={token}
            connect={true}
            audio={audio}
            video={video}
        >
            <VideoConference/>
        </LiveKitRoom>
    )
}