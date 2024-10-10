'use client'

import { useToast } from '@/hooks/use-toast'
import { signUpSchema } from '@/schemas/signUpSchema'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { apiResponse } from '../../../../../types/apiResponse'


//shadcn imports
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

const verifyAccount = () => {

    const router = useRouter()
    const param = useParams<{username: string}>()
    const {toast} = useToast();

    //zod implementation
    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues:{
            code: ''
        }
    })


    const onSubmit = async(data: z.infer<typeof verifySchema>) =>{
        try{
            const response  = await axios.post(`/api/verify-code`,{
                username: param.username,
                code: data.code
            })

            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace('sign-in')
        }
        catch(error)
        {
            console.error('Error in verification',error)
            const axiosError = error as AxiosError<apiResponse>;
            let errorMessage =axiosError.response?.data.message
            toast({
                title:'Verification failed',
                description: errorMessage,
                variant: 'destructive'
            })
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8  space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Verify your account</h1>
            <p className='mb-4'>Enter the verification code sent to your email</p>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            name="code"
            control={form.control}
          
            render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

        </div>
        </div>
      
    </div>
  )
}

export default verifyAccount 
