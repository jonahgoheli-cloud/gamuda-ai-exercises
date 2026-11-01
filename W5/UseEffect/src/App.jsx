import { useState, useEffect } from "react";
import LifecycleDemo from "./components/LifecycleDemo";
import TimerCleanup from "./components/TimerCleanup";
import EventListener from "./components/EventListener";
import ApiRequest from "./components/ApiRequest";
import Image from "./assets/the-uncanny-shocked-freddy-meme.webp";
import RealTimeClock from "./components/RealTimeClock";
import WindowTracker from "./components/WindowTracker";
import UserProfile from "./components/UserProfile";
import ChatSimulator from "./components/ChatSimulator";
import SystemDashboard from "./components/SystemDashboard";

function App() {
  // 1. Add state to hold the selected user ID
  const [userId, setUserId] = useState(1);

  const [showChat, setShowChat] = useState(true);

  const handleToggle = () => {
    setShowChat((prev) => !prev);
  };

  const [showDashboard, setShowDashboard] = useState(true);

  const handleDashboardToggle = () => {
    setShowDashboard((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "ui-rounded" }}>
      <h1>My App</h1>
      <img src={Image} alt="feddy" width={500} />
      <LifecycleDemo userId={10} />
      <TimerCleanup />
      <EventListener />
      <ApiRequest />
      <RealTimeClock />
      <WindowTracker />

      {/* 2. Add buttons to change userId state dynamically */}
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <button onClick={() => setUserId(1)}>User 1</button>
        <button onClick={() => setUserId(2)} style={{ marginLeft: "10px" }}>
          User 2
        </button>
        <button onClick={() => setUserId(99)} style={{ marginLeft: "10px" }}>
          User 99 (Error)
        </button>
      </div>

      {/* 3. Pass the userId state to UserProfile */}
      <UserProfile userId={userId} />

      <h2>Exercise 1: Live Chat Simulator</h2>
      <div style={{ padding: "20px" }}>
        <button onClick={handleToggle}>
          {showChat ? "Stop Chat (Unmount)" : "Start Chat (Mount)"}
        </button>

        <hr />

        {showChat && <ChatSimulator />}

        <h2>Exercise 2: System Monitor Dashboard</h2>
        <div style={{ padding: "20px" }}>
          <button onClick={handleDashboardToggle}>
            {showDashboard
              ? "Stop Dashboard (Unmount)"
              : "Start Dashboard (Mount)"}
          </button>

          <hr />

          {showDashboard && <SystemDashboard />}
        </div>
      </div>
    </div>
  );
}

export default App;
