import { useState, useEffect, useRef } from 'react'
import sendIcon from '../../assets/send-icon.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Chat.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

export default function Chat({ socket }) {
  const bottomRef = useRef()
  const messageRef = useRef()
  const chatAreaRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket.on('receiveMessage', data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('receiveMessage')
  }, [socket])

  useEffect(()=>{
    scrollDown()
  }, [messageList])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if (!message.trim()) return;

    socket.emit('message', message);
    clearInput()
  };

  const enterToConfirm = (e) => {
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  const clearInput = () => {
    messageRef.current.value = ''
  }

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <Box className='box'>
      <div className="header">Live Chat</div>
      <Card className='card-chat'>
        <div className="chat-area" ref={chatAreaRef}>
          {
            messageList.map((message, index) => (
              <div className={`area-chat ${message.authorId === socket.id ? 'message-mine' : 'message-other'}`} key={index}>
                <h3 className='author'>{message.author}</h3>
                <p className='text-author'>{message.text}</p>
              </div>
            ))
          }
        <div ref={bottomRef}></div>
        </div>

        <div className='text-input'>
          <TextField placeholder="Enviar Mensagem" onKeyDown={enterToConfirm} className='input-text' inputRef={messageRef} />
          <Button variant="outlined" style={{ height: '56px', border: 'none'}} className='btn-chat' onClick={handleSubmit}><img className='send-icon' src={sendIcon} alt="Send"/></Button>
        </div>
      </Card>
    </Box>
  )
}
