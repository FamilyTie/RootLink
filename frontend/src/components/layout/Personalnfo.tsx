import FormInputGroup from "../ui/FormInputGroup";
import Button from "../ui/Button";
import { FormTitle } from "../layout/ProfileForm";
import StatusRadioInputGroup from "../ui/RadioInputGroup";
import DropdownInput from "../ui/DropdownInput";
import YearInput from "../ui/YearInput";

function PersonalInfo({ page, setPage, formData, setFormData }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      window.alert("First name and Last Name is required");
      return;
    }
    if (!formData.ethnicity) {
      window.alert("Ethnicity Required");
      return;
    }

    if (!formData.status) {
      window.alert("Status Required");
      return;
    }

    if (!formData.adoptionYear) {
      window.alert("Adoption Year Required");
      return;
    }

    if (formData)
      if (page === FormTitle.length - 1) {
        console.log(formData);
        window.alert("Are you done with the registration");
        window.location.reload();
      } else {
        setPage((currPage) => currPage + 1);
      }
  };
  return (
    <>
      <FormInputGroup
        label="First name"
        type="text"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />{" "}
      <FormInputGroup
        label="Last name"
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <DropdownInput
        onChange={(e) =>
          setFormData({ ...formData, ethnicity: e.target.value })
        }
        value={formData.ethnicity}
      />
      <StatusRadioInputGroup
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      />
      <YearInput
        value={formData.adoptionYear}
        onChange={(e) =>
          setFormData({ ...formData, adoptionYear: e.target.value })
        }
      />
      <div className="text-center mt-8 ">
        {page !== 0 && page !== 3 ? (
          <Button
            text="Prev"
            color="dark me-3"
            onClick={(e) => {
              e.preventDefault();
              setPage((currPage: number) => currPage - 1);
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
      </div>
    </>
  );
}

export default PersonalInfo;
