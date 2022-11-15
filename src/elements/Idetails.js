import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC, cAC } from '../states/index'

export default function Idetails(props) {
    const { me } = props;

    let mounted = useRef(false)

    const { userID, productID } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()

    const { loadByID, deleteOne, editOne } = bindActionCreators(pAC, dispatch)
    const { listInCart, orderItem, readCart } = bindActionCreators(cAC, dispatch)
    const { findAcc } = bindActionCreators(uAC, dispatch)

    const items = useSelector(state => state.prod)
    const usrs = useSelector(state => state.usr)
    const item = items[0] || {}
    const usr = usrs[0] || {}
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("auth") !== null) {
            readCart()
        }
        loadByID(productID)
        findAcc(userID)
        return () => { mounted.current = false }
        // eslint-disable-next-line
    }, [])

    let my = false
    let in_cart = false
    if (userID === me._id) {
        my = true
    } else {
        cart.forEach(element => {
            if (element._id === productID) {
                in_cart = true
            }
        });
    }
    if (in_cart === true) {
        document.getElementById('addC').classList.add("d-none")
    }

    const isTrue = (q) => {
        if (q === "isBuyer") {
            if (me.isBuyer) {
                return "badge bg-success mx-2"
            } else {
                return "badge bg-success mx-2 d-none"
            }
        }
    }

    const editMe = async () => {
        const eImage = await prompt("Image URL", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        await editOne(productID, eImage, eTitle, eDesc, eCtgry, ePrice)
        alert("updated successfully")
        await loadByID(productID)
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            await deleteOne(productID)
            history.push('/')
        }
    }
    const add2Cart = async () => {
        await listInCart(productID)
        document.getElementById('addC').classList.add('d-none')
    }
    const order2Get = async () => {
        await orderItem(productID)
        document.getElementById('addO').classList.add('d-none')
    }
    const goToUser = () => {
        history.push(`/${usr._id}`)
    }

    if (item.title !== undefined && usr.name !== undefined) {
        document.title = `${item.title} - ${usr.name}`
    } else {
        document.title = process.env.REACT_APP_NAME
    }

    return (
        <div className="d-flex justify-content-center">
            {usr.name === undefined || item.title === undefined ? <h2 className='text-center'>!!! Incorrect URL !!!</h2> :
                <div className="card my-5 mx-2">
                    <img src={item.image ? item.image : ""} className="card-img-top" style={{ "maxHeight": "500px" }} alt={item.title ? item.title : ""} />
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title"><strong>{item.title ? item.title : ""}</strong> by <strong role="button" onClick={goToUser}>{usr.name ? usr.name : ""}</strong></h5>
                            {!my ?
                                <span role="button" id="addC"
                                    className={isTrue("isBuyer")}
                                    onClick={add2Cart}> ADD to cart <i className="fas fa-cart-plus"></i></span> :
                                <i role="button" className="fas fa-edit mx-2" onClick={editMe} ></i>}
                            {!my ?
                                <span role="button" id="addO"
                                    className={isTrue("isBuyer")}
                                    onClick={order2Get}> GET this item <i className="fas fa-arrow-alt-circle-down"></i></span> :
                                <i role="button" className="fas fa-trash mx-2" onClick={deleteMe} ></i>}
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted d-inline">{item.category ? item.category : ""}</h6>
                        <h6 className="card-subtitle mb-2 text-muted d-inline"> | Cost - INR {item.price ? item.price : 0} | </h6>
                        <h6 className="card-subtitle mb-2 text-muted d-inline">Sold - {item.sold ? item.sold : 0}</h6>
                        <p className="card-text">{item.description ? item.description : ""}</p>

                    </div>
                </div>}
        </div>
    )
}


Idetails.defaultProps = {
    me: {}
}

Idetails.propTypes = {
    me: PropTypes.object
}
