import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
`;

const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 1.75rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
`;

const Footer = styled.div`
  margin-top: 16px;
  text-align: center;
  color: #475569;
`;

const Error = styled.p`
  color: #dc2626;
  margin-bottom: 12px;
`;

type AuthFormProps = {
  title: string;
  loading: boolean;
  error: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
  footer: ReactNode;
  children: ReactNode;
};

export const AuthForm = ({
  title,
  loading,
  error,
  onSubmit,
  buttonLabel,
  footer,
  children,
}: AuthFormProps) => (
  <Section>
    <Form onSubmit={onSubmit}>
      <Title>{title}</Title>
      {error && <Error>{error}</Error>}
      {children}
      <Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : buttonLabel}
      </Button>
      <Footer>{footer}</Footer>
    </Form>
  </Section>
);

export const Field = ({
  label,
  input,
}: {
  label: string;
  input: ReactNode;
}) => (
  <FieldWrapper>
    <label>{label}</label>
    {input}
  </FieldWrapper>
);

export const InputField = styled(Input)`
  width: 100%;
`;
