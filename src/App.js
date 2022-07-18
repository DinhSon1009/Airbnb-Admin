import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import UserList from "./pages/UserList/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.scss";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import LocationList from "./pages/LocationList/LocationList";
import Location from "./pages/Location/Location";
import NewLocation from "./pages/NewLocation/NewLocation";
import TicketList from "./pages/TicketList/TicketList";
import Ticket from "./pages/Ticket/Ticket";
import RoomList from "./pages/RoomList/RoomList";
import Room from "./pages/Room/Room";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar />
        <div className="appContainer">
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":userId" element={<User />} />
              </Route>
              <Route path="newUser" element={<NewUser />} />
              <Route path="locations">
                <Route index element={<LocationList />} />
                <Route path=":locationId" element={<Location />} />
              </Route>
              <Route path="newLocation" element={<NewLocation />} />
              <Route path="tickets">
                <Route index element={<TicketList />} />
                <Route path=":ticketId" element={<Ticket />} />
              </Route>
              <Route path="rooms">
                <Route index element={<RoomList />} />
                <Route path=":roomId" element={<Room />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <ToastContainer autoClose={2000} pauseOnHover={false} draggable />
      </BrowserRouter>
    </div>
  );
}

export default App;
