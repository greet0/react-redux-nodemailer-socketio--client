import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Item(props) {
    const prop = props;
    const dispatch = useDispatch()
    const { deleteOne, editOne } = bindActionCreators(pAC, dispatch)

    let [my, setMy] = useState(false)

    useEffect(() => {
        if (prop.usr === prop.me._id) {
            setMy(true)
        } else {
            setMy(false)
        }
        // eslint-disable-next-line
    }, [props])

    const editMe = async () => {
        const eImage = await prompt("Image URL", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        await editOne(prop.id, eImage, eTitle, eDesc, eCtgry, ePrice)
        await prop.load_fn()
        alert("updated successfully")
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            await deleteOne(prop.id)
            await prop.load_fn()
        }
    }
    return (
        <div className="col-md-3" key={prop}>
            <div className="card my-2 mx-2" style={{ "width": "18rem" }}>
                <img src={prop.img} className="card-img-top" style={{ "height": "160px" }} alt={prop.title} />
                <div className="card-body">
                    {my ? <div className="d-flex align-items-center">
                        <h5 className="card-title">{prop.title}</h5>
                        <i role="button"
                            className="fas fa-edit mx-2"
                            onClick={editMe}
                        ></i>
                        <i role="button"
                            className="fas fa-trash mx-2"
                            onClick={deleteMe}
                        ></i>
                    </div> : <h5 className="card-title">{prop.title}</h5>
                    }
                    <h6 className="card-subtitle mb-2 text-muted">INR {prop.price}</h6>
                    <p className="card-text">{props.desc}</p>

                    <Link to={`/${prop.usr}/${prop.id}`} className="btn btn-primary">Open</Link>
                </div>
            </div>
        </div>
    )
}

Item.defaultProps = {
    id: "",
    title: "",
    desc: "",
    price: 0,
    img: "",
    me: {},
    usr: "",
    load_fn: () => { }
}

Item.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.number,
    img: PropTypes.string,
    me: PropTypes.object,
    usr: PropTypes.string,
    load_fn: PropTypes.func
}
