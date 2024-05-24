import React, { useEffect, useRef, useState, useContext } from "react"
import { io, Socket } from "socket.io-client"
import Peer, { MediaConnection } from "peerjs"
import CurrentUserContext from "../../contexts/current-user-context"

const VideoChat: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [callAnswered, setCallAnswered] = useState(false)
  const [callInitiated, setCallInitiated] = useState(false)
  const [showLocalVideo, setShowLocalVideo] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({
    x: window.innerWidth - 320 - 16,
    y: window.innerHeight - 240 - 16,
  })
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerRef = useRef<Peer | null>(null)
  const socket = useRef<Socket | null>(null)
  const callRef = useRef<MediaConnection | null>(null)
  const dragRef = useRef<HTMLDivElement>(null)

  // Read peer IDs from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const myPeerId = urlParams.get("myPeerId") || "peer1" // Default to 'peer1'
  const targetPeerId = urlParams.get("targetPeerId") || "peer2" // Default to 'peer2'

  useEffect(() => {
    console.log(`My peer ID from URL: ${myPeerId}`)
    console.log(`Target peer ID from URL: ${targetPeerId}`)

    socket.current = io("http://localhost:5173")

    peerRef.current = new Peer(myPeerId, {
      host: "localhost",
      port: 9000,
      path: "/peerjs",
      debug: 3,
      config: {
        iceServers: [
          { urls: "stun:stun1.l.google.com:19302" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
        ],
      },
    })

    peerRef.current.on("open", (id) => {
      console.log(`My peer ID is: ${id}`)
      socket.current?.emit("peer-connected", { peerId: id })
    })

    peerRef.current.on("call", (call: MediaConnection) => {
      console.log("Incoming call", call)
      const acceptsCall = window.confirm(
        "Videocall incoming, do you want to accept it?"
      )
      if (acceptsCall) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream)
            setShowLocalVideo(true)
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream
            }
            call.answer(stream)
            callRef.current = call
            call.on("stream", (remoteStream) => {
              console.log("Received remote stream")
              setRemoteStream(remoteStream)
              setCallAnswered(true)
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream
              }
            })

            call.on("close", () => {
              console.log("Call closed by peer")
              handleRemoteEndCall()
            })
          })
          .catch((error) => {
            console.error("Error accessing media devices.", error)
          })
      } else {
        console.log("Call denied!")
      }
    })

    peerRef.current.on("error", (err) => {
      console.error("Peer error:", err)
    })

    socket.current.on("end-call", () => {
      console.log("Received end-call signal")
      handleRemoteEndCall()
    })

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy()
      }
      if (socket.current) {
        socket.current.disconnect()
      }
    }
  }, [myPeerId, targetPeerId])

  const startCall = async (callType: "video" | "audio") => {
    const mediaConstraints =
      callType === "video"
        ? { video: true, audio: true }
        : { video: false, audio: true }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
      setLocalStream(stream)
      setShowLocalVideo(true)
      if (localVideoRef.current && callType === "video") {
        localVideoRef.current.srcObject = stream
      }

      console.log(`Calling target peer ID: ${targetPeerId}`)
      const call = peerRef.current!.call(targetPeerId, stream)
      callRef.current = call
      call.on("stream", (stream: MediaStream) => {
        console.log("Received remote stream in startCall")
        setRemoteStream(stream)
        setCallAnswered(true)
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream
        }
      })

      call.on("error", (err) => {
        console.error("Call error:", err)
      })

      call.on("close", () => {
        console.log("Call closed")
        handleRemoteEndCall()
      })

      setCallInitiated(true)
    } catch (error) {
      console.error("Error accessing media devices.", error)
    }
  }

  const handleRemoteEndCall = () => {
    console.log("Remote call ended")
    setRemoteStream(null)
    setCallAnswered(false)
    setCallInitiated(false)
    // Local video and end call button should still be visible until the user ends the call
  }

  const endCall = () => {
    console.log("Ending call")
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop())
    }
    if (callRef.current) {
      callRef.current.close()
    }
    setLocalStream(null)
    setRemoteStream(null)
    setCallAnswered(false)
    setCallInitiated(false)
    setShowLocalVideo(false)

    // Notify the other peer to end the call
    socket.current?.emit("end-call", { targetPeerId })
  }

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsCameraOff(!isCameraOff)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    dragRef.current!.style.cursor = "grabbing"
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragRef.current!.offsetWidth / 2,
        y: e.clientY - dragRef.current!.offsetHeight / 2,
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
    dragRef.current!.style.cursor = "grab"
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover ${
          remoteStream ? "" : "hidden"
        }`}
      ></video>
      <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`w-40 h-30 bg-black rounded-lg cursor-grab ${
          showLocalVideo ? "" : "hidden"
        }`}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full rounded-lg"
        ></video>
      </div>
      <div className="absolute bottom-4 left-4 flex space-x-4">
        {!callInitiated && !callAnswered && (
          <>
            <button
              onClick={() => startCall("video")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              Start Video Call
            </button>
            <button
              onClick={() => startCall("audio")}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              Start Voice Call
            </button>
          </>
        )}
        {(callInitiated || callAnswered || localStream) && (
          <>
            <button
              onClick={toggleMute}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={toggleCamera}
              className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              {isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
            </button>
            <button
              onClick={endCall}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
            >
              End Call
            </button>
          </>
        )}
      </div>
      <div className="absolute top-4 left-4">
        <p>Your Peer ID: {myPeerId}</p>
      </div>
    </div>
  )
}

export default VideoChat
