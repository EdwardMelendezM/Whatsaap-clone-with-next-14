'use  client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useConversations from "@/hook/use-conversations";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';

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
      //Consulta
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <button
                  type="button"
                  className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                >
                  <Plus className="text-[#313338]" />
                </button>
                <Input
                  disabled={isLoading}
                  className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  placeholder='Escribe un mensaje'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
   );
}
 
export default ChatInput;