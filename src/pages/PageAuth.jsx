import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";

function PageAuth({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuth) {
        navigate("/");
      }
    },
    [isAuth, navigate]
  );
  return isAuth ? children : null;
}

export default PageAuth;
