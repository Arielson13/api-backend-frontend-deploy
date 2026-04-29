import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Container = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
`;

const Card = styled.section`
  width: 100%;
  max-width: 520px;
  padding: 36px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Text = styled.p`
  margin-bottom: 32px;
  line-height: 1.8;
  color: #334155;
`;

const Button = styled.button`
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  background: #ef4444;
  color: #ffffff;
  font-weight: 600;
`;

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Card>
        <Title>Dashboard</Title>
        <Text>Bem-vindo! Seu acesso está protegido e pronto para uso em produção.</Text>
        <Button onClick={logout}>Sair</Button>
      </Card>
    </Container>
  );
};
