import { ORIGIN } from '../config';

export const imageSrc = (image: string) =>
  image ? ORIGIN + 'api/images/' + image : '/images/no-image.png';
