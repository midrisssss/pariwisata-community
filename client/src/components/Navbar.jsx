/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar(props) {
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Do you want to Exit?',
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-1',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.onLogout();
      } else if (result.isDenied) {
        console.log("no");
      }
    })
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-20">
      <ul className="flex flex-col justify-center items-start gap-5 bg-white rounded-2xl border-2 border-gray-300 shadow px-3 py-8">
        <li>
          <Link to="/home">
            <img src="/logo.svg" className="max-w-10" />
          </Link>
        </li>
        <li>
          <Link to="/home">
            {props.active === "home" ? (
              <img
                src="/home.svg"
                className="p-2 max-w-10 bg-lime-300 rounded-xl hover:bg-lime-300"
              />
            ) : (
              <img
                src="/home.svg"
                className="p-2 max-w-10 bg-lime-200 rounded-xl hover:bg-lime-300"
              />
            )}
          </Link>
        </li>
        <li>
          <Link to="/post">
            {props.active === "post" ? (
              <img
                src="/upload.svg"
                className="p-2 max-w-10 bg-lime-300 rounded-xl hover:bg-lime-300"
              />
            ) : (
              <img
                src="/upload.svg"
                className="p-2 max-w-10 bg-lime-200 rounded-xl hover:bg-lime-300"
              />
            )}
          </Link>
        </li>
      </ul>
      <div className="bg-white rounded-2xl border-2 border-gray-300 shadow px-3 py-3">
        <Link to="/login" onClick={handleLogout}>
            <img
              src="/settings.svg"
              className="p-2 max-w-10 bg-lime-300 rounded-xl hover:bg-lime-300"
            />
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
