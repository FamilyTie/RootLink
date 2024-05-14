interface ButtonProps {
  color: string;
  text: string;
  onClick: (e) => void;
  isDisabled: boolean;
}

function Button({ color, text, onClick, isDisabled }: ButtonProps) {
  return (
    <button
      className={` px-7 mr-2 py-[5px] transition-all duration-150 hover:opacity-[80%]   text-[1rem] text-white btn bg-[rgb(4,43,72)] `}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
