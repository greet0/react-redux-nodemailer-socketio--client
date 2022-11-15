import React, { useState, useEffect, useRef } from 'react'
import './Chatbox.css';
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { iAC } from '../states/index'

export default function Inbox(props) {
  const { userid, chats, users, me, socket } = props;

  const dispatch = useDispatch()
  const { listSentMsg } = bindActionCreators(iAC, dispatch)

  const ref = useRef(null);

  const [user, setUser] = useState({})
  const [userChat, setUserChat] = useState([])
  const [msg, setMsg] = useState("")


  const updateUser = async () => {
    if (user._id !== userid) {
      let usr = await users.filter(e => e._id === userid)
      document.title = `${usr.name || "My Inbox"}`
      setUser(usr[0])
    }
  }

  const updateUserChat = async () => {
    let uc = await chats.filter(e => e.from === userid || e.to === userid)
    setUserChat(uc)
  }

  const loadMore = () => {
    if (ref.current.scrollTop === 0) {
      let x = new Date(userChat[0]?.createdAt)
      x.setTime(x.getTime() - 500)
      ref.current.scrollTo({ top: 20, behaviour: "smooth" })
      socket.emit("request-data", { userID: userid, date: `${x}` })
    }
  }

  const jumpBottom = () => {
    if (ref.current !== null) {
      let height = ref.current.scrollHeight
      ref.current.scrollTo({ top: height, behaviour: "smooth" })
    }
  }

  const onChange = (e) => {
    setMsg(e.target.value)
  }

  const sendBtn = (e) => {
    e.preventDefault()
    if (msg !== "") {
      let data = { to: user._id, message: msg }
      socket.emit('send-msg', data)
      let id = `${new Date()}`
      data.createdAt = id
      data._id = id
      data.from = me._id
      listSentMsg([data])
      setMsg("")
    }
  }

  useEffect(() => {
    if (chats.length !== 0) {
      updateUserChat()
    }
    // eslint-disable-next-line
  }, [chats])

  useEffect(() => {
    jumpBottom()
    let dv = ref.current
    if (ref.current !== null && userChat[0] !== undefined) {
      ref.current.addEventListener('scroll', loadMore)
    }
    return () => {
      dv?.removeEventListener('scroll', loadMore)
    }
    // eslint-disable-next-line
  }, [userChat])

  useEffect(() => {
    if (users.length !== 0) {
      updateUser()
    }
    // eslint-disable-next-line
  }, [userid, users])


  return (
    <div className="mx-2" style={{ "width": "75em" }}>
      <div className="d-block bg-gradient bg-primary px-1">{user.name} ({user.lastActive})</div>
      <div ref={ref} className="bg-secondary bg-gradient" id="messages">
        {userChat.length === 0 ? <h4 className="text-center my-2">Start a chat with {user.name}</h4> : userChat.map((msg) => {
          return <p key={msg._id || msg.from + msg.createdAt} style={{ "float": msg.from === user._id ? "left" : "right", "clear": "both" }} className={`bg-gradient m-2 ${msg.from === user._id ? "bg-primary text-light" : "bg-light"} rounded-pill p-1 px-2`}>{msg.message}</p>
        })}
      </div>
      <form className="d-flex justify-content-center bg-secondary" onSubmit={sendBtn}>
        <input className="rounded-pill m-1" style={{ "width": "56em" }} value={msg} onChange={onChange}></input>
        <button className="rounded-pill bg-dark text-light m-1" style={{ "lineHeight": "120%" }}>send</button>
      </form>
    </div>
  )
}
