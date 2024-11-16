import { createContext, useState } from "react";
import run from "../config/Nexus";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input,setInput]= useState("");
    const[recentPrompt,setRecentPrompt] = useState("Initial Prompt");
    const[prevPrompts ,setPrevPrompts] = useState([]);
    const[showResult, setShowresult] = useState(false);
    const[loading,setLoading]= useState(false);
    const[resultData, setResultData] =useState("");

    const delayPara = (index, nextword) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextword);
        }, 75 * index);
    };

    const newChat = () => {
        
        setLoading(false)
        setShowresult(false)
    }

    const onSent = async (prompt) => {

        setRecentPrompt(prompt);

        setResultData("");
        setLoading(true);
        setShowresult(true);
    
       let response;
        if (prompt !== undefined) {
            response = await run(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            response = await run(input);
        }
    
        // Process the response as before
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
    
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextword = newResponseArray[i];
            delayPara(i, nextword + " ");
        }
    
        setLoading(false);
        setInput(""); // Reset input after sending
    };
    

    const contextValue ={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;