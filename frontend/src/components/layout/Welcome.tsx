import { useNavigate } from "react-router-dom";
function Welcome({ formData }) {
  const navigate = useNavigate();
  

  setTimeout(() => {
    window.location.reload()
  }, 1000)
  console.log(formData);
  return (
    <>
      <h4 className="text-center mt-2">Registration was successful for...</h4>
      <div className="card mt-4">
        <h6 className="card-header bg-dark text-white">
          {formData.firstName} {formData.lastName}
        </h6>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Username:
              <span className="h6 text-success">{formData.userName}</span>
            </li>
            <li className="list-group-item">
              Email: <span className="h6 text-success">{formData.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Welcome;
