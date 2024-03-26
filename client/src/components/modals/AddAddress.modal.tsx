import useForm from '../../hooks/useForm';
import FormLabel from '../common/FormLabel/FormLabel';
import { closeModal } from '../common/Modal/closeModal';
import { useEffect } from 'react';
import { useAddAddress, useEditAddress } from '../../store/addressesSlice';
import { validators } from '../../utils/validators';
import { AddressItemType } from '../features/AddressItem/AddressItem';

function AddAddress({ address }: { address?: AddressItemType }) {
  const { addAddress, isSuccess: isSuccessAdd } = useAddAddress();
  const { editAddress, isSuccess: isSuccessEdit } = useEditAddress();

  const { field, form, isCorrect, isAllCorrect } = useForm({
    initialValues: address || {
      street: '',
      number: '',
      postalCode: '',
      city: '',
    },
    filters: {
      street: validators.street,
      number: validators.number,
      postalCode: validators.postalCode,
      city: validators.city,
    },
  });

  useEffect(() => {
    if (isSuccessAdd || isSuccessEdit) closeModal();
  }, [isSuccessAdd, isSuccessEdit]);

  return (
    <div
      style={{ width: '500px' }}
      className="d-flex flex-column gap-2 position-relative w-100"
    >
      <div className="d-flex gap-3">
        <div>
          <FormLabel title={'Street'} isCorrect={isCorrect('street')} />
          <input {...field('street')} placeholder="Street" />
        </div>
        <div>
          <FormLabel title={'Number'} isCorrect={isCorrect('number')} />
          <input {...field('number')} placeholder="Number" />
        </div>
      </div>
      <div className="d-flex gap-3">
        <div>
          <FormLabel
            title={'Postal code'}
            isCorrect={isCorrect('postalCode')}
          />
          <input {...field('postalCode')} placeholder="Postal code" />
        </div>
        <div>
          <FormLabel title={'City'} isCorrect={isCorrect('city')} />
          <input {...field('city')} placeholder="City" />
        </div>
      </div>
      <button
        className={`mt-3  ${isAllCorrect ? 'primary' : 'disabled'}`}
        onClick={() => (address ? editAddress(form) : addAddress(form))}
      >
        Save
      </button>
    </div>
  );
}

export default AddAddress;
