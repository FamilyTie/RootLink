import { useState } from "react";
import SingUp from "./Signup";
import PersonalInfo from "./Personalnfo";
import Address from "./Adress";
import Button from "../ui/Button";
import Welcome from "./Welcome";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userName: "",
    street: "",
    city: "",
  });
  const FormTitle = ["Sing Up", "Personal Info", "Address", "Done"];

  const PageDisplay = () => {
    if (page === 0) {
      //   console.log(page);
      return <SingUp formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      //   console.log(page);
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      //   console.log(page);
      return <Address formData={formData} setFormData={setFormData} />;
    } else {
      //   console.log(page);

      return <Welcome formData={formData} />;
    }
  };
  return (
    <main
      className="container shadow p-5 mt-5 rounded-3"
      style={{ maxWidth: 500 }}
    >
      <div className="progress-bar shadow bg-secondary rounded-3">
        <div
          className="div"
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
      <form className="form-container">
        <h1
          className={`"display-2" ${
            page === 3 ? "text-success" : "text-purple"
          }`}
        >
          {FormTitle[page]}
        </h1>
        <div className="text-start">{PageDisplay()}</div>
        <div className="mt-5">
          {page !== 0 && page !== 3 ? (
            <Button
                          text="Prev"
                          color="dark me-3"
                          onClick={(e) => {
                              e.preventDefault();
                              setPage((currPage) => currPage - 1);
                          } } isDisabled={false}            />
          ) : null}
          <Button
                      text={page !== 3 ? "Next" : "Finish"}
                      color={page !== 3 ? "purple" : "success"}
                      onClick={(e) => {
                          e.preventDefault();
                          if (page === FormTitle.length - 1) {
                              console.log(formData);
                              window.alert("Are you done with the registration");
                              window.location.reload();
                          } else {
                              setPage((currPage) => currPage + 1);
                          }
                      } } isDisabled={false}          />
        </div>
      </form>
    </main>
  );
}

export default Form;