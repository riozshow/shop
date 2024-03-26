import FormLabel from '../common/FormLabel/FormLabel';
import { closeModal } from '../common/Modal/closeModal';
import { validators } from '../../utils/validators';
import { useLogin } from '../../store/userSlice';
import { useEffect } from 'react';
import { FormProps, withForm } from '../HOC/withForm';

function LoginModal({ field, form, isCorrect, isAllCorrect }: FormProps) {
  const { login, isError, isLoading, isSuccess, error } = useLogin();

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <div className="d-flex flex-column gap-2 position-relative w-100">
      <FormLabel title={'Email'} isCorrect={isCorrect('email')} />
      <input {...field('email')} placeholder="Email" />
      <FormLabel title={'Password'} isCorrect={isCorrect('password')} />
      <input {...field('password')} placeholder="Password" type="password" />
      {isError && <label style={{ color: 'red' }}>{error}</label>}
      <button
        className={`mt-3 primary ${isAllCorrect && !isLoading ? '' : 'disabled'}`}
        onClick={() => login(form)}
      >
        {isLoading ? 'Wait...' : 'Login'}
      </button>
    </div>
  );
}

export default withForm(LoginModal, {
  email: validators.email,
  password: validators.password,
});
