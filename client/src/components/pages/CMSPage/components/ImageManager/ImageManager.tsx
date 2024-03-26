import { API } from '../../../../../api/api';
import { closeModal } from '../../../../common/Modal/closeModal';
import { showModal } from '../../../../common/Modal/showModal';
import { imageSrc } from '../../../../../utils/imgSrc';
import { useState } from 'react';

export type Image = {
  id: string;
  isDefault: boolean;
};

function ImageManager({
  property,
  Images = [],
}: {
  property: object;
  Images: Array<Image>;
}) {
  const [images, setImages] = useState<Array<Image>>([...Images]);
  const [defaultImage, setDefaultImage] = useState<Image | undefined>(
    Images.find((image: Image) => image.isDefault),
  );

  const handleAddImage = (e: any) => {
    API.images
      .sendImage({ image: e.target.files[0], ...property })
      .then(({ data }: { data: Image }) => setImages([...images, data]))
      .catch(() => {});
  };

  const handleDeleteImage = (imageId?: string) => {
    if (!imageId) return;
    API.images.deleteImage(imageId).then(() => {
      setImages([...images.filter((i: any) => i.id !== imageId)]);
    });
  };

  const handleSetDefault = (imageId?: string) => {
    if (!imageId) return;
    API.images.setDefault(imageId).then(() => {
      setDefaultImage(images.find((i: Image) => i.id === imageId));
    });
  };

  return (
    <div
      style={{ height: '60px' }}
      className="d-flex gap-2 w-100 overflow-hidden p-1"
    >
      <button
        style={{ aspectRatio: '1/1', fontSize: '24px' }}
        className="h-100 p-0"
        onClick={() =>
          showModal(
            <input
              onChange={(e) => {
                handleAddImage(e);
                closeModal();
              }}
              type="file"
              accept="image/*"
            />,
          )
        }
      >
        +
      </button>

      <ul className="d-flex gap-2 flex-shrink-1 flex-grow-1">
        {images.map((image: any) => (
          <img
            key={image.id}
            onClick={() => handleSetDefault(image.id)}
            style={{
              aspectRatio: '1/1',
              border: defaultImage?.id === image.id ? '3px solid green' : '',
            }}
            src={imageSrc(image.id)}
          ></img>
        ))}
        {images.length === 0 && (
          <p className="align-self-center m-auto">No images</p>
        )}
      </ul>

      <button
        onClick={() => handleDeleteImage(defaultImage?.id)}
        style={{ aspectRatio: '1/1', fontSize: '18px' }}
        className={`h-100 p-0 ${defaultImage ? '' : 'disabled'}`}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  );
}

export default ImageManager;
