// frontend/src/pages/VerifyAccount.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyAccount } from "../services/authService";

function VerifyAccount() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verificando cuenta...");

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyAccount(token);
        setMessage(data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Error al verificar cuenta");
      }
    };

    verify();
  }, [token]);

  return <section className="card"><h2>Verificación</h2><p>{message}</p></section>;
}

export default VerifyAccount;