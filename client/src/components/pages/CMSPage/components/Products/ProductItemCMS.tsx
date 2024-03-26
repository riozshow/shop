import ImageManager from '../ImageManager/ImageManager';
import { Image } from '../ImageManager/ImageManager';
import {
  useUpdateProduct,
  useDeleteProduct,
} from '../../../../../store/productsSlice';
import ProductForm from './Product.form';
import ModifierWrapper from '../ModifierWrapper/ModifierWrapper';
import withEditSwitch from '../HOC/withEditSwitch';

export type ProductItemCMSType = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  Images: Array<Image>;
  Tags?: Array<any>;
  categories?: Array<any>;
  description: string;
  close: Function;
};

function ProductItemCMS({
  id,
  Images,
  categories,
  close,
  ...values
}: ProductItemCMSType) {
  const { updateProduct } = useUpdateProduct();
  const { deleteProduct } = useDeleteProduct({ modify: id });

  return (
    <ModifierWrapper
      close={close}
      save={updateProduct}
      remove={() => deleteProduct(id)}
    >
      <ProductForm categories={categories} initialValues={{ ...values, id }} />
      <ImageManager property={{ productId: id }} Images={Images} />
    </ModifierWrapper>
  );
}

export default withEditSwitch(ProductItemCMS);
