import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Navbar(props) {
    const { token, me, chats } = props;

    let mounted = useRef(false)

    const history = useHistory()
    const location = useLocation()

    const [unreadmsgs, setUrms] = useState(0)

    useEffect(() => {
        mounted.current = true
        setUrms(0)
        if (location.pathname !== "/messages") {
            chats.forEach(msg => {
                if ((msg.status === undefined || msg.status === 'sent') && (msg.to === undefined || msg.to === me._id)) {
                    setUrms(unreadmsgs + 1)
                }
            })
        }
        return () => {
            mounted.current = false
        }
        // eslint-disable-next-line
    }, [chats])


    const isTrue = (q) => {
        if (q === "isSeller") {
            if (me.isSeller) {
                return "active"
            } else {
                return "disabled"
            }
        }
        if (q === "isBuyer") {
            if (me.isBuyer) {
                return "active"
            } else {
                return "disabled"
            }
        }
        if (q === "haveCart") {
            if (me.isBuyer) {
                return ""
            } else {
                return "d-none"
            }
        }
        if (q === "verified") {
            if (me.verified) {
                return ""
            } else {
                return "d-none"
            }
        }
        if (q === "msgs") {
            if (unreadmsgs !== 0) {
                return ""
            } else {
                return "d-none"
            }
        }
    }

    const [term, setTerm] = useState("")
    const upTerm = (event) => {
        setTerm(event.target.value)
    }
    const mSearch = (e) => {
        e.preventDefault()
        const spaceRemove = term.split(/[ ]+/)
        const searched = spaceRemove.join(" ")
        if (searched === "" || searched === " ") {
            history.push('/')
        } else {
            history.push(`/search?q=${encodeURI(searched)}`)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-gradient">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isTrue("isBuyer")}`} aria-current="page" to="/buy">Buy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isTrue("isSeller")}`} aria-current="page" to="/sell">Sell</Link>
                        </li>
                        <form className="d-flex" onSubmit={mSearch}>
                            <input className="form-control mx-2" type="search" value={term} onChange={upTerm} placeholder="Search Products" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </ul>
                    {token === null ? <form><Link to="/login" className="btn btn-outline-success mx-1 my-1">LogIn</Link>
                        <Link to="/join" className="btn btn-outline-success mx-1 my-1">SignUp</Link></form> :
                        <div className="d-flex">
                            <div onClick={() => { setUrms(0); history.push('/messages') }} role="button" className={`${isTrue("verified")}`}><i className="fas fa-envelope m-2 mb-0 text-success position-relative" style={{ "fontSize": "180%" }}>
                                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary ${isTrue("msgs")}`} style={{ "fontSize": "50%" }}>{unreadmsgs}
                                </span></i></div>
                            <Link to="/my/cart" className={`${isTrue("haveCart")} mx-1`}><i className="fas fa-shopping-cart m-2 mb-0 text-success" style={{ "fontSize": "180%" }}></i></Link>
                            <Link to="/my/account" className="btn btn-outline-success mx-1 my-1">My Account</Link></div>}
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    me: {},
    token: null,
    chats: []
}

Navbar.propTypes = {
    me: PropTypes.object,
    token: PropTypes.string,
    chats: PropTypes.array,
}

