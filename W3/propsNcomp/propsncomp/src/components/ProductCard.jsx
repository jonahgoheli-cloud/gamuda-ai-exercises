// //Product Card
// function ProductCard({
//   id,
//   name = "Unknown Product",
//   price = 0,
//   image = "/placeholder.jpg",
//   isOnSale = false,
//   onAddToCart,
// }) {
//   const handleAddToCart = () => {
//     if (typeof onAddToCart === "function") {
//       onAddToCart(id, name, price);
//     } else {
//       console.warn("onAddToCart is not a function");
//     }
//   };

//   return (
//     <div className="product-card">
//       <img src={image} alt={name} />
//       <h3>{name}</h3>
//       <div className="price">
//         <span className={isOnSale ? "sale-price" : ""}>
//           ${price.toFixed(2)}
//         </span>
//         {isOnSale && <span className="sale-badge">SALE!</span>}
//       </div>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// }

// export default ProductCard;
