import styles from './ImageGallerty.module.scss';
import { imageSrc } from '../../../utils/imgSrc';
import { useState } from 'react';
import { showModal } from '../../common/Modal/showModal';

type Image = {
  id: string;
  isDefault?: boolean;
};

function ImageGallery({ Images }: { Images: Image[] }) {
  const [selectedImage, setSelectedImage] = useState<Image | undefined>(
    Images.find((image: Image) => image.isDefault),
  );

  return (
    <div className={styles.container}>
      {selectedImage ? (
        <img
          onClick={() => showModal(<img src={imageSrc(selectedImage.id)} />)}
          className={styles.mainImage}
          src={imageSrc(selectedImage?.id)}
        />
      ) : (
        <div className={styles.noImage}>
          <i className="bi bi-image"></i>
        </div>
      )}
      <div className={styles.thumbnails}>
        {Images.map((image: Image) => (
          <img
            key={image.id}
            onClick={() => setSelectedImage(image)}
            src={imageSrc(image.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
