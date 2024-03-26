import ModifierWrapper from '../ModifierWrapper/ModifierWrapper';
import CategoryForm from './Category.form';
import ImageManager, { Image } from '../ImageManager/ImageManager';
import {
  useUpdateCategory,
  useDeleteCategory,
} from '../../../../../store/categoriesSlice';
import withEditSwitch from '../HOC/withEditSwitch';

type CategoryItemCMSType = {
  Images: Image[];
  id: string;
  name: string;
  close: Function;
};

function CategoryItemCMS({ id, Images, name, close }: CategoryItemCMSType) {
  const { updateCategory } = useUpdateCategory();
  const { deleteCategory } = useDeleteCategory();

  return (
    <ModifierWrapper
      close={close}
      save={updateCategory}
      remove={() => deleteCategory(id)}
    >
      <CategoryForm initialValues={{ id, name }} />
      <ImageManager property={{ categoryId: id }} Images={Images} />
    </ModifierWrapper>
  );
}

export default withEditSwitch(CategoryItemCMS);
