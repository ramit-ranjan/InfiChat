//create hook
import { createContext, useState } from "react";
import runChat from "../config/infichat";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

     //typing effect of output
    const delayPara=(index,nextWord)=>{
      setTimeout(function(){
        setResultData(prev=>prev+nextWord);
      }, 75*index)
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
         response=await runChat(prompt);
         setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await runChat(input)
        }
        let responseArray=response.split("**");
        let newResponse="";  //Reset the prompt box
        for(let i=0;i<responseArray.length;i++){
            if(i==0 || i%2!==1){
                newResponse+=responseArray[i];
            }else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }

        //this is replace to *->next line i.e. br
        let newResponse2=newResponse.split("*").join("<br/>")
        let newResponeArray=newResponse2.split(" ");

        //typing effect of output
        for(let i=0;i<newResponeArray.length;i++){
            const nextWord=newResponeArray[i];
            delayPara(i,nextWord+" ")
        }


        setLoading(false)
        setInput("")

    }


    const contextValue = {
      prevPrompts,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      setInput,
      newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider