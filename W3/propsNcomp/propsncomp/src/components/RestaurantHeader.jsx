function RestaurantHeader (props) {
    const starCount = Math.floor(props.rating || 0);  
    const stars = "⭐".repeat (starCount); 

    return (
        <header className="fnaf-header">
                        <h1 className="fnaf-title">{props.restaurantName}</h1>
            {/* Banner image between title and slogan */}
      {props.bannerImage && (
                <div className="fnaf-banner-frame">
        <img 
          src={props.bannerImage} 
          alt="FNAF Animatronics Banner" 
          width="100%" 
          style={{ maxHeight: "400px", objectFit: "cover" }} 
          className="w-full h-full object-cover"
          />
        </div>
      )}
            <p className="fnaf-tagline">"{props.tagline}"</p>
            <div className="fnaf-info-bar">
            <span className="text-amber-400">Cuisine: <span className="text-zinc-200">{props.cuisine}</span></span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-400">Rating: <span className="text-zinc-200">{stars} ({props.rating})</span></span>
        </div>
    </header>
    );
}

export default RestaurantHeader;