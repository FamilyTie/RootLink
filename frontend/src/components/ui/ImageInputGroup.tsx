import { useEffect, useState } from "react";

function ImageInputGroup({ setImage, value }) {
  const [imageSrc, setImageSrc] = useState(value);
  console.log(imageSrc);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (!file) {
      console.log("No file selected.");
      return;
    }

    // Create a URL for the selected file to show it as a preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageSrc(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);

    // Optionally upload to Firebase and get the URL
  };

  useEffect(() => {
    if (!value) return;
    const initialFileReader = new FileReader();
    initialFileReader.onloadend = () => {
      setImageSrc(initialFileReader.result as string);
    };
    initialFileReader.readAsDataURL(value);
    setImageSrc(value);
  }, [value]);

  return (
    <div className="w-[100px] h-[100px] m-auto   ">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          opacity: 0,
          width: "100px",
          height: "100px",
          position: "absolute",
          cursor: "pointer",
        }}
      />

      <img
        src={
          imageSrc
            ? imageSrc
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        }
        alt="Selected"
        className="border m-auto rounded-[50%] object-cover w-[100%] h-[100%]"
      />
    </div>
  );
}

export default ImageInputGroup;
