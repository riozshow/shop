import FormLabel from '../common/FormLabel/FormLabel';
import { validators } from '../../utils/validators';
import { useRegister } from '../../store/userSlice';
import { FormProps, withForm } from '../HOC/withForm';

const RegisterModal = ({ field, isCorrect, isAllCorrect, form }: FormProps) => {
  const { register, isSuccess, isLoading, isError, error } = useRegister();

  if (isSuccess)
    return (
      <div className="d-flex flex-column gap-3 align-items-center p-4">
        <h4>You are registered!</h4>
        <i
          style={{ color: '#00bb00', fontSize: '48px' }}
          className="bi bi-check-circle-fill"
        ></i>
        <p>Now You can log in</p>
      </div>
    );

  return (
    <>
      <div className="d-flex gap-2 position-relative w-100">
        <div className="d-flex flex-column gap-2 w-100">
          <FormLabel isCorrect={isCorrect('email')} title={'Email'} />
          <input {...field('email')} placeholder="Email" />
          <FormLabel isCorrect={isCorrect('password')} title={'Password'} />
          <input
            {...field('password')}
            placeholder="Password"
            type="password"
          />
          <FormLabel
            isCorrect={isCorrect('passwordRepeat')}
            title={'Repeat password'}
          />
          <input
            {...field('passwordRepeat')}
            placeholder="Password"
            type="password"
          />
          <FormLabel isCorrect={isCorrect('name')} title={'Name'} />
          <input {...field('name')} placeholder="Name" />
          <FormLabel isCorrect={isCorrect('phone')} title={'Phone'} />
          <input {...field('phone')} placeholder="Phone" />
          <div className="d-flex gap-2">
            <input {...field('type')} type="checkbox" />
            <label>I am ADMIN (with CMS features)</label>
          </div>
        </div>
      </div>
      {isError && <label style={{ color: 'red' }}>{error}</label>}
      <button
        className={`mt-3 primary ${isAllCorrect && !isLoading ? '' : 'disabled'}`}
        onClick={() => register(form)}
      >
        {isLoading ? 'Wait...' : 'Register'}
      </button>
    </>
  );
};

export default withForm(RegisterModal, {
  email: validators.email,
  name: validators.name,
  password: validators.password,
  passwordRepeat: validators.passwordRepeat,
  phone: validators.phone,
});
