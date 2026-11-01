// // ProductList
// import ProductCard from "./ProductCard"; // Added missing import

// function ProductList() {
//   const products = [
//     {
//       id: 1,
//       name: "Laptop",
//       price: 999.99,
//       image: "/images/laptop.jpg",
//       isOnSale: true
//     },
//     {
//       id: 2,
//       name: "Mouse",
//       price: 29.99,
//       image: "/images/mouse.jpg"
//     }
//   ];

//   const handleAddToCart = (id, name, price) => {
//     console.log(`Added ${name} (${id}) - $${price} to cart`);
//     // Add to cart logic here
//   };

//   return (
//     <div className="product-list">
//       {products.map(product => (
//         <ProductCard
//           key={product.id}
//           {...product}
//           onAddToCart={handleAddToCart}
//         />
//       ))}
//     </div>
//   );
// }

// export default ProductList