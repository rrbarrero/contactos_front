import React from 'react';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../services/Auth';



const Dashboard = () => {

    let history = useHistory();

    const handleLogout = () => {
        logOut();
        history.push('/login');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Secret Page</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
};

export default Dashboard;
