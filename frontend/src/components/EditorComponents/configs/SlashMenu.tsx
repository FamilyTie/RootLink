function CustomSlashMenu({ items, selectedIndex, onItemClick }) {
  return (
    <div className={"slash-menu"}>
      {items.map((item, index) => (
        <div
          className={`slash-menu-item${
            selectedIndex === index ? " selected" : ""
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
