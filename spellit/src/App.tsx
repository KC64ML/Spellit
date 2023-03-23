import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "./components/Home";
import Game from "./components/Game";
import Matching from "./components/Matching";
import User from './components/User'
import Ready from "@/components/Game/Ready"
import Defence from '@/components/Game/Defense/Defense';
import Attack from "@/components/Game/Attack/Attack";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import OAuth from "./components/Auth/OAuth";
import Chatting from "./components/Chatting";
import TextInputBox from "./components/TextInputBox";

import WebsocektProvider from './store/session'
function App() {
  
  return (
    <div>
      <WebsocektProvider>
        <Chatting/>
        <TextInputBox/>
      </WebsocektProvider>
    <BrowserRouter>
		{/* <Home/> */}
      <Routes>
        {/* <Route index element={<Login />} /> */}
        <Route path="game" element={<Game />} />
        <Route path="matching" element={<Matching />} />
        <Route path="user" element={<User />} />
        <Route path="ready" element={<Ready />} />
				<Route path="defense" element={<Defence/>}/>
        <Route path="attack" element={<Attack/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="oath" element={<OAuth/>}/>
        <Route path="join" element={<Signup/>}/>
        <Route path="test" element={<Chatting/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
