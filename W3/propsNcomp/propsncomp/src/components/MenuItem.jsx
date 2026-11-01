function MenuItem(props) {
  return (
    <div className="fnaf-card">
      {/* Container forcing fixed height/aspect ratio */}
      <div className="fnaf-card-img-container">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="fnaf-card-body">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="fnaf-item-title">{props.name}</h3>
            <span className="fnaf-price-badge">${props.price?.toFixed(2)}</span>
          </div>

          {/* CHECK THIS PARAGRAPH: Make sure it's using props.description */}
          <p className="fnaf-item-desc">{props.description}</p>
        </div>

        {/* Badges and Button */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {props.isVegetarian && <span className="fnaf-badge-veg">Vegetarian</span>}
            {props.isSpicy && <span className="fnaf-badge-spicy">Spicy</span>}
          </div>

          <button onClick={() => { 
            if (props.on0rder) {
              props.on0rder(props.name, props.price); 
          } else {
            console.error("on0rder prop was not passed down to MenuItem!");
            }
          }}
           className="fnaf-btn">
            🍕 Order Now
          </button>
      </div>
    </div>
    </div>
  );
}

export default MenuItem