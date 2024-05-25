import FormInputGroup from "../ui/FormInputGroup";
import ImageInputGroup from "../ui/ImageInputGroup";
import TextAreaGroup from "../ui/TextAreaGroup";
import Button from "../ui/Button";
import { FormTitle } from "../../pages/Sign-up/ProfileForm";
import { createUserWithProfile } from "../../adapters/user-adapter";

function ProfileCreation({ page, setPage, formData, setFormData, setUser }) {

  const handleClick = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      window.alert("Username is required");
      return;
    }
    if (!formData.bio) {
      window.alert("Bio is required");
      return;
    }
    if (!formData.img) {
      window.alert("Image is required");
      return;
    }

    if (page === FormTitle.length - 1) {
      console.log(formData);
      window.alert("Are you done with the registration");
    } else {
      console.log(formData);

      const newUser = await createUserWithProfile(formData);
      setUser(newUser.profile)
    }
  };

  console.log(formData);
  return (
    <div>
      <div className="mt-2 ">
        <ImageInputGroup
          setImage={(img: File) => setFormData({ ...formData, img: img })}
          value={formData.img}
        />
      </div>
      <FormInputGroup
        label="Username"
        type="text"
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <TextAreaGroup
        value={formData.bio}
        changeBio={(e) => setFormData({ ...formData, bio: e.target.value })}
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
    </div>
  );
}

export default ProfileCreation;
