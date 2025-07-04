import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useNavigate} from "react-router-dom";
import {auth} from '../utils/firebase.ts'
import {signOut} from 'firebase/auth'
const Browse=()=>{
    const {user,clearUser}=useAppStore(useShallow(state=>({user:state.user,clearUser:state.clearUser})))
    const navigate=useNavigate();
    const handleSignOut=async()=>{
        try {
            clearUser();          // Clears user state from your store
            await signOut(auth); // Firebase signs out the user :contentReference[oaicite:2]{index=2}
            navigate('/');        // Redirect to login screen
        } catch (error: unknown) {
            console.error("Sign out error:", (error as Error).message);
        }
    }

    return(
        <div className={`text-xl netflixFontVariable font-black `}>
            <h1 onClick={handleSignOut}>Hello {user?.email}</h1>
        </div>
    );
}
export default Browse;