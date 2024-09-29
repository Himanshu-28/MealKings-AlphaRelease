// import React, { useEffect } from 'react'; 
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addItem, removeItem } from '../redux/cartSlice';
// import { setMenuItems } from '../redux/menuSlice'; // Import the action
// import axios from 'axios';
// import '../custom.css';

// const MenuItems = () => {
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart.cart);
//     const menuItems = useSelector((state) => state.menu.menuItems); // Access menu items from Redux store

//     useEffect(() => {
//         const fetchMenu = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8888/restaurant/2/items'); // Example endpoint

//                 const filteredItems = response.data.map(item => ({
//                     itemName: item.itemName, // Keep itemId for cart functionality
//                     description: item.description,
//                     price: item.itemCost,
//                 }));

//                 dispatch(setMenuItems(filteredItems)); // Dispatch to set filtered menu items in Redux
//             } catch (error) {
//                 console.error("Error fetching menu items:", error);
//             }
//         };
//         fetchMenu();
//     }, [dispatch]);

//     return (
//         <div className="container mt-4">
//             <h1>Menu Items</h1>
//             <div className="row">
//                 {menuItems.map(item => (
//                     <div className="col-md-4 mb-3" key={item.itemName}>
//                         <div className="card">
//                             <div className="card-header">
//                                 <h5>{item.itemName}</h5>
//                             </div>
//                             <div className="card-body">
//                                 <p>Rs. {item.itemCost}</p>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <button className="btn btn-custom" onClick={() => dispatch(addItem(item))}>Add to Cart</button>
//                                     {cart[item.item_id] && (
//                                         <div className="d-flex align-items-center">
//                                             <button className="btn btn-secondary" onClick={() => dispatch(removeItem(item))}>-</button>
//                                             <span className="mx-2">{cart[item.item_id ].quantity}</span>
//                                             <button className="btn btn-secondary" onClick={() => dispatch(addItem(item))}>+</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="text-center mt-3">
//                 <Link to="/cart">
//                     <button className="btn btn-secondary">Go to Cart</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default MenuItems;
