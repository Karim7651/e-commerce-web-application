import ForgetPasswordModal from "@/app/_components/ForgetPasswordModal";
export default function Page({ params }) {
  const { token } = params;
  const endpoint = `${process.env.NEXT_PUBLIC_API}/users/resetPassword/${token}`;
  return <ForgetPasswordModal token={token}/>;
}
