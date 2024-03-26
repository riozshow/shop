import TagsManager from '../TagsManager/TagsManager';
import { FormProps, withForm } from '../../../../HOC/withForm';
import { validators } from '../../../../../utils/validators';

function ProductForm({
  initialValues,
  categories,
  field,
  updateForm,
}: {
  initialValues?: any;
  categories: any[];
} & FormProps) {
  return (
    <>
      <input placeholder="Name..." {...field('name')} />
      <div className="d-flex gap-2">
        <select className="w-100" {...field('categoryId')}>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input className="w-100" placeholder="Price..." {...field('price')} />
      </div>
      <textarea
        placeholder="Description..."
        style={{ height: '130px' }}
        {...field('description')}
      />
      <TagsManager
        Tags={initialValues?.Tags}
        update={(tags: any) => updateForm('Tags', tags)}
      />
    </>
  );
}

export default withForm(ProductForm, {
  name: validators.name,
  price: validators.price,
  description: validators.description,
});
