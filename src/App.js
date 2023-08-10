import { useState } from 'react';
import './App.css';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data';
import { MentionsInput, Mention } from 'react-mentions';

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  // create a user-list with key value pairs to be used for react-mentions
  const user_list = [
    {
      id: 'Alan',
      display: 'Alan'
    },
    {
      id: 'Bob',
      display: 'Bob'
    },
    {
      id: 'Carol',
      display: 'Carol'
    },
    {
      id: 'Dean',
      display: 'Dean'
    },
    {
      id: 'Elin',
      display: 'Elin'
    }
  ];

  const handleSend = () => {

    // returns if there is an empty message
    if(message === ''){
      return;
    }

    // generate random user from user_list
    const random = user_list[Math.floor(Math.random() * user_list.length)].display;
    // removing parenthesis and brackets from the user_list object
    const finalMessage = message.replace(/\@\[([^\]]+)\]|\(([^)]+)\)/g, '$1');
    // create a chat objects to be rendered in the container
    const newMessage = {
      profile: random,
      inputs: finalMessage,
      timestamp: new Date().toLocaleTimeString(),
      like: 0
    };
    // append all the chat messages in the message array
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
  // emoji-mart library config to add emojis
  const handleEmojiClick = (emoji) => { // get the desired emoji input as argument
    setMessage(message + emoji.native); // append the emoji to message input
    setShowEmoji(false);
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
              <span className='like-count'>{item.like}</span>
              <button onClick={() => handleLikeCount(index)}><img src="https://cdn-icons-png.flaticon.com/256/889/889140.png" alt="like-button" /></button>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-input'>
        {/* place input text bar from react-mentions library instead of plain html input tag */}
        <MentionsInput 
          onChange={(e)=>setMessage(e.target.value)} 
          value={message}
          onKeyUp={handleKeyPress}
          placeholder='Type your message...' 
          className='mentions-input'
        >
          {/* trigger '@' and show user suggestions from user_list */}
          <Mention 
            trigger="@"
            // pass user_list to the data
            data={user_list}
            className='mention-textbox'
          />
        </MentionsInput>

        <div className='emotes'>
          <button onClick={()=>setShowEmoji(!showEmoji)} className='emote'><span>&#x1F604;</span></button>
          <button onClick={handleSend}><img src="https://cdn-icons-png.flaticon.com/256/3682/3682321.png" alt="send" /></button>
        </div>
        {showEmoji && (
          <div className="emoji-dir">
          {/* render Picker component from emoji library */}
          <Picker
          data={data}
          previewPosition="none"
          onEmojiSelect={(e)=>handleEmojiClick(e)}
          />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
