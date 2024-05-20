// import { useState, useRef, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import Peer from "simple-peer"
// import { useParams } from "react-router-dom";

// const socket = io("http://localhost:3761")


// const VideoChat = () => {
//     const [localStream, setLocalStream] = useState(null)
//     const  [remoteStream, setRemoteStream] = useState(null)
//     const localVideoRef = useRef<HTMLVideoElement>(null)
//     const remoteVideoRef = useRef<HTMLVideoElement>(null)
//     const peerRef = useRef<Peer.Instance | null > (null)



//     useEffect(() => {

//         navigator.mediaDevices.getUserMedia({video: true, audio: true})
//         .then(stream => {
//             setLocalStream(stream)
//             if(localVideoRef.current) {
//                 localVideoRef.current.srcObject = stream
//             }
//         })
//         .catch(error => console.error('Error accessing media devices.', error))
//     }, [])


//    useEffect(() => {
//     socket.on('offer', handleRecieveCall)
//     socket.on('answer', handleAnswer)
//     socket.on('candidate', handleNewICECandidateMsg)

//     return () => {
//         socket.off('offer', handleRecieveCall)
//         socket.off('answer', handleAnswer)
//         socket.off('candidate', handleNewICECandidateMsg)

//     }
// }, [])
// const startCall = () => {
//     const peer = new Peer({initiator: true, trickle: false, stream: localStream})
//     peerRef.current = peer



//     peer.on('signal', data => {
//         socket.emit('offer', data)
//     })
//     peer.on('stream', stream => {
//         setRemoteStream(stream)
//         if(remoteVideoRef.current){
//             remoteVideoRef.current.srcObject = stream
//         }
//     })

//     peer.on('error', error => console.error('Peer error:', error))
// }

// const handleRecieveCall = (incoming) => {
// const peer = new Peer({initiator: false, trickle: false , stream: localStream})
// peerRef.current = peer

// peer.on('signal', data => {
//     socket.emit('answer', data);
//   });

//   peer.on('stream', stream => {
//     setRemoteStream(stream);
//     if (remoteVideoRef.current) {
//       remoteVideoRef.current.srcObject = stream;
//     }
//   });

//   peer.signal(incoming);
// };
// const handleAnswer = (answer) => {
//     peerRef.current?.signal(answer);
//   };

//   const handleNewICECandidateMsg = (incoming) => {
//     peerRef.current?.signal(incoming);
//   };

//   const endCall = () => {
//     peerRef.current?.destroy();
//     setRemoteStream(null);
//   };

//    return (
//     <div>
//       <div>
//         <video ref={localVideoRef} autoPlay muted playsInline width="320" height="240"></video>
//       </div>
//       <div>
//         <video ref={remoteVideoRef} autoPlay playsInline width="320" height="240"></video>
//       </div>
//       <div>
//         <button onClick={startCall}>Start Call</button>
//         <button onClick={endCall}>End Call</button>
//       </div>
//     </div>
//   );

// }


// export default VideoChat

import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from 'peerjs';
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5173");

const VideoChat = () => {
    const { userId, callUserId } = useParams<{ userId: string; callUserId: string }>();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer | null>(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getUserMedia();

        socket.emit('join', userId);

        return () => {
            socket.emit('leave', userId);
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (peerRef.current) {
                peerRef.current.destroy();
            }
        };
    }, [userId]);

    useEffect(() => {
        socket.on('offer', (data) => {
            console.log('Offer received:', data);
        });

        socket.on('answer', (data) => {
            console.log('Answer received:', data);
        });

        return () => {
            socket.off('offer');
            socket.off('answer');
        };
    }, []);

    const startCall = () => {
        const peer = new Peer(userId);
        peerRef.current = peer;

        peer.on('open', () => {
            socket.emit('call', { userId: callUserId, peerId: userId });
        });

        peer.on('call', call => {
            call.answer(localStream!);
            call.on('stream', stream => {
                setRemoteStream(stream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream;
                }
            });
        });

        peer.on('error', error => console.error('Peer error:', error));
    };

    const endCall = () => {
        peerRef.current?.destroy();
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
            <div>
                <button onClick={startCall}>Start Call</button>
                <button onClick={endCall}>End Call</button>
            </div>
        </div>
    );
};

export default VideoChat;


