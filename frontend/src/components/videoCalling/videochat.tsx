import React, { useEffect, useRef, useState, useContext } from "react";
import { io, Socket } from "socket.io-client";
import Peer, { MediaConnection } from 'peerjs';
import CurrentUserContext from "../../contexts/current-user-context";

interface VideoChatProps {
  callUserId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ callUserId }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.io client
    socket.current = io("http://localhost:5173");

    // Initialize PeerJS
    peerRef.current = new Peer({
      host: "localhost",
      port: 9000,
      path: '/peerjs',
      debug: 3,
      config: {
        'iceServers': [
          { urls: 'stun:stun1.l.google.com:19302' },
          {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
          }
        ]
      }
    });

    peerRef.current.on('open', id => {
      console.log(`My peer ID is: ${id}`);
    });

    peerRef.current.on('call', (call: MediaConnection) => {
      const acceptsCall = window.confirm("Videocall incoming, do you want to accept it?");
      if (acceptsCall) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            call.answer(stream); // Answer the call with the local media stream
            call.on('stream', (remoteStream) => {
              setRemoteStream(remoteStream);
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            });
          })
          .catch(error => {
            console.error('Error accessing media devices.', error);
          });
      } else {
        console.log("Call denied!");
      }
    });

    peerRef.current.on('error', err => {
      console.error('Peer error:', err);
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const startCall = async (callType: 'video' | 'audio') => {
    const mediaConstraints = callType === 'video'
      ? { video: true, audio: true }
      : { video: false, audio: true };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      setLocalStream(stream);
      if (localVideoRef.current && callType === 'video') {
        localVideoRef.current.srcObject = stream;
      }

      const call = peerRef.current!.call(callUserId, stream);
      call.on('stream', (stream: MediaStream) => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const endCall = () => {
    console.log('Ending call');
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    peerRef.current?.destroy();
    setLocalStream(null);
    setRemoteStream(null);
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline width="320" height="240"></video>
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline width="320" height="240"></video>
      </div>
      <div className="button-container">
        <button onClick={() => startCall('video')} style={{ margin: '10px' }}>Start Video Call</button>
        <button onClick={() => startCall('audio')} style={{ margin: '10px' }}>Start Voice Call</button>
        <button onClick={endCall} style={{ margin: '10px' }}>End Call</button>
      </div>
    </div>
  );
};

export default VideoChat;
