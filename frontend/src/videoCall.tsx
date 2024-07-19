// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";

// export function VideoCall() {
//   const socket = io("http://localhost:6700"); // Create socket connection
//   const [me, setMe] = useState("");
//   const [stream, setStream] = useState();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [idToCall, setIdToCall] = useState("");
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState("");
//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream as any);
//         (myVideo as any).current.srcObject = currentStream;
//       });

//     socket.on("me", (id) => {
//       setMe(id);
//     });

//     socket.on("callUser", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });
//   })

//   const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });

//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name: name,
//       });
//     });

//     peer.on("stream", (currentStream) => {
//       (userVideo as any).current.srcObject = currentStream;
//     });

//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     (connectionRef as any).current = peer;
//   }

//     const answerCall = () => {
//         setCallAccepted(true);
//         const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: stream,
//         });
    
//         peer.on("signal", (data) => {
//         socket.emit("answerCall", { signal: data, to: caller });
//         });
    
//         peer.on("stream", (currentStream) => {
//         (userVideo as any).current.srcObject = currentStream;
//         });
    
//         peer.signal(callerSignal);
//         (connectionRef as any).current = peer;
//     }


//     const leaveCall = () => {
//         setCallEnded(true);
//         (connectionRef as any).current.destroy();
//     }
    

// //make it copy current user id and also do normal stuff for video call to work
//     return (
//         <div>
//             <div>
//                 <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
//                 {callAccepted && !callEnded ? (
//                 <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
//                 ) : null}
//             </div>
//             <div>
//                 <input value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
//                 <input value={name} onChange={(e) => setName(e.target.value)} />
//                 {callAccepted && !callEnded ? (
//                 <button onClick={leaveCall}>Hang Up</button>
//                 ) : (
//                 <button onClick={() => callUser(idToCall)}>Call</button>
//                 )}
//                 {receivingCall && !callAccepted ? (
//                 <div>
//                     <h1>{name} is calling...</h1>
//                     <button onClick={answerCall}>Answer</button>
//                 </div>
//                 ) : null}
//             </div>
//         </div>
//     );
// }


