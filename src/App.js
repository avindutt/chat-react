import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  const random = user_list[Math.floor(Math.random() * user_list.length)];

  const newMessage = {
    profile: random,
    inputs: message,
    timestamp: new Date().toLocaleTimeString(),
    like: 0
  };

  const handleSend = () => {
    setMessageList([...messageList, newMessage]);
    setMessage('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  const handleLikeCount = (id) => {
    const updatedMessages = [...messageList];
    updatedMessages[id].like += 1;
    setMessageList(updatedMessages);
  }

  return (
    <div className="main-container">
      <h1>Let's have a Chat!</h1>
      <div className='container'>
        {messageList.map((item, index) => (
          <div key={index} className='items'>
            <div className='details'>
              <span>{item.profile}</span>
              <span>{item.timestamp}</span>
              <p>{item.inputs}</p>
            </div>
            <div>
              <span>{item.like}</span>
              <button onClick={() => handleLikeCount(index)}><img src="https://cdn-icons-png.flaticon.com/256/889/889140.png" alt="like-button" /></button>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <input type="text" onKeyUp={handleKeyPress} placeholder='Type your message...' onChange={(e)=>setMessage(e.target.value)} value={message} />
        <button onClick={handleSend}><img src="https://cdn-icons-png.flaticon.com/256/3682/3682321.png" alt="send" /></button>
      </div>
    </div>
  );
}

export default App;
