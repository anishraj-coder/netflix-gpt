import {AnimatePresence, motion} from 'motion/react';
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase.ts";
import {useNavigate, useLocation} from "react-router-dom";
import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useHoverIntent} from "react-use-hoverintent";
import {logo, profileImage} from "../utils/constant.ts";
import { FaSearch } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";


const Header=()=>{
    const [isHover,ref]=useHoverIntent<HTMLHeadingElement>({timeout:300,sensitivity:3,interval:10});
    const {userName}=useAppStore(useShallow(state=>({userName:state.user?.displayName})));
    const navigate=useNavigate();
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    const signOutHandler=async ()=>{
        try{
            await signOut(auth);
        }catch{
            navigate('/error');
        }
    }

    const handleSearch=()=>{
        if(isSearchPage) {
            navigate('/browse');
        } else {
            navigate('/search');
        }
    }

    return (
        <div className={`h-20 lg:h-28 bg-gradient-to-b absolute top-0 left-0 w-full px-10 py-2 z-20 from-black from-15% flex justify-between items-center `}>
            <motion.img initial={{translateY:-100,opacity:0}} animate={{opacity:1,translateY:0}} transition={{duration:0.6}} src={logo} className={`h-[40%] lg:h-[50%]`} alt=""/>
            <motion.button initial={{y:-100}} animate={{y:0}} transition={{duration:0.8, delay:0.1}} onClick={handleSearch}
                           whileTap={{scale:105}}
                           className={`text-white text-3xl h-fit `}>{isSearchPage?<MdArrowBackIos/>:<FaSearch/>}</motion.button>
            <motion.div className={`login-wrapper flex items-center justify-center gap-5 relative`}>
                <img className={`object-contain object-center ring-2 ring-white/30 rounded-[2px]`} src={profileImage} alt=""/>
                <h1 ref={ref} className={`font-[poppins] font-light text-md text-white relative cursor-pointer select-none`}>{userName?userName:"Someone"}
                    <AnimatePresence>
                        {isHover&& <motion.span  initial={{height:"0px",translateY:-20,opacity:0}} animate={{height:"85px",translateY:0,opacity:1}} exit={{height:'0px',opacity:0,translateY:-20}} transition={{duration:0.5}}  className={`dropdown-arrow flex flex-col items-center justify-center w-40 bg-zinc-600 rounded-sm absolute top-10 right-[-100px] -translate-x-1/2 px-3 py-4 overflow-hidden`}>
                            <h2 className={`font-[poppins] font-medium text-center text-sm mb-1`}>User:&nbsp;{userName||'Someone'}</h2>
                            <span className={`w-full bg-white h-[0.5px] `}></span>
                            <button onClick={signOutHandler} className={`text-sm mt-2 text-center cursor-pointer `}>Sign Out</button>
                        </motion.span>}
                    </AnimatePresence>
                </h1>

            </motion.div>
        </div>
    );
}
export default Header;