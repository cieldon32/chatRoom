import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Input from './input';
import Messages from './messages';
import './App.css'

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const send = (value: string) => {
    socket?.emit("message", value);
  }
  const messageListener = ({name, message}: any) => {
    setMessages([...messages, `${name}: ${message}`]);
  }
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);
  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    }
  }, [messageListener])
  return (
    <div className="App">
      <Input send={send} />
      <Messages messages={messages} />
    </div>
  )
}

export default App
