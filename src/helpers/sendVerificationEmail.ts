import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { apiResponse } from "../../types/apiResponse";
import { url } from "inspector";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<apiResponse>{
    try{

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject:'MysteryMessage | Verification Code',
            react: VerificationEmail({username, otp:verifyCode})
        });

        return{ success:true, message: "Verification mail sent successfully!"}
    }
    catch(emailError)
    {
        console.error("Error sending verification email", emailError)
        return{ success:false, message: "failed to send verification email"}
    }
}