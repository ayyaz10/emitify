import { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000'
let socket;



const Chat = () => {
  const { name, room } = queryString.parse(location.search);
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [message, setMessage] = useState('');
  const [incommingMessages, setIncommingMessages] = useState([]);
  const [outGoingMessages, setOutGoingMessage] = useState([]);
  const [me, setMe] = useState('')

  
  useEffect(() => {
    socket = io.connect(ENDPOINT);
  }, [ENDPOINT])
  
  useEffect(() => {
  
    // console.log(name, room)
    setRoomName(room);
    setUserName(name);
    setMe(name)
    if(room !== '') {
      socket.emit('joinRoom', room);
    }  
  }, [roomName])



  
 
  const sendMessage = () => {
    if(message === '') return;
    setOutGoingMessage([...outGoingMessages, message]);
    
    socket.emit('sendMessage', {message, room});
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setIncommingMessages([...incommingMessages, data]);
    })
  }, [incommingMessages])
  console.log("name", name)
  console.log("me", me)
  return (
    <div className="outer-container">
      <div className='inner-container'>
        <h1 className="heading">Chat</h1>
        <p>Room: {roomName}</p>
        <p>User: {userName}</p>
        <div className="chat-container">

          <div className='otherMessage'>
            {incommingMessages.map((message, index) => (
              <div className="messages" key={index}>{message.message}</div>
            ))}
          </div>
          {me === name && (
            <div className='personalMessage'>
            {outGoingMessages.map((message, index) => (
              <div className="messages" key={index}>{message}</div>
            ))}
          </div>
          )
        }
          <div className="chat-inner-container">
            <div className="input-container">
              <input
                type="text"
                placeholder='Write message'
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button className='button' onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chat;
