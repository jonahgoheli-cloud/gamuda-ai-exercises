import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import UserManagement from './components/UserManagement'
import NewsAggregator from './components/NewsAggregator'
import WeatherApp from './components/WeatherApp'

function App() {
  return (
    <div>
      <h1>API Integration & Data Fetching Exercise</h1>
      {/* <UserManagement /> */}
      {/* <NewsAggregator /> */}
      < WeatherApp />
    </div>
  )
}

export default App