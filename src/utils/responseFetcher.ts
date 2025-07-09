import {axiosApi, type Movie} from "../api/apiFunctions.ts";
import {GoogleGenAI} from "@google/genai";

export const responseFetcher=async (text: string)=>{
    const apiKey:string= (import.meta.env.VITE_GEMINI_API_KEY);
    const ai=new GoogleGenAI({apiKey:apiKey.split('').reverse().join('')});
    const gresponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",       // or “gemini-2.5-pro” or “gemini-2.5-flash-lite”
        contents: `${text} recommend 3-6 movies and give only list separated by comma(,) with no extra text`,

    });
    return gresponse.text?.trim() as string;

}
export const searchMovieByTitles=async(movie:string[])=>{
    const results= movie.map(m=>axiosApi.get(`search/movie?query=${m}&include_adult=false`));
    const resultants= await Promise.all(results);
    return resultants.map(re=>re.data.results) as Array<Array<Movie>>;
}