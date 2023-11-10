'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useConversations from "@/hook/use-conversations";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Mic } from 'lucide-react';
import { Input } from '../ui/input';
import EmojiPicker from '../emoji-picker';
import { Button } from '../ui/button';
import PaperclipIcon from '../paper-clip';

const formSchema = z.object({
  message: z.string().min(1)
})

const ChatInput = () => {
  const { conversationId } = useConversations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.reset();
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
                  <div className="relative p-4 pb-6">
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="absolute top-7 left-16 h-[24px] w-[24px] hover:bg-transparent"
                    >
                      <PaperclipIcon />
                    </Button>
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="absolute top-7 left-8 h-[24px] w-[24px] hover:bg-transparent"
                    >
                      <EmojiPicker />
                    </Button>
                    <Input
                      disabled={isLoading}
                      placeholder='Escribe un mensaje'
                      className="pl-24 pr-12 py-6  bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200 "
                      {...field}
                    />
                    <div className="absolute top-7 right-8">
                      <Mic className="w-5 h-5 text-gray-300 hover:text-gray-400 transition cursor-pointer" />
                    </div>
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