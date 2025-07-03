

const Login = () => {
    return (
        <div
            className={`bg-[url(/Assets/Images/login-background.jpg)] bg-cover bg-center w-full min-h-screen relative`}>
            <nav className={`bg-gradient-to-b from-black h-30 overflow-hidden px-5 lg:px-16`}>
                <img src="/Assets/Images/netflix-logo-text-full.svg"
                     className={`h-full lg:scale-130 -translate-y-[15px]`} alt=""/>
            </nav>
            <form
                className={`absolute min-h-[50vh] w-full  max-w-xs sm:max-w-sm md:w-3/4 md:max-w-md lg:w-[25%] lg:max-w-lg  bg-black/80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl py-4 px-6 flex flex-col gap-8 items-center justify-center`}
                action="">
                <h1 className={`text-3xl text-center netflixFont font-black tracking-wider text-white mb-4`}>Sign Up</h1>
                <input type="text" placeholder={`Enter username`}
                       className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                <input type="text" placeholder={`Enter Password`}
                       className={`w-full text-xl bg-white/10 text-white placeholder:text-white/60 netflixFontVariable placeholder:text-sm px-4 py-2 rounded-sm font-light outline-none focus:ring-1 ring-white/60`}/>
                <div className={`bottom-wrapper w-full`}>
                    <button className={`text-sm mx-auto netflixFontVariable font-medium relative  text-white w-full bg-[#db0000] text-center py-2 rounded-md`}> <span className={`absolute -top-[12px] left-1/2 bg-white/60 h-[0.5px] w-[96%] -translate-y-1/2 -translate-x-1/2`}></span> Login</button>
                    <p className={`text-white netflixFontVariable text-sm mt-3`}>New to netflix? Sign Up</p>

                </div>

            </form>
        </div>
    );
}
export default Login;