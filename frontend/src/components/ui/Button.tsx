interface ButtonProps {
    color: string;
    text: string;
    onClick: (e) => void;
    isDisabled: boolean;
  
}

function Button({ color, text, onClick, isDisabled } : ButtonProps) {
    return (
      <button
        className={` px-5 mr-2 py-2 text-white btn bg-[#0A69AE] `}
        onClick={onClick}
        disabled={isDisabled}
      >
        {text}
      </button>
    );
  }
  
  export default Button;
