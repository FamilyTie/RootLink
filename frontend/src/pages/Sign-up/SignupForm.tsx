import FormInputGroup from "../../components/ui/FormInputGroup";
import Button from "../../components/ui/Button";
import { FormTitle } from "./ProfileForm";

function SingUp({ page, setPage, formData, setFormData }) {
  //Validation
  const handleClick = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      window.alert("Password must be at least 6 characters long");
      return;
    }

    if (!formData.email) {
      window.alert("Email is required");
      return;
    }
    if (!formData.password) {
      window.alert("Password is required");
      return;
    }
    if (!formData.confirmPassword) {
      window.alert("Confirm Password is required");
      return;
    }

    if (page === FormTitle.length - 1) {
      console.log(formData);
      window.alert("Are you done with the registration");
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  return (
    <>
      <FormInputGroup
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <FormInputGroup
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <FormInputGroup
        label="Confirm password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <div className="text-center mt-8 ">
        {page !== 0 && page !== 3 ? (
          <Button
            text="Prev"
            color="dark me-3"
            onClick={(e) => {
              e.preventDefault();
              setPage((currPage) => currPage - 1);
            }}
            isDisabled={false}
          />
        ) : null}
        <Button
          text={page !== 3 ? "Next" : "Finish"}
          color={page !== 3 ? "purple" : "success"}
          onClick={handleClick}
          isDisabled={false}
        />
        <p className="text-center pt-5">
          Have an account?{" "}
          <span className="underline">
            <a href="/login">Login</a>
          </span>
        </p>
      </div>
    </>
  );
}

export default SingUp;
