import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

function App() {
  const [user, setUser] = useState();
  const [loggedInUserData, setloggedInUserData] = useState(null);

  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser.role);
      setloggedInUserData(parsedUser.data);
    }
  }, []);

  function handleLogin(email, password) {
    if (!userData) {
      alert("System initializing, please try again");
      return;
    }

    const admin = userData.admin?.find((a) => email === a.email && password === a.password);
    if (admin) {
      setUser('admin');
      setloggedInUserData(admin);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: admin }));
      return;
    }

    const employee = userData.employees?.find((e) => email === e.email && password === e.password);
    if (employee) {
      setUser('employee');
      setloggedInUserData(employee);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: employee }));
      return;
    }

    alert("Invalid Credentials");
  }

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && (
        <AdminDashboard changeUser={setUser} data={loggedInUserData} />
      )}

      {user === "employee" && (
        <EmployeeDashboard changeUser={setUser} data={userData?.employees?.find((e) => e.email === loggedInUserData?.email) || loggedInUserData} />
      )}
    </>
  );
}

export default App;
