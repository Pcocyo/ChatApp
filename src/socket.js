import { useEffect } from "react";
import io from 'socket.io-client'

const socket = io('https://chatapp-backend-yd3m.onrender.com/')

const useSocket = (eventName, callback) => { //custom event to handle socket event
    useEffect(() => {
      socket.on(eventName, callback);
  
      return () => {
        socket.off(eventName, callback);
      };
    }, [eventName, callback]);
  };
  
  export { useSocket, socket };