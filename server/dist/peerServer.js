// import express from "express"
// import http from "http"
// import { ExpressPeerServer } from "peer"
// const peerApp = express()
// const peerServer = http.createServer(peerApp)
// const peerIo = ExpressPeerServer(peerServer, {
//   // debug: true,
//   path: "/peerjs",
// })
// peerApp.use("/peerjs", peerIo)
// const port = process.env.PEER_PORT || 9000
// function startServer(port: number) {
//   peerServer
//     .listen(port, () => {
//       console.log(`PeerJS server running on port ${port}`)
//     })
//     .on("error", (err: NodeJS.ErrnoException) => {
//       if (err.code === "EADDRINUSE") {
//         console.log(`Port ${port} is in use, trying port ${port + 1}`)
//         startServer(port + 1)
//       } else {
//         console.error(err)
//       }
//     })
// }
// startServer(Number(port))
