import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export const metadata = {
  title: "Iniciar Sesión | Community",
  description: "Inicia sesión en tu cuenta de Community",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
