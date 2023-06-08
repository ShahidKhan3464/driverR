import { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setIsAuthenticated(true)
    }
    else {
      setIsAuthenticated(false)
    }

  }, [])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return isAuthenticated
}

export default Index