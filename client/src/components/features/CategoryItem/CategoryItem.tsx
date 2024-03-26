import { NavLink } from 'react-router-dom';
import { imageSrc } from '../../../utils/imgSrc';
import { Image } from '../../pages/CMSPage/components/ImageManager/ImageManager';

export type CategoryItemType = {
  id: string;
  name: string;
  discount?: number;
  Images: Array<Image>;
};

const noImageUuid = '2407ffd7-ec42-4daa-a6f5-ca77b39b5ebe';

function CategoryItem({ name, id, discount = 0, Images }: CategoryItemType) {
  const defaultImage = Images.find((i: Image) => i.isDefault);

  return (
    <NavLink to={'categories/' + id}>
      <li className="d-flex gap-3">
        <img
          src={imageSrc(defaultImage ? defaultImage.id : noImageUuid)}
          style={{ height: '40px', aspectRatio: 1 / 1, borderRadius: '200px' }}
        />
        <p style={{ fontWeight: '500' }}>{name}</p>
        {discount > 0 && (
          <p style={{ fontSize: '12px' }} className="customBadge me-auto">
            -{discount}%
          </p>
        )}
      </li>
    </NavLink>
  );
}

export default CategoryItem;
