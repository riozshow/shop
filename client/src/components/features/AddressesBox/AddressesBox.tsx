import { useEffect } from 'react';
import {
  useGetAddresses,
  useClear,
  useSetDefault,
  useRemoveAddress,
  useGetDefault,
} from '../../../store/addressesSlice';
import { useLoggedUser } from '../../../store/userSlice';
import AddressItem, { AddressItemType } from '../AddressItem/AddressItem';
import styles from './AddressesBox.module.scss';
import { showModal } from '../../common/Modal/showModal';
import AddAddress from '../../modals/AddAddress.modal';

function AddressesBox() {
  const { data: user } = useLoggedUser();
  const { data: addresses, getAddresses } = useGetAddresses({
    callOnMount: true,
  });
  const { clear } = useClear();
  const { setDefault } = useSetDefault();
  const { data: defaultAddress } = useGetDefault();
  const { removeAddress } = useRemoveAddress();

  const handleAddAddress = () => {
    showModal(<AddAddress />, 'Add address');
  };

  useEffect(() => {
    if (user) {
      getAddresses();
    } else {
      clear();
    }
  }, [user]);

  if (!user?.id) return <></>;

  return (
    <>
      <h5>Address</h5>
      <div className={styles.container}>
        <ul className={styles.addressList}>
          {addresses.map((address: AddressItemType) => (
            <li
              className={`${address.id === defaultAddress?.id ? 'primary' : ''}`}
              onClick={() => setDefault(address)}
              key={address.id}
            >
              <div className="d-flex gap-2 align-items-start flex-column">
                <p>{address.city}</p>
                <p>
                  <b>{address.street}</b>
                </p>
              </div>
            </li>
          ))}
          <li onClick={handleAddAddress} className={styles.add}>
            + Add address
          </li>
        </ul>
        <div className="d-flex flex-column gap-3">
          <ul className={styles.addressDetails}>
            {defaultAddress ? (
              <AddressItem {...defaultAddress} />
            ) : (
              <div className="d-flex h-100 align-items-center justify-content-center opacity-25 p-4">
                <b>No address</b>
              </div>
            )}
          </ul>
          {defaultAddress && (
            <div className="d-flex gap-3">
              <button
                onClick={() =>
                  showModal(
                    <AddAddress address={defaultAddress} />,
                    'Edit address',
                  )
                }
                className="d-flex gap-2"
              >
                <i className="bi bi-pencil-fill"></i>Edit
              </button>
              <button
                onClick={() => removeAddress(defaultAddress.id)}
                className="d-flex gap-2"
              >
                <i className="bi bi-trash"></i> Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddressesBox;
