import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
      <div className='join-outer-container'>
        <div className='join-inner-container'>
          <h1 className='heading'>Join</h1>
          <div className="input-container">
            <input type="text" name="Name" className='join-input' placeholder='Name' onChange={(event) => setName(event.target.value)} />
            <input type="text" name="Room" className='join-input' placeholder='Room' onChange={(event) => setRoom(event.target.value)} />
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
              <button className='button' type='submit'>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Join;