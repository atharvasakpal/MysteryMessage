import { Message } from "@/model/User"

export interface apiResponse{
    success: boolean,
    message: string,
    isAcceptingResponses?: boolean,
    messages?: Array<Message>
}