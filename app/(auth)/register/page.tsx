import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export const metadata = {
  title: "Registrate | Community",
  description: "Crea tu cuenta en Community",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
