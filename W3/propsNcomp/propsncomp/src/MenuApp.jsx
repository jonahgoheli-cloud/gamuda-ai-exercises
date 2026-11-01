// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

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

// const restaurantInfo = {
//   restaurantName: "Freddy Fazbear's Pizza",
//   tagline:
//     "Welcome to Freddy Fazbear's Pizza. A magical place for kids and grown-ups alike, where fantasy and fun come to life!",
//   rating: 4.5,
//   cuisine: "American Fast Food",
// };

import './App.css'
import RestaurantHeader from "./components/RestaurantHeader";
import MenuCategory from "./components/MenuCategory";

function App() {
  const restaurantInfo = {
    restaurantName: "Freddy Fazbear's Pizza",
    bannerImage: "https://shoptrends.com/pub/media/catalog/product/f/r/fr14929bwd22x34-1.jpg", 
    tagline:
      "Welcome to Freddy Fazbear's Pizza. A magical place for kids and grown-ups alike, where fantasy and fun come to life!",
    rating: 4.5,
    cuisine: "American Fast Food",
  };

    const appetizers = [
      {
      id: 1,
      name: "Salad",
      description: "For those who don't feel like eating pizza!",
      price: 5.99,
      category: "Appetizers",
      isVegetarian: true,
      isSpicy: false,
      image: "https://cdn.stocksnap.io/img-thumbs/960w/salad-ingredients_R3Q3JUKPM7.jpg"
    },
    {
      id: 2,
      name: "Sandwiches",
      description: "When salads aren't nearly tasty enough!",
      price: 7.99,
      category: "Appetizers",
      isVegetarian: false,
      isSpicy: true,
      image: "https://media.istockphoto.com/id/1400980767/photo/ham-sandwich-with-cheese-lettuce-and-tomato.jpg?s=612x612&w=0&k=20&c=l97UQZGV9zZuz965Q3sznePlN298BT2lm5GUnRHq4xs="
    },
  ];

    const mainCourses = [
    {
      id: 3,
      name: "Pizzas",
      description: "Freshly baked hot pizzas straight out the oven!",
      price: 11.99,
      category: "Main",
      isVegetarian: false,
      isSpicy: false,
      image: "https://thefreddypizzeria.wordpress.com/wp-content/uploads/2015/05/supreme_pizza1.png?w=1024"
    },
    {
      id: 4,
      name: "Burgers",
      description: "Handcrafted, juicy patties with extra cheese... Need I say more?",
      price: 9.5,
      category: "Main",
      isVegetarian: false,
      isSpicy: true,
      image: "https://static.vecteezy.com/system/resources/thumbnails/082/130/831/small/a-hamburger-with-cheese-tomatoes-and-lettuce-on-a-wooden-table-photo.jpg"
    },
    {
      id: 5,
      name: "Pastas",
      description: "Hot and hearty pasta loaded with savory sauce.",
      price: 13.0,
      category: "Main",
      isVegetarian: false,
      isSpicy: true,
      image: "https://static.vecteezy.com/system/resources/thumbnails/040/490/249/small/ai-generated-classic-pasta-on-kitchen-background-diet-and-food-concept-photo.jpeg"
    }
  ];

  const desserts = [
    {
      id: 6,
      name: "Cupcakes",
      description: "Rich and moist choco cupcakes with Chica's favorite frosting!",
      price: 4.99,
      category: "Dessert",
      isVegetarian: true,
      isSpicy: false,
      image: "https://static.wikia.nocookie.net/fnafencyclopedia/images/b/b6/Mr._Cupcake.png/revision/latest/scale-to-width-down/1200?cb=20240707000810"
    }
  ];

  function handleItem0rder (name, price) {
    alert("You ordered: " + name + " - $" + price.toFixed(2));
    console.log("You ordered: ",name);
  }

  return (
    <div className='fnaf-bg'>
      <div className='fnaf-container'>
      <RestaurantHeader
      restaurantName= {restaurantInfo.restaurantName}
      bannerImage= {restaurantInfo.bannerImage}
      tagline={restaurantInfo.tagline}
      rating={restaurantInfo.rating}
      cuisine={restaurantInfo.cuisine}
    />

  <MenuCategory
    categoryName="Appetizers"
    items={appetizers}
    onItem0rder={handleItem0rder}
    />

  <MenuCategory
    categoryName="Main Courses"
    items={mainCourses}
    onItem0rder={handleItem0rder}
    />

  <MenuCategory
    categoryName="Desserts"
    items={desserts}
    onItem0rder={handleItem0rder}
    />   
    </div>
    </div>
  );
}

export default App;