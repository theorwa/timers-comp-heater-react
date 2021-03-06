import loading from '../../images/loading.gif';
import './Overview.css';
import { Button } from "react-bootstrap";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";

const Overview = ({
    setlogin,
}) => {
  const [data, setdata] = useState();
  const [timers, settimers] = useState("");
  const [temp, settemp] = useState("");
  const [disableRefresh, setdisableRefresh] = useState(false);
  
  useEffect(() => {
    data || getData();
  }, [data]);

  const getData = () => {
    axios.get('https://timers-comp-heater.herokuapp.com/data')
    // axios.get('http://localhost:3000/data')
    .then(res => {
      console.log(res);
      setdata(res.data);
      settimers(res.data.timers);
      settemp(res.data.temp);
    })
    setdisableRefresh(true);
    setTimeout(function () {
      setdisableRefresh(false);
    }, 10000);
  };

  const NewlineText = (props) => {
    const text = props.text;
    return text.split(',').map(str => 
      <tr key={str}>
        <td>{str.split('=')[0]}</td>
        <td>{str.split('=')[1]}</td>
      </tr>
    );
  }

  const logoutAction = () => {
    localStorage.clear();
    setlogin(false);
  }

  return (
    <div className="Overview">
      <header className="Overview-header">
        { (!timers || !temp)
        // ? (null) // (<img className='loading' src={loading} alt="Loading" width="200" height="200" />) 
        ? (<>
          <Loader
            className="loader"
            type="Circles"
            color="#00BFFF"
            height={300}
            width={300}
            // radius={100}
            timeout={10000} //10 secs
          />
          </>)
        : (<>
            <Button size="sm" className="Logout" onClick={logoutAction}>Logout</Button>
            <Button size="sm" className="Refresh" disabled={disableRefresh} onClick={getData}>Refresh Data</Button>
            <Button size="sm" className="Logs" onClick={()=> window.open("https://docs.google.com/spreadsheets/d/1KATozL-bJMRbIVW-kIJARpII-HLeGu7xjLtT4W4gdNw/edit?usp=sharing", "_blank")}>logs</Button>
            <div className="timer-container">
              <p>Timers</p>
              <table>
                <tbody>
                    <NewlineText text={timers} />
                </tbody>
              </table>

              <br/>

              <p>Temperature</p>
              <table>
                <tbody>
                    <NewlineText text={temp} />
                </tbody>
              </table>
            </div>
          </>)}


      </header>

        

    </div>
  );
}

export default Overview;
