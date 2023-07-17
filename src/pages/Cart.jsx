import React from 'react'
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getFirestore, deleteField, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard';
import CustomNavbar from './CustomNavbar'
import Footer from './Footer';
var totalAmount;
totalAmount = 0;

const Cart = () => {
    const firestore = getFirestore();
    const [info, setInfo] = useState([]);
    const [amount, setAmount] = useState(totalAmount);
    let check;
    useEffect(() => {
        totalAmount = 0;
        Fetchdata();
        return () => { };
    }, [])
    const Fetchdata = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;
        console.log(email);
        await getDocs(collection(firestore, "add-to-cart", email, "products"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setInfo(newData);
                info.map((p, i) => (totalAmount = totalAmount + Number(p.price)));
                if (info.length == 0)
                    setAmount(0);
                else
                    setAmount(totalAmount)
                console.log(info, newData);
            })
    }
    console.log(info.length);
    console.log(totalAmount);

    if (info.length == 0)
        return (<div className='card'>
            <CustomNavbar />
            <h1>Your Cart is empty!</h1>
            <Footer />
        </div>);
    return (
        <>
            <CustomNavbar />
            <div style={{ display: 'grid' }}>
                <div className='card' style={{width: '100%',border: '5px solid black'}}>
                    <table className='table'>
                    <thead>
                        <tr>
                            
                            <th style={{width:'20%'}}>Image</th>
                            <th style={{width:'10%'}}>Name</th>
                            <th style={{width:'10%'}}>Price</th>
                            <th style={{width:'10%'}}>Quantity</th>
                            <th style={{width:'10%'}}>Subtotal</th>
                            <th style={{width:'10%'}}>Delete</th>
                            
                        </tr>
                    </thead>
                    </table>


                    {
                        info.map((element, i) => (
                            <Frame
                                key={i}
                                name={element.name}
                                price={element.price}
                                image={element.image}
                                id={element.id}


                            />
                        ))
                    }
                </div>

            </div>
            <Footer />

        </>
    );

}

const Frame = ({ name, price, image, id }) => {
    console.log(name + " " + image + " " + price + " " + id);
    var Id = id;

    const [qntty, setQntty] = useState(1);
    const [tprice, setTprice] = useState(price);
    // const [product, setProduct] = useState([name, price, quantity, totalPrice, image]);

    const nevigate = useNavigate();

    //console.log(qntty,tprice);
    const plus = () => {
        setQntty(qntty + 1);
        setTprice((qntty + 1) * price);
        totalAmount = totalAmount + Number(tprice);
        console.log(qntty, tprice, price);
    }
    const minus = () => {
        setQntty(qntty - 1);
        setTprice((qntty - 1) * price);
        totalAmount = totalAmount + Number(tprice);
        console.log(qntty, tprice, price);
    }
    const deleteDocument = () => {

        const auth = getAuth();
        const firestore = getFirestore();
        const user = auth.currentUser;
        const email = user.email;


        const docRef = doc(collection(firestore, 'add-to-cart', email, 'products'), Id);
        deleteDoc(docRef)
            .then(() => {
                console.log('Document successfully deleted!');

            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
        document.getElementById(Id).remove()
    }

    return (
        <>
            <div key={Id} id={Id} className="card" style={{ width: '100%' }}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td style={{width:'20%'}}>
                                <img src={image} width="200px" height="200px" alt="Product Image" />
                            </td>
                            <td style={{width:'10%'}}>{name}</td>
                            <td style={{width:'10%'}}>{price}</td>
                            <td style={{width:'10%'}}>
                                <button className="btn btn-outline-primary" onClick={plus}>
                                    Quantity++
                                </button>
                                <p>{qntty}</p>
                                <button className="btn btn-outline-primary" onClick={minus}>
                                    Quantity--
                                </button>
                            </td>
                            <td style={{width:'10%'}}>{tprice}</td>
                            <td style={{width:'10%'}}>
                                <button
                                    type="submit"
                                    className="btn btn-outline-danger"
                                    id="delete"
                                    onClick={deleteDocument}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>


    );

}


export default Cart;