import AuthForm from "@/features/auth/components/AuthForm";
import ResetPassowrdForm from "@/features/auth/components/ResetPasswordForm";
type ParamProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPassword({ params }: ParamProps) {
  const { token } = await params;
  return (
    <AuthForm>
      <ResetPassowrdForm tokenValue={token} />
    </AuthForm>
  );
}
