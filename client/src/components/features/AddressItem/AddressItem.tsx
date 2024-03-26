import styles from './AddressItem.module.scss';

export type AddressItemType = {
  id: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  isDefault: boolean;
};

function AddressItem({ street, number, postalCode, city }: AddressItemType) {
  return (
    <li className={styles.container}>
      <p>Street, number:</p>
      <h5>
        {street} {number}
      </h5>
      <p>Postal code, city: </p>
      <h5>
        {postalCode} {city}
      </h5>
    </li>
  );
}

export default AddressItem;
