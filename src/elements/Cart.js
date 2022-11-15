import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { cAC } from '../states/index'

export default function Cart(props) {
    const { me } = props;

    document.title = "My Cart"
    const history = useHistory()
    const dispatch = useDispatch()
    const { readCart, orderItem, uncartItem } = bindActionCreators(cAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        readCart()
    }

    const myCart = useSelector(state => state.cart)

    const order2Get = async (ID) => {
        await orderItem(ID)
    }
    const uncartMe = async (ID) => {
        await uncartItem(ID)
    }

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("auth") !== null) {
            if (me.isBuyer) {
                loadAll()
            } else {
                history.push('/')
            }
        } else {
            history.push('/')
        }
        return () => { mounted.current = false }
        // eslint-disable-next-line   
    }, [])

    return (
        <>
            <h2 className='text-center'>{myCart.length === 0 && "!!! Nothing in Cart !!!"}</h2>
            <ul className="list-group">
                {myCart.map((item) => {
                    let key = item._id + item.title + item.description

                    return <li className="list-group-item justify-content-between align-items-start d-flex" key={key}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.title}</div>
                            <div className="my-2">{item.description}</div>
                            <Link to={`/${item.user}/${item._id}`} className="btn btn-sm btn-primary">Open</Link>
                        </div>
                        <span role="button" className="badge bg-success mx-2" onClick={() => { order2Get(item._id) }}> GET this item <i className="fas fa-arrow-alt-circle-down"></i></span>
                        <span role="button" className="badge bg-danger mx-2" onClick={() => { uncartMe(item._id) }}> REMOVE from cart <i className="fas fa-cart-arrow-down"></i></span>
                    </li>
                })}
            </ul>
        </>
    )
}


Cart.defaultProps = {
    me: {}
}

Cart.propTypes = {
    me: PropTypes.object
}

