// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// const { useState } = require("react");

// const { useState, use } = require("react");

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


// Example 1: Simple Counter

// import { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);
//   const reset = () => setCount(0);

//   return (
//     <div>
//       <h2>Count: {count}</h2>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }

// export default Counter


// Example 2: Managing Multiple State Variables

// import { useState } from "react";

// function UserProfile() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState ('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState(0);

//   return (
//     <div>
//       <input 
//       placeholder="First Name"
//       value={firstName}
//       onChange={(e) => setFirstName(e.target.value)}
//     />
//     <input 
//     placeholder="Last Name"
//     value={lastName}
//     onChange={(e) => setLastName(e.target.value)}
//     />
//     <input
//     placeholder="Email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     />
//     <input
//     type="number"
//     placeholder="Age"
//     value={age}
//     onChange={(e) => setAge(Number(e.target.value))}
//     />

//     <h3>Hello, {firstName} {lastName}!</h3>
//     <p>Email: {email}</p>
//     <p>Age: {age}</p>
//     </div>
//   );
// }

// export default UserProfile

// Example 3: Object State Management

// import { useState } from "react";

// function UserForm() {
//   const [user, setUser] = useState ({
//     name: '',
//     email: '',
//     phone: ''
//   });

//   const handleInputChange = (field, value) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       [field]: value
//     }));
//   };

//   return (
//     <div>
//       <input
//       placeholder="Name"
//       value={user.name}
//       onChange={(e) => handleInputChange ('name', e.target.value)}
//     />
//     <input
//     placeholder="Email"
//     value={user.email}
//     onChange={(e) => handleInputChange ('email', e.target.value)}
//     />
//     <input
//     placeholder="Phone"
//     value={user.phone}
//     onChange={(e) => handleInputChange ('phone', e.target.value)}
//     />
//     <div>
//       <h3>User Info:</h3>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Phone: {user.phone}</p>
//     </div>
//   </div>
//   );
// }

// export default UserForm

// Example 4: Array State Management

// import { useState } from "react"

// function TodoList() {
//   const [todos, setTodos] = useState ([]);
//   const [inputValue, setInputValue] = useState('');

//   const addTodo = () => {
//     if (inputValue.trim()) {
//       setTodos(prevTodos => [
//         ...prevTodos,
//         {id: Date.now(), text: inputValue, completed: false } 
//       ]);
//       setInputValue('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(prevTodos =>
//       prevTodos.map(todo =>
//         todo.id === id ? {...todo, completed: !todo.completed } : todo
//         )
//       );
//   };

//   const deleteTodo = (id) => {
//     setTodos(prevTodos => prevTodos.filter(todo.id));
//   };

//   return(
//     <div>
//       <input
//       value = {inputValue}
//       onChange={(e) => setInputValue(e.target.value)}
//       placeholder="Add a todo"
//     />
//     <button onClick={addTodo}>Add</button>
//     <ul>
//       {todos.map(todo =>(
//         <li key={todo.id}>
//           <span
//           style={{
//             textDecoration: todo.completed ? 'line-through' : 'none'
//           }}
//           onClick={() => toggleTodo(todo.id)}
//         >
//           {todo.text}
//           </span>
//          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// }

// export default TodoList

// import { useState } from "react";

// function TemperatureConverter() {
//   const [celsius, setCelsius] = useState('');
//   const [fahrenheit, setFahrenheit] = useState('');

//   const handleCelsiusChange = (e) => {
//     const value = e.target.value;
//     setCelsius(value);
//     setFahrenheit(value === '' ? '' : ((value *9) / 5+32).toFixed(2));
//   };
//   const handleFahrenheitChange = (e) => {
//     const value = e.target.value;
//     setFahrenheit(value);
//     setCelsius(value === '' ? '' : (((value - 32) * 5) / 9).toFixed(2));
//   };

//   return (
//     <div>
//       <h2>Temperature Converter</h2>
//       <label>
//         Celsius:
//         <input type="number" value={celsius} onChange={handleCelsiusChange} />
//       </label>
//       <br />
//       <label>
//         Fahrenheit:
//         <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
//       </label>
//     </div>
//   );
// }

// export default TemperatureConverter;

// import { useState } from "react";

// function ShoppingCart() {
//   const product = [
//     {
//       id:1,
//       name: 'Shadow Paladin Deck',
//       price: 54
//     },
//     {
//       id:2,
//       name: 'Booster Box',
//       price: 240
//     },
//     {
//       id:3,
//       name: 'Phantom Blaster Dragon',
//       price: 15
//     },
//   ];

// const [cart, setCart] = useState([]);

// const addToCart = (product) => {
//   setCart([...cart, product]);
// };

// const removeFromCart = (index) => {
//   const updatedCart = [...cart];
//   updatedCart.splice(index,1);
//   setCart(updatedCart);
// };

// const totalPrice = cart.reduce((sum,item) => sum + item.price, 0);

// return (
//   <div>
//     <h2>Shopping Cart</h2>
//     <h3>Products</h3>
//     {product.map((product) => (
//       <div key ={product.id}>
//         {product.name} - ${product.price}
//         <button onClick={() => addToCart(product)}>Add</button>
//         </div>
//         ))}

//         <h3>Cart</h3>
//         {cart.map((item, index) =>(
//           <div key={index}>
//             {item.name} - ${item.price}
//             <button onClick={() => removeFromCart(index)}>Remove</button>
//             </div>
//         ))}

//         <h3>Total ${totalPrice.toFixed(2)}</h3>
//   </div>
// );
// }

// export default ShoppingCart;

import { useState } from "react";

function ExpenseTracker() {
  // Step 1. Initialize state variables
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [filter, setFilter] = useState('all');

  // Students implement the logic 

  // Step 2: Define event handlers and derived state

  const handleAddExpense = (e)=> {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

  const newExpense = {
    id:Date.now(),
    description: description.trim (),
    amount: parseFloat(amount),
    category,
  };

  setExpenses([...expenses, newExpense]);
  setDescription('');
  setAmount('');
  setCategory('food');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses =
  filter === 'all'
  ? expenses
  : expenses.filter((expense) => expense.category === filter);

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  
  return (
    <div>
      <h2>Expense Tracker</h2>

      {/* Step 3: Form to add expenses */}
      <form onSubmit={handleAddExpense}>
        <input 
        type = "text"
        placeholder="Description"
        value= {description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />
      <input
      type ="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      step="0.01"
      min="0.01"
      required
      />
      <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      >
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <button type="submit">Add Expense</button>
      </form>

      {/* Step 4: Filter dropdown */}
      <div>
        <label>Filter by Category: </label>
        <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {/* Step 5: Expenses list */}
      <ul>
        {filteredExpenses.length === 0 ? (
          <li>No expenses found.</li>
        ) : (
          filteredExpenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} ({expense.category}) - ${expense.amount.toFixed(2)}
              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Step 6: Total calculation */}
      <div>
        <strong>Total:</strong> ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default ExpenseTracker;
