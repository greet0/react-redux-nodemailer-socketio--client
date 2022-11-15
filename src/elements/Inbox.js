import React, { useState, useEffect, useRef } from 'react'
import Chatbox from './Chatbox';
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { iAC } from '../states/index'

export default function Inbox(props) {
  const { socket, users, chats, me } = props;

  const dispatch = useDispatch()
  const history = useHistory()
  const { msgStatusMod } = bindActionCreators(iAC, dispatch)

  let mounted = useRef(false)

  const [userid, setUserid] = useState(new URLSearchParams(useLocation().search).get('m'))

  const openUsr = async (id) => {
    if (chats.length === 0 || chats.filter(e => e.to === id || e.from === id).length < 10) {
      socket.emit('request-data', { userID: id })
    }
    if (userid !== id) {
      setUserid(id)
    }
    msgStatusMod({user: id, status: "read"})
  }

  useEffect(() => {
    mounted.current = true
    if (localStorage.getItem("auth") === null) {
      history.push('/')
    } else {
      msgStatusMod({user: "", status: "recieved"})
      if (!userid) {
        document.title = "My Inbox"
      } else {
        setTimeout(() => {
          openUsr(userid)
        }, 700);
      }
    }
    return () => {
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="d-flex">
      <div className="list-group border rounded m-1" style={{ "width": "21em" }}>
        {users.length === 0 ? <h4 className="text-center my-2">Start a chat</h4> : users.map((usr) => {
          return <div key={usr._id+usr.new} className={`list-group-item bg-gradient border ${usr.new === 0 ? "bg-secondary" : "bg-primary position-relative"}`} role="button" onClick={() => { openUsr(usr._id) }}>{usr.name}<span className={`badge bg-info rounded-pill end-0 mx-2 position-absolute ${usr.new === 0 && "d-none"}`}>{usr.new}</span></div>
        })}
      </div>
      
      {!userid ? <h1 className="text-center m-1" style={{ "width": "20em" }}>Welcome to your inbox</h1> :
        <Chatbox userid={userid} chats={chats} users={users} me={me} socket={socket} />}
    </div>
  )
}
