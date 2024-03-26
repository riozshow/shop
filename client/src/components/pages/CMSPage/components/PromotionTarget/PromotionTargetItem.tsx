function PromotionTargetItem({
  handleRemove,
  categoryId,
  Category,
  Product,
}: {
  categoryId?: string;
  Category?: any;
  Product?: any;
  handleRemove: Function;
}) {
  return (
    <li>
      <p style={{ width: '100px' }}>{categoryId ? 'Category' : 'Product'}</p>
      <p style={{ fontWeight: '500' }}>{Category?.name || Product?.name}</p>
      <button
        onClick={() => handleRemove(categoryId ? { Category } : { Product })}
        className="ms-auto"
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </li>
  );
}

export default PromotionTargetItem;
