'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useConversations from "@/hook/use-conversations";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {Mic, Paperclip} from 'lucide-react';
import { Input } from '../ui/input';
import EmojiPicker from '../emoji-picker';
import { Button } from '../ui/button';
import axios from "axios";
import {useRouter} from "next/navigation";
import {useSocket} from "@/components/providers/socket-provider";
import {useEffect} from "react";
import {TYPE_CHAT_EVENT} from "@/dtype";



const formSchema = z.object({
  message: z.string().min(1)
})

const ChatInput = () => {
  const { conversationId } = useConversations();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  })



  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      await axios.post("/api/socket/new-message", {
        ...values,
        conversationId: conversationId
      })
      form.reset();
      // onSendMessage(values.message)
      router.refresh();
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex bg-zinc-800 border-t-2 border-zinc-900 items-center px-2 py-1">
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="hover:bg-zinc-700 h-full"
                    >
                      <EmojiPicker />
                    </Button>
                    <Button
                        variant={"ghost"}
                        type="button"
                        className="hover:bg-zinc-700 h-full"
                    >
                      <Paperclip className="w-5 h-5 text-zinc-300 transparent" />
                    </Button>
                    <Input
                      disabled={isLoading}
                      placeholder='Escribe un mensaje'
                      className="bg-transparent border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200 placeholder:text-gray-300"
                      {...field}
                    />
                    <Button
                        variant={"ghost"}
                        type="button"
                        className="hover:bg-zinc-700 h-full"
                    >
                      <Mic className="hover:bg-zinc-700 text-zinc-300 transparent w-5 h-5" />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
   );
}
 
export default ChatInput;