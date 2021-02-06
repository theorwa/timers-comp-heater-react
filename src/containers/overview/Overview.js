import loading from '../../images/loading.gif';
import './Overview.css';
import { Button } from "react-bootstrap";
import {useEffect, useState} from 'react';
import axios from 'axios';

const Overview = ({
    setlogin,
}) => {
  const [data, setdata] = useState("");
  const [timers, settimers] = useState("");
  const [temp, settemp] = useState("");

  useEffect(() => {
    data || getData();
  }, [data]);

  const getData = () => {
    axios.get('https://timers-comp-heater.herokuapp.com/data')
    .then(res => {
      console.log(res);
      settimers(res.data.timers);
      settemp(res.data.temp);
    })
  };

  const NewlineText = (props) => {
    const text = props.text;
    return text.split(',').map(str => 
      <tr key={str}>
        <td>{str.split('=')[0]}:</td>
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
        <Button size="sm" className="Logout" onClick={logoutAction}>Logout</Button>
        { (!timers || !temp) ? (null) // (<img className='loading' src={loading} alt="Loading" width="200" height="200" />) 
        : (<div className="timer-container">
        
          <h1>Timers</h1>
          <table>
            <tbody>
                <NewlineText text={timers} />
            </tbody>
          </table>

          <br/>

          <h1>Temperature</h1>
          <table>
            <tbody>
                <NewlineText text={temp} />
            </tbody>
          </table>
          
        </div>) }

      </header>
    </div>
  );
}

export default Overview;
