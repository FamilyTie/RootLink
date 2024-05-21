import { useState } from "react";
import SingUp from "./Signup";
import PersonalInfo from "./Personalnfo";
import Address from "./ProfileCreation";
import Button from "../ui/Button";
import Welcome from "./Welcome";
import ProfileCreation from "./ProfileCreation";
import CurrentUserContext from "../../contexts/current-user-context";
import { useContext } from "react";
export const FormTitle = [
  "Sign Up",
  "Personal Info",
  "Profile Creation",
  "Done",
];
function Form({refresh}) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    status: "",
    img: "",
    bio: "",
    adoptionYear: "",
    ethicity: "",
  });

  const PageDisplay = () => {
    if (page === 0) {
      //   console.log(page);
      return (
        <SingUp
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 1) {
      //   console.log(page);
      return (
        <PersonalInfo
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 2) {
      //   console.log(page);
      return (
        <ProfileCreation
        
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else {
      //   console.log(page);

      return <Welcome  refresh={refresh} user={currentUser} formData={formData} />;
    }
  };
  return (
    <main
      className={`container absolute transition-a;ll duration-300 z-[4] overflow-hidden inset-0 top-[10%] ${
        page === 2 ? "w-[500px] h-[550px]" : "w-[400px]"
      } ${
        page === 1 && "h-[600px]"
      } border rounded bg-white m-auto h-[500px]  p-5 mt-5 rounded-3`}
    >
      <div className="progress-bar  shadow bg-secondary rounded-3">
        <div
          className="div "
          style={{
            transition: "width 1s",
            width:
              page === 0
                ? "1%"
                : page === 1
                ? "33.3%"
                : page === 2
                ? "66.6%"
                : "100%",
            backgroundColor: page === 3 ? "green" : "#A0D9FF",
          }}
        ></div>
      </div>
      <form className=" ">
        <h1
          className={`  text-center  font-semibold text-[1.8rem] ${
            page === 3 ? "text-success" : "text-navyblue"
          }`}
        >
          {FormTitle[page]}
        </h1>
        <div className="text-start">{PageDisplay()}</div>
      </form>
    </main>
  );
}

export default Form;
