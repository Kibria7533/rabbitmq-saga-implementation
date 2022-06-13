import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { USER_SERVICE ,ORDER_SERVICE,STOCK_SERVICE,PAYMENT_SERVICE} from './Url/Url';
import './App.css';

const githubLink = ""

const refreshIcon = "data:image/png;base64,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"

function App() {
 
  const [paymentTableData, setPaymentTable] = useState([]);
  const [orderTableData, setOrderTable] = useState([]);
  const [userTableData, setUserTable] = useState([]);
  const [productTableData, setProductTable] = useState([]);
  const [user_id,setUserId] = useState('');
  const [productId,setProductId] = useState('');
  const [amount,setAmount] = useState('');
  const [cardNumber,setCardNumber] = useState('');
  const [userName,setUserName] =useState('');
  const [userId,setUserIdUser] = useState('');
  const [productName,setProductName]= useState('');
  const [productCode,setProductCode]= useState('');
  const [productPrice,setProductPrice] = useState('');

  const DeleteOrder=async (ind)=>{
    await axios.delete(`${ORDER_SERVICE}/${ind}`).then(el=>{
      getOrders();
    })
  }
  const saveOrder= async (data)=>{
       let res=await axios.post(`${ORDER_SERVICE}/store`,data,{headers: {'Accept': 'application/json',
       'Content-Type': 'application/json'}});
       return res;
  }

  const handleSubmit = () => {
    let data={user_id,productId,amount,cardNumber};
   saveOrder(data);
   setUserId('');
   setProductId('');
   setAmount('');
   setCardNumber('');
   getOrders();
   
  };
const getOrders=async()=>{
 await axios.get(`${ORDER_SERVICE}/orders`).then(dta=>{
  setOrderTable(dta.data);
 });
}

useEffect(()=>{
getOrders();
getUsers();
getProducts();
getPayments();
},[])
const SaveUser=async()=>{
  let user={user_name:userName,user_code:userId};
  await axios.post(`${USER_SERVICE}/store`,user,{headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'}}).then((data)=>{
       console.log(data);
       getUsers();
  })
}
const getUsers=async()=>{
  await axios.get(`${USER_SERVICE}/users`).then(dta=>{
     setUserTable(dta.data.data.data);
 });
}


const DeleteUser=async(ind)=>{
  await axios.delete(`${USER_SERVICE}/delete/${ind}`).then(el=>{
    getUsers();
  })
}
const getProducts=async()=>{
  await axios.get(`${STOCK_SERVICE}/stocks`).then(dta=>{
 setProductTable(dta.data);
 });
}
const SaveProduct=async()=>{
  let user={product_name:productName,product_code:productCode,price:productPrice};
  await axios.post(`${STOCK_SERVICE}/store`,user,{headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'}}).then((data)=>{
       console.log(data);
       getProducts();
  })
}

const DeleteProduct=async(ind)=>{
  await axios.delete(`${STOCK_SERVICE}/delete/${ind}`).then(el=>{
    getProducts();
  })
}
const getPayments=async()=>{
  await axios.get(`${PAYMENT_SERVICE}/payments`).then(dta=>{
    console.log('payments',dta)
 setPaymentTable(dta.data);
 });
}

const DeletePayments=async(ind)=>{
  await axios.delete(`${PAYMENT_SERVICE}/delete/${ind}`).then(el=>{
    getPayments();
  })
}
  return (
    <>
       
      <div className="btnnm">
        <input className="btn1" name="user_id" value={user_id} onChange={(e)=>setUserId(e.target.value)}  placeholder="User ID"></input>
        <input className="btn1" name="productId" value={productId} onChange={(e)=>setProductId(e.target.value)}  placeholder="Product Code"></input>
        <input className="btn1" name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}  placeholder="Ammount"></input>
        <input className="btn1" name="cardNumber" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} placeholder="Card Number"></input>
      </div>
      <div className="btnnm">
       <Button className="submitButton" variant="primary" type="button" onClick={handleSubmit}>Make a Order</Button>
      </div>
      
    
    
      <br></br>
      
      
    
     
     
    <div className="part1">  <div>
      <Button  className="btn1" variant="secondary" width="28px">Orders</Button>
      <Button onClick={getOrders}  className="refresh-container"><img className="refresh-icon" src={refreshIcon}/></Button>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Order Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {orderTableData.length>0 && orderTableData.map((item,ind)=>{
              return(
                <tr key={ind}>
                <td>{item.user_id}</td>
                <td>
                 {item.product_id}
                </td>
                <td>
                {item.order_status}
                </td>
                <td>{item.amount}</td>
                <td><button className="cell-button" onClick={()=>DeleteOrder(item.id)}>Delete</button></td>
              </tr>
              )
             
            })}
            
          </tbody>
        </table>
      </div></div>
    <div className="part2"><div>
      <Button className="btn1" variant="secondary">Product Stock</Button>
      <Button onClick={getProducts} className="refresh-container"><img className="refresh-icon" src={refreshIcon}/></Button>
        <table>
          <tbody>
            <tr>
            <th>Product Name</th>
              <th>Product ID</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {productTableData.length>0 && productTableData.map((item,ind)=>{
              return(
                <tr key={ind}>
                <td>{item.product_name}</td>
                <td>
                 {item.product_code}
                </td>
                <td>
                 {item.price}
                </td>
                <td>
                 
                  <button className="cell-button cell-button" onClick={()=>DeleteProduct(item.id)}>Delete</button>
                </td>
              </tr>
              )
             
            })}
             <tr>
                <td><input type="text" name="productName" value={productName} placeholder="productName" onChange={(e)=>setProductName(e.target.value)}></input></td>
                <td>
                <input type="text" name="productCode" value={productCode} placeholder="productCode" onChange={(e)=>setProductCode(e.target.value)}></input>
                </td>
                <td>
                <input type="text" name="productPrice" value={productPrice} placeholder="productPrice" onChange={(e)=>setProductPrice(e.target.value)}></input>
                </td>
                <td>
                 
                  <button className="cell-button" type="button" onClick={()=>SaveProduct()}>save</button>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div></div>
    <div className="part3">  <div>
      <Button className="btn1" variant="secondary">Payments</Button>
      <Button onClick={getPayments} className="refresh-container"><img className="refresh-icon" src={refreshIcon}/></Button>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {paymentTableData.length>0 && paymentTableData.map((item,ind)=>{
              return(
                <tr key={ind}>
                <td>{item.user_id}</td>
                <td>
                {item.amount}
                </td>
                <td>
                  <button className="cell-button" onClick={()=>DeletePayments(item.id)}>Delete</button>
                </td>
              </tr>
              )
             
            })}
            
          </tbody>
        </table>
      </div></div>
    <div className="part4"> <div>
      <Button className="btn1" variant="secondary" >Users</Button>
      <Button onClick={getUsers} className="refresh-container"><img className="refresh-icon" src={refreshIcon}/></Button>
        <table>
          <tbody>
            <tr>
              <th>User Name</th>
              <th>User ID</th>
              <th>Action</th>
            </tr>
            {userTableData.length>0 && userTableData.map((item,ind)=>{
              return(
                <tr key={ind}>
                <td>{item.user_name}</td>
                <td>
                 {item.user_code}
                </td>
                <td>
                  <button className="cell-button" onClick={()=>DeleteUser(ind)}>Delete</button>
                </td>
              </tr>
              )
             
            })}

            <tr>
                <td><input type="text" name="userName" value={userName} placeholder="Name" onChange={(e)=>setUserName(e.target.value)}></input></td>
                <td>
                <input type="text" name="userId" value={userId} placeholder="User Id" onChange={(e)=>setUserIdUser(e.target.value)}></input>
                </td>
                <td>
                 
                  <button className="cell-button" type="button" onClick={()=>SaveUser()}>save</button>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div></div>
      <footer className="footer">
        <div className="footer-container">
        <h3>Payment System Demo</h3>
          <h3 >Saga Pattern Implementation</h3>
          <p>laravel rabbitmq </p>
          <p><a href={githubLink} target="_blank">Golam Kibria</a> assistant software engineer Softbd Dhaka</p>
        </div>
      </footer>
    </>
  );
}

export default App;
