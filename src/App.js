import Login from "./containers/login/Login";
import Overview from "./containers/overview/Overview";
import {useEffect, useState} from 'react';

const App = ({

}) => {
    const [login, setlogin] = useState(undefined);

    useEffect(() => {
        lastLogin();
      }, [login]);

    const lastLogin = () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        setlogin(username && password && username === "admin" && password === "admin");
    }

    return (
        <div>
            { login === undefined ? (null) : (!login ? (<Login setlogin={setlogin}/>) : (<Overview setlogin={setlogin}/>)) }
        </div>
    );
}
    
export default App;
    