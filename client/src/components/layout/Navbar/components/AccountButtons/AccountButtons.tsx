import { useLogout } from '../../../../../store/userSlice';
import styles from './AccountButtons.module.scss';
import { showModal } from '../../../../common/Modal/showModal';
import LoginModal from '../../../../modals/Login.modal';
import RegisterModal from '../../../../modals/Register.modal';

function AccountButtons({ user }: { user: { id?: string } }) {
  const { logout } = useLogout();

  const isLogged = user?.id;

  return (
    <div className={styles.container}>
      {isLogged ? (
        <button onClick={logout}>Sign out</button>
      ) : (
        <>
          <button onClick={() => showModal(<LoginModal />, 'Sign in')}>
            Sign in
          </button>
          <button
            className="primary"
            onClick={() => showModal(<RegisterModal />, 'Sign up')}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
}

export default AccountButtons;
