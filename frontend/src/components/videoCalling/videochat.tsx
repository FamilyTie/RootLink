
import React, { useState, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import Peer from 'peerjs';
import { useParams } from "react-router-dom";
import CurrentUserContext from "../../contexts/current-user-context";

const socket = io("http://localhost:5173");

const VideoChat = () => {
    const { currentUser: currentUserId } = useContext(CurrentUserContext);
    const { callUserId } = useParams<{ callUserId: string }>();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer | null>(null);

    useEffect(() => {
        console.log('User joined the chat');
        socket.emit('join', currentUserId);

        return () => {
            console.log('User left the chat');
            socket.emit('leave', currentUserId);
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (peerRef.current) {
                peerRef.current.destroy();
            }
        };
    }, [currentUserId]);

    useEffect(() => {
        socket.on('call', async ({ peerId, type }: { peerId: string, type: string }) => {
            console.log('Incoming call from:', peerId, 'with type:', type);
            const mediaConstraints = type === 'video'
                ? { video: true, audio: true }
                : { video: false, audio: true };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
                setLocalStream(stream);
                if (localVideoRef.current && type === 'video') {
                    localVideoRef.current.srcObject = stream;
                }
                const peer = new Peer();
                peerRef.current = peer;

                peer.on('open', () => {
                    const call = peer.call(peerId, stream);
                    call.on('stream', remoteStream => {
                        console.log('Receiving remote stream');
                        setRemoteStream(remoteStream);
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                        }
                    });
                });

                peer.on('call', call => {
                    call.answer(stream);
                    call.on('stream', remoteStream => {
                        console.log('Answering call, receiving remote stream');
                        setRemoteStream(remoteStream);
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                        }
                    });
                });

                peer.on('error', error => console.error('Peer error:', error));
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        });

        return () => {
            socket.off('call');
        };
    }, [localStream]);

    const startCall = async (callType: string) => {
        const mediaConstraints = callType === 'video'
            ? { video: true, audio: true }
            : { video: false, audio: true };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            setLocalStream(stream);
            if (localVideoRef.current && callType === 'video') {
                localVideoRef.current.srcObject = stream;
            }

            const peer = new Peer();
            peerRef.current = peer;

            peer.on('open', () => {
                console.log('Starting call to:', callUserId, 'with type:', callType);
                socket.emit('call', { userId: callUserId, peerId: currentUserId, type: callType });
            });

            peer.on('call', call => {
                call.answer(stream);
                call.on('stream', remoteStream => {
                    console.log('Receiving remote stream after answering call');
                    setRemoteStream(remoteStream);
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = remoteStream;
                    }
                });
            });

            peer.on('error', error => console.error('Peer error:', error));
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




