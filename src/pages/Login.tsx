import {useState} from "react";
import { motion,AnimatePresence } from "motion/react";
import { type SubmitHandler, useForm} from "react-hook-form";
import {login, signUp} from "../utils/SigninAndLogic.ts";
export type formSchema={
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
}
const Login = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const {register,handleSubmit,trigger,watch,setError,formState:{isSubmitting,errors,}}=useForm<formSchema>({
        defaultValues:{
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
        },
        mode:'onChange'
    })
    const onSubmit:SubmitHandler<formSchema>= async (data:formSchema)=>{
        try{
            if(isSignUp){
                const user=await signUp(data.email,data.password)
                console.log(user);
            }else{
                const user=await  login(data.email,data.password)
                console.log(user);
            }
        }catch (e) {
            let message: string = 'Something went wrong!';

            if (e instanceof Error && e.message) {
                const msg = e.message.toLowerCase();

                // Sign up specific errors
                if (isSignUp) {
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

            setError('root', {
                type: 'manual',
                message: message,
            });
        }
    }

    return (
        <motion.div
            className={`bg-[url(/Assets/Images/login-background.jpg)] bg-cover bg-center w-full min-h-screen relative`}>
            <nav className={`bg-gradient-to-b from-black h-30 overflow-hidden px-5 lg:px-16`}>
                <motion.img initial={{translateY:-30}} animate={{translateY:0}} transition={{duration:0.4}} src="/Assets/Images/netflix-logo-text-full.svg"
                     className={`h-full lg:scale-130 -translate-y-[15px]`} alt=""/>
            </nav>
            <AnimatePresence >
            <motion.form onSubmit={handleSubmit(onSubmit)} layout key={isSignUp?'sign-up':'login'} initial={{translateY:20,opacity:0.1}} animate={{translateY:0,opacity:1}} transition={{duration: 0.3}}
                className={`absolute min-h-[50vh] w-full  max-w-xs sm:max-w-sm md:w-3/4 md:max-w-md lg:w-[25%] lg:max-w-lg  bg-black/80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl py-4 px-6 flex flex-col gap-3 items-center justify-center pb-10`}
                action="">

                <h1 className={`text-3xl text-center netflixFont font-black tracking-tight text-white mb-4`}>{errors.root?errors.root.message:isSignUp ? 'Sign Up' : "Login"}</h1>
                <AnimatePresence key={isSignUp?'signup-fields':'login-fields'}  >
                    <motion.div key={`header-signup-input`}  initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: "auto" }}
                                 exit={{ opacity: 0, height: 0 }}
                                 transition={{ duration: 0.25 }}
                        className={`flex flex-col gap-6 w-full`}>
                        {isSignUp && <div className={`w-full`}>
                            <input {...register('name',{required:'Enter your name',minLength:{value:3, message:"Minimum 3 characters required"}})} key={`input-name`} type="text" placeholder={`Enter Name`}
                                   className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                            <span className={`h-3`}><p className={`text-[12px] font-light netflixFontVariable text-red-500`}>{errors.name&&errors.name.message}</p></span>
                        </div>}

                    </motion.div>
                </AnimatePresence>
                <div className={`w-full`}><input {...register('email',{required:'Enter valid email',pattern:{
                        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:"Enter valid email"
                    }})} key={`input-email`} type="email" placeholder={`Enter email`}
                            className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                    <span className={`h-3`}><p className={`text-[12px] font-light netflixFontVariable text-red-500`}>{errors.email&&errors.email.message}</p></span>

                </div>
                <div className={`w-full`}>
                    <input {...register('password',{required:'Enter a password',validate:value => {
                            if (value.length < 6) {
                                return 'Password must be at least 6 characters long';
                            }
                            if (!/[a-z]/.test(value)) {
                                return 'Password must include at least one lowercase letter';
                            }
                            if (!/[A-Z]/.test(value)) {
                                return 'Password must include at least one uppercase letter';
                            }
                            if (!/\d/.test(value)) {
                                return 'Password must include at least one number';
                            }
                            return true;
                        }})} type="text" placeholder={`Enter Password`}
                           className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                    <span className={`h-3`}><p className={`text-[12px] font-light netflixFontVariable text-red-500`}>{errors.password&&errors.password.message}</p></span>
                </div>
                {isSignUp&&<div className={`w-full`}>
                    <input {...register('confirmPassword',{required:'Enter a confirm password',validate:value => {
                            if(watch('password')!==value) return 'Passwords don\'t match';

                            if (value.length < 6) {
                                return 'Password must be at least 6 characters long';
                            }
                            if (!/[a-z]/.test(value)) {
                                return 'Password must include at least one lowercase letter';
                            }
                            if (!/[A-Z]/.test(value)) {
                                return 'Password must include at least one uppercase letter';
                            }
                            if (!/\d/.test(value)) {
                                return 'Password must include at least one number';
                            }
                            return true;
                        }})} type="text" placeholder={`Confirm Password`}
                           className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                    <span className={`h-3`}><p className={`text-[12px] font-light netflixFontVariable text-red-500`}>{errors.confirmPassword&&errors.confirmPassword.message}</p></span>
                </div>}
                <div className={`bottom-wrapper w-full`}>
                    <button onClick={()=>{
                        setTimeout(()=>trigger(),0);
                    }}
                        className={`text-sm mx-auto netflixFontVariable font-medium relative  text-white w-full bg-[#db0000] text-center py-2 rounded-md`}>
                        <span
                            className={`absolute -top-[6px] left-1/2 bg-white/60 h-[0.5px] w-[96%] -translate-y-1/2 -translate-x-1/2`}></span> {isSubmitting?'Submitting':isSignUp ? 'Sign Up' : "Login"}
                    </button>
                    <p className={`text-white netflixFontVariable text-sm mt-3 `}>{isSignUp ? 'Already registered?' : 'New to Netflix?'}
                        <span onClick={() => setIsSignUp(prev => !prev)}
                              className={`text-[#db0000] hover:cursor-pointer`}>{isSignUp?'Sign Up':'Login'}</span>
                    </p>

                </div>
            </motion.form>
                </AnimatePresence>
        </motion.div>
    );
}
export default Login;