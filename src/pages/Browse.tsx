import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import MoviesContainer from "../components/MoviesContainer.tsx";

const Browse=()=>{

    return(
        <div className={`text-xl netflixFontVariable font-black relative `}>
            <Header/>
            <Hero/>
            <MoviesContainer/>
        </div>
    );
}
export default Browse;