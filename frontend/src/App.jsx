import {Box} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {

  return (
    <>
      <Toaster></Toaster>
      <Box minH={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/create" element={<CreatePage/>}></Route>
        </Routes>
      </Box>
    </>
     
  )
}

export default App
