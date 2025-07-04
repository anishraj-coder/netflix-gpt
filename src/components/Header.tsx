import {motion} from 'motion/react';
import {useState} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase.ts";
import {useNavigate} from "react-router-dom";
import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";


const Header=()=>{
    const [isHover, setIsHover] = useState<boolean>(false);
    const {userName}=useAppStore(useShallow(state=>({userName:state.user?.displayName})));
    const navigate=useNavigate();
    const signOutHandler=async ()=>{
        try{
            await signOut(auth);
        }catch{
            navigate('/error');
        }
    }
    return (
        <div className={`h-20 bg-gradient-to-b  top-0 left-0 w-full px-10 py-4  from-black flex justify-between items-center `}>
            <motion.img initial={{translateY:-100,opacity:0}} animate={{opacity:1,translateY:0}} transition={{duration:0.6}} src="/Assets/Images/logo.png" className={`h-full scale-90`} alt=""/>
            <motion.div className={`login-wrapper flex items-center justify-center gap-5 relative`}>
                <img className={`object-contain object-center ring-2 ring-white/30 rounded-[2px]`} src="/Assets/Images/profile_img.png" alt=""/>
                <h1 onMouseOver={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} className={`font-[poppins] font-light text-md text-white relative cursor-pointer select-none`}>{userName?userName:"Someone"}
                    {isHover&& <motion.span initial={{height:"0px",translateY:-20,opacity:0}} animate={{height:"96px",translateY:0,opacity:1}} transition={{duration:0.5}}  className={`dropdown-arrow flex flex-col w-40 h-24 bg-zinc-600 rounded-sm absolute top-10 right-[-100px] -translate-x-1/2 px-3 py-4`}>
                        <h2 className={`font-[poppins] font-medium text-center mb-1`}>User</h2>
                        <span className={`w-full bg-white h-[0.5px] `}></span>
                        <button onClick={signOutHandler} className={`text-sm mt-2 text-center cursor-pointer `}>Sign Out</button>
                    </motion.span>}
                </h1>

            </motion.div>
        </div>
    );
}
export default Header;