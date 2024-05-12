import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavbarFive from "../layout/headers/NavbarFive";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import FooterThree from "../layout/footers/FooterThree";

function UpdatePassword() {
  const router = useRouter();
  const { phone, token } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/otppassword",
        {
          mobile_number: phone,
          new_password: newPassword,
          token: token,
        }
      );
      toast.success("Password updated successfully.");
      router.push("/login");
    } catch (error) {
      toast.error(error?.response.data.error.message);
      console.error(error?.response.data.error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavbarFive />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80%" }}
      >
        <div>
          <h2>Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  {showPassword ? (
                    <EyeOff onClick={togglePasswordVisibility} size={15} />
                  ) : (
                    <Eye onClick={togglePasswordVisibility} size={15} />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            {successMessage && (
              <div className="text-success">{successMessage}</div>
            )}
            <button type="submit" className="btn btn-gradient mt-3">
              Update Password
            </button>
          </form>
        </div>
      </div>
      <FooterThree />
    </div>
  );
}

export default UpdatePassword;
