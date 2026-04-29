import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm, Field, InputField } from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errorMessage";

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(email, password);
      navigate("/login");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao registrar usuário"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Registrar"
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      buttonLabel="Criar conta"
      footer={
        <>
          Já tem conta? <Link to="/login">Entrar</Link>
        </>
      }
    >
      <Field
        label="Email"
        input={
          <InputField
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        }
      />
      <Field
        label="Senha"
        input={
          <InputField
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        }
      />
    </AuthForm>
  );
};
