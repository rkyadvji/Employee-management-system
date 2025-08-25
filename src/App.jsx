import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './Utils/localStorage'
import { AuthContext } from './context/AuthProvider'

function App() {
  const [user, setUser] = useState();
  const [loggedInUserData, setloggedInUserData] = useState(null);

  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setloggedInUserData(userData.data);  // works for both admin and employee now
    }
  }, []);

  function handleLogin(email, password) {
    if (email === "admin@me.com" && password === "123") {
      const adminData = { firstName: "Admin", email: "admin@me.com" };
      setUser('admin');
      setloggedInUserData(adminData);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: adminData }));
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && password === e.password);
      if (employee) {
        setUser('employee');
        setloggedInUserData(employee);
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: employee }));
      } else {
        alert("Invalid Credentials");
      }
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && (
        <AdminDashboard changeUser={setUser} data={loggedInUserData} />
      )}

      {user === "employee" && (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      )}
    </>
  );
}

export default App;
