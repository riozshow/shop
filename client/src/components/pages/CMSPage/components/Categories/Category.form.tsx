import { Image } from '../ImageManager/ImageManager';
import { FormProps, withForm } from '../../../../HOC/withForm';
import { validators } from '../../../../../utils/validators';

export type CategoryCMSType = {
  id: string;
  name: string;
  Images: Array<Image>;
  update: Function;
};

function CategoryForm({ field }: CategoryCMSType & FormProps) {
  return (
    <input
      className="w-100"
      placeholder="Category name..."
      {...field('name')}
    />
  );
}

export default withForm(CategoryForm, { name: validators.name });
