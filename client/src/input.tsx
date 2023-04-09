import { useEffect, useState } from 'react';

export default function Input({send}: any) {
  const [value, setValue] = useState('');
  const onTyping = (e: any) => {
    setValue(e.target.value);
  }
  return (
    <div>
      <input onChange={onTyping} placeholder='type your message...' value={value} />
      <button onClick={() => send(value)}>send</button>
    </div>
  )
}