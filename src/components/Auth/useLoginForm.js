import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { ROLE_ADVERTISER } from "../../utils/Constant/globalConstant";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      console.log(responseError);
      setError(responseError?.data.message);
    }
    if (data?.accessToken && data?.data) {
      console.log(data?.data?.role, "data?.data?.role");
      navigate("/brand");
    }
  }, [data, responseError, navigate]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };

  return {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    handleSubmit,
    error,
    isLoading,
  };
};

export default useLoginForm;
