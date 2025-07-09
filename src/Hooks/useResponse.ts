import { useQuery} from "@tanstack/react-query";
import {responseFetcher} from "../utils/responseFetcher.ts";


 const useResponse=(text:string)=>{
    return useQuery({
        queryKey:[text],
        queryFn:()=>responseFetcher(text),
        staleTime:3*60*1000,
        gcTime:3*60*1000,
        enabled: text.length>10,
    });
}
export default useResponse;