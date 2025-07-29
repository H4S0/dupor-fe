import Icons from '@/components/additional/icons';
import SchoolHeading from '@/components/additional/school-heading';
import LoginForm from '@/components/forms/login-form';

const Login = () => {
  return (
    <div className="relative p-5">
      <SchoolHeading />
      <Icons />

      <div className="relative z-50">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
