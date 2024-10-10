'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

import axios, { AxiosError } from 'axios'
import { apiResponse } from '../../../../types/apiResponse'

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
import { Loader2 } from 'lucide-react'
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'


const page = () => {

    const { toast } = useToast()
    
    

    const router = useRouter();


    type SignInFormData = z.infer<typeof signInSchema>

    //zod implementation
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues:{
            identifier: '',
            password: ''
        }
    })

    

    const onSubmit = async(data:SignInFormData)=>{
        const result  = await signIn('credentials ',{
          redirect: false, 
          identifier: data.identifier,
          password: data.password
        })
        if(result?.error)
        { 
          toast({
            title:'Login Failed',
            description: 'Incorrect Username or password',
            variant : 'destructive'
          })
        }
        if(result?.url)
        {
          router.replace('/dashboard')
        }
    }


  return (
    
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        
      <div className='w-full max-w-md p-8  space-y-8 bg-white rounded-lg shadow-md'>
    
        <div className='text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'> Msytery Message</h1>
            <p className='mb-4'>Log in your account</p>
        </div>
        <Form {...form}>
        
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username/Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Username/Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />


                <Button type='submit' >
                    Sign-in
                </Button>
            </form>
            
        </Form>
        <div className='text-center mt-4'>
            <p>
                New to Mystery Message ? {' '}
                <Link href='/sign-up' className='text-blue-600 hover:text-blue-800'>Sign Up</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default page
