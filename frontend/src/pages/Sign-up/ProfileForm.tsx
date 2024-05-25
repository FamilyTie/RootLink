import { useState } from "react";
import SingUp from "./SignupForm";
import PersonalInfo from "../../components/layout/Personalnfo";
import Address from "../../components/layout/ProfileCreation";
import Button from "../../components/ui/Button";
import Welcome from "../../components/layout/Welcome";
import ProfileCreation from "../../components/layout/ProfileCreation";
import { useProfile } from "../../state/store";
import { useContext } from "react";
export const FormTitle = [
  "Sign Up",
  "Personal Info",
  "Profile Creation",
  "Done",
];
function Form(refreshUser) {
  const [currentProfile, setCurrentProfile] = [useProfile((state) => state.currentProfile), useProfile((state) => state.setCurrentProfile)];
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
    homeTown: {},
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
          setUser={setCurrentProfile}
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    }
  };

  return (
    <main
      className={`container absolute transition-all duration-300 z-[4]   inset-0 top-[10%] ${
        page === 2 ? "w-[500px] h-[550px]" : "w-[400px]"
      } ${
        page === 1 && "h-[700px]"
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
