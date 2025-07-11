import {useState} from "react";
import { motion,AnimatePresence } from "motion/react";
import { type SubmitHandler, useForm} from "react-hook-form";
import {formSubmit} from "../store/formSubmit.ts";
import {useNavigate} from "react-router-dom";
export type formSchema={
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
}
const Login = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const navigate=useNavigate();
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
            const user= await formSubmit(data,isSignUp);
            if(user){
                navigate('/browse', { replace: true });
            }
        }catch (error){
            let message="Something went wrong";
            if(error instanceof Error){
                message=error.message;
            }
            setError('root',{
                type:'manual',
                message:message
            })
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
                className={`absolute min-h-[50vh] w-full  max-w-xs sm:max-w-sm md:w-2/4 md:max-w-md lg:w-[28%] lg:max-w-lg  bg-black/80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl py-4 px-6 flex flex-col gap-3 items-center justify-center pb-10`}
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
                        }})} type="password" placeholder={`Enter Password`}
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
                        }})} type="password" placeholder={`Confirm Password`}
                           className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                    <span className={`h-3`}><p className={`text-[12px] font-light netflixFontVariable text-red-500`}>{errors.confirmPassword&&errors.confirmPassword.message}</p></span>
                </div>}
                <div className={`bottom-wrapper w-full`}>
                    <button onClick={()=>{
                        setTimeout(()=>trigger(),0);
                    }}
                            disabled={isSubmitting}
                        className={`text-sm mx-auto netflixFontVariable font-medium relative  text-white w-full bg-[#db0000] text-center py-2 rounded-md`}>
                        <span
                            className={`absolute -top-[6px] left-1/2 bg-white/60 h-[0.5px] w-[96%] -translate-y-1/2 -translate-x-1/2 disabled:text-zinc-400`}></span> {isSubmitting?'Submitting':isSignUp ? 'Sign Up' : "Login"}
                    </button>
                    <p className={`text-white netflixFontVariable text-sm mt-3 `}>{isSignUp ? 'Already registered?' : 'New to Netflix?'}
                        <span onClick={() => setIsSignUp(prev => !prev)}
                              className={`text-[#db0000] hover:cursor-pointer`}>{!isSignUp?'Sign Up':'Login'}</span>
                    </p>

                </div>
            </motion.form>
                </AnimatePresence>
        </motion.div>
    );
}
export default Login;