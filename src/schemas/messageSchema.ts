import {z} from 'zod'


export const messageSchema = z.object({
    content: z
        .string()
        .min(10,{message: "Message must have atleast 10 characters"})
        .max(300, {message: "Message should not exceed 300 characters"})
})