import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Collect from "./pages/Collect";
import Reward from "./pages/Reward";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser ,getAllUser} from "./redux/actions/userAction";
import { allReport } from "./redux/actions/report";

export default function App() {
  useEffect(()=>{
    Store.dispatch(loadUser());
    Store.dispatch(getAllUser());
    Store.dispatch(allReport())
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/collect" element={<Collect/>} />
        <Route path="/rewards" element={<Reward/>}/>
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<Signup/>} />
      </Routes>
      <Toaster />
    </>
  )
}