function CustomSlashMenu({ items, selectedIndex, onItemClick }) {
  return (
    <div className="flex flex-wrap bg-white rounded-lg shadow-lg p-2 overflow-hidden max-w-lg border border-gray-200">
      {items.map((item, index) => (
        <div
          key={index} // Use index as key for simplicity, or better use a unique identifier if available
          className={`flex-auto m-1 p-2 bg-white border border-transparent rounded cursor-pointer shadow-sm text-sm font-medium tracking-wider transition-all duration-300 ease-in-out ${
            selectedIndex === index ? "bg-gray-100 border-gray-300" : ""
          }`}
          onClick={() => onItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default CustomSlashMenu

// z-index: 9999;
//   background-color: white;
//   border: 1px solid #e0e0e0; /* Softer border color */
//   border-radius: 8px; /* Larger border-radius for a smoother look */
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Softer shadow */

//   display: flex;
//   flex-direction: row;
//   gap: 8px;

//   padding: 10px; /* Increased padding for better spacing */
//   top: 8px;
//   overflow-x: auto; /* Allows horizontal scrolling if many items */
//   width: 50rem;
// }

// .slash-menu-item {
//   width: auto;
//   background-color: white;
//   border: 1px solid transparent; /* Transparent borders for a cleaner look */
//   border-radius: 6px; /* Rounded corners */
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow for depth */

//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 500; /* Slightly bolder text */
//   letter-spacing: 0.5px; /* Space out letters slightly */

//   align-items: center;
//   display: flex;
//   flex-direction: row;
//   padding: 8px;

//   transition: all 0.3s ease; /* Smooth transition for hover effects */
// }

// .slash-menu-item:hover,
// .slash-menu-item.selected {
//   background-color: #f0f0f0; /* Softer hover/selected color */
//   border-color: #d0d0d0; /* Visible border on hover/select */
// }
