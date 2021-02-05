import logo from './logo.svg';
import loading from './loading.gif';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const App = ({

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

  function NewlineText(props) {
    const text = props.text;
    return text.split(',').map(str => 
      <tr>
        <td>{str.split('=')[0]}:</td>
        <td>{str.split('=')[1]}</td>
      </tr>
    );
  }

  return (
    <div className="App">
      <header className="App-header">

        { (!timers || !temp) ? (<img className='loading' src={loading} alt="Loading" width="200" height="200" />) 
        : (<div className="App-header">
          <h1>Timers</h1>
          <div>
            <NewlineText text={timers} />
          </div>

          <br/>

          <h1>Temperature</h1>
          <div>
            <NewlineText text={temp} />
          </div>
        </div>) }

      </header>
    </div>
  );
}

export default App;
