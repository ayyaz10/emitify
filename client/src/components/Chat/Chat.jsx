import { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000'
let socket;



const Chat = () => {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
  }, [ENDPOINT])
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room)
    setRoom(room);
    if(room !== '') {
      socket.emit('joinRoom', room);
    }  
  }, [room])


  
 
  const sendMessage = () => {
    socket.emit('sendMessage', {message, room});
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages([...messages, data]);
  
    })
  }, [messages])

  return (
    <div className="outer-container">
      <div className='inner-container'>
        <h1 className="heading">Chat</h1>
        <div className="chat-container">
          <div >
            {messages.map((message, index) => (
              <div className="messages" key={index}>{message.message}</div>
            ))}
          </div>
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
