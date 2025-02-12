import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './Chat.module.scss';

interface ChatProps {
  eventId: number;
  userId: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Chat: React.FC<ChatProps> = ({ eventId, userId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(apiUrl);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('Socket connected!');
    });

    socketIo.on('connect_error', (err) => {
      console.error('Socket connection error: ', err);
    });

    // Подключаемся к комнате события
    socketIo.emit('join event', eventId);

    // Загружаем старые сообщения для этого события
    socketIo.emit('load messages', eventId);

    // Слушаем новые сообщения
    socketIo.on('newMessage', (message) => {
      console.log('Received new message:', message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          username: message.username || 'Unknown',  // Добавляем проверку на наличие имени
        },
      ]);
    });

    // Загружаем все сообщения при подключении
    socketIo.on('load messages', (loadedMessages) => {
      console.log('Loaded messages:', loadedMessages);
      setMessages(loadedMessages);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [eventId]);

  const sendMessage = () => {
    if (message.trim() && userId && eventId) {
      if (socket) {
        socket.emit('sendMessage', { eventId, userId, text: message });
        setMessage('');
      } else {
        console.error('Socket is not initialized');
      }
    } else {
      console.error('Message, userId, or eventId is missing');
    }
  };

  return (
    <>
      <div className={styles.chatHeader}>
        <h2>Chat</h2>
      </div>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.username || 'Unknown'}</strong>: {msg.text}</p>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default Chat;