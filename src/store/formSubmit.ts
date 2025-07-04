import type {formSchema} from "../pages/Login.tsx";
import {signUp,login} from "../utils/SigninAndLogic.ts";

export  const formSubmit= async (data:formSchema,isSignup:boolean)=>{
    try{
        let user=null;
        if(isSignup){
            user=await signUp(data.email,data.password);
        }else{
            user=await  login(data.email,data.password);
        }
        return(user);
    }catch (e) {
        let message: string = 'Something went wrong!';

        if (e instanceof Error && e.message) {
            const msg = e.message.toLowerCase();

            // Sign up specific errors
            if (isSignup) {
                if (msg.includes('email-already-in-use')) {
                    message = 'This email is already registered. Try logging in instead.';
                } else if (msg.includes('invalid-email')) {
                    message = 'Please enter a valid email address.';
                } else if (msg.includes('weak-password')) {
                    message = 'Password should be at least 6 characters long.';
                }
            }

            // Login specific errors
            else {
                if (msg.includes('user-not-found')) {
                    message = 'No account found with this email. Please sign up first.';
                } else if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
                    message = 'Incorrect email or password.';
                } else if (msg.includes('user-disabled')) {
                    message = 'This account has been disabled. ';
                } else if (msg.includes('invalid-email')) {
                    message = 'Please enter a valid email address.';
                } else if (msg.includes('too-many-requests')) {
                    message = 'Too many failed attempts. ';
                }
            }

            // Common errors for both signup and login
            if (msg.includes('network')) {
                message = 'Network error. Please check your connection and try again.';
            } else if (msg.includes('internal-error')) {
                message = 'An internal error occurred. ';
            } else if (msg.includes('operation-not-allowed')) {
                message = 'This operation is not allowed. ';
            }
        }

       throw new Error(message);
    }
}