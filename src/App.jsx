import axios from 'axios'
import './App.css'
import { useState } from 'react';
import axion from "../public/axion.json";
import loadingAnimation from "../public/loading.json";
import Lottie from 'lottie-react';
import { VscSend } from "react-icons/vsc";
import { RiRobot2Line } from "react-icons/ri";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    setLoading(true);
    if (question === "What's your name?") {
      setAnswer("My name is AxionAI");
      setLoading(false);
    } else if(question === "Who are you?") {
      setAnswer("My name is AxionAI a Generative AI made by Khalid Bin Ibrahim");
      setLoading(false);
    } else if(question === "Who is Khalid Bin Ibrahim?") {
      setAnswer("Khalid Bin Ibrahim is the Founder and Owner of AxionAI. He made me (AxionAI). He is a passionate Front-end Developer from Bangladesh. He is currently 14 years old. He started his career on programming at the age of 10. He is also called Future Mark Zuckerberg or Future Bill Gates for his intelligence. He made some games and websites. He is also famous for make a program on ideogram as a contributor. He is experienced in HTML, CSS, Tailwind, Bootstrap, JavaScript, React, Node.js, Express.js, MongoDB and other frameworks and libraries. He is now exploring TypeScript and Next.js. He is 6th in Bangladesh Rapid Chess Championship 2023 and 17th in Young National Drawing Competition of Bangladesh 2023.");
      setLoading(false);
    } else if(question === "Who is Humyra Jannat?") {
      setAnswer("Humyra Jannat is Khalid Bin Ibrahim's friend. She is from Jamalpur. They know each other in online. They never met face to face. I don't have more information about Humyra Jannat but they are in the same class and they are the same age now.");
      setLoading(false);
    } else {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`,
        method: "POST",
        data: { "contents": [{ "parts": [{ "text": question }] }] }
      });
      setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
      setLoading(false);
    }
  }

  return (
    <>
      <div className='m-10 font-sourceSans3'>
        <div>
          <div className='w-32 mx-auto text-center pb-4'>
            <Lottie animationData={axion}></Lottie>
            <h1 className='font-semibold text-[#2f3e46] text-3xl mt-2'>Axion AI</h1>
          </div>

          <div className="flex items-center max-w-[520px] mx-auto md:rounded-full p-2 mb-10 bg-[#84a98c] text-[#354f52]">
            <RiRobot2Line className=" text-[#52796f] bg-[#cad2c5] p-2 rounded-full w-10 h-10" />
            <marquee direction="left">
              Welcome to AxionAI - Revolutionizing Text Generation! Effortless, Creative, and Smart. Start Creating Today!
            </marquee>
          </div>
        </div>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input value={question} onChange={e => setQuestion(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a prompt here" required />
            <button onClick={generateAnswer} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#84a98c] hover:bg-[#52796f] focus:ring-4 focus:outline-none focus:ring-[#84a98c] font-medium rounded-lg text-xl px-4 py-2 dark:bg-[#84a98c] dark:hover:bg-[#52796f] dark:focus:ring-[#354f52]"><VscSend /></button>
          </div>

          {
            loading === true &&
            <div className='w-96 mx-auto'>
              <Lottie animationData={loadingAnimation}></Lottie>
            </div>
          }

          <div className='py-8 text-base font-normal'>
            <p className='text-gray-700'>{answer}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
