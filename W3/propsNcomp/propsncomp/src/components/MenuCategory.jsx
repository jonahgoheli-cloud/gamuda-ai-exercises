import MenuItem from "./MenuItem";

function MenuCategory(props) {
  return (
    <section className="mb-12">
      <h2 className="fnaf-category-title">
        <span className="inline-block w-3 h-3 bg-red-600 rounded-full animate-fnaf-pulse"></span>
        {props.categoryName}
      </h2>

      {props.items.length === 0 ? (
        <p className="fnaf-empty-msg">No items available in this category</p>
      ) : (
        <div className="fnaf-grid">
          {props.items.map((item) => (
            <MenuItem
              key={item.id}
              {...item} // <--- Automatically passes name, description, price, image, etc.
              on0rder={props.onItem0rder} // <-- Must match onItem0rder from MenuApp.jsx !
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MenuCategory;
