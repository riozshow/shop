import { ORIGIN } from '../config';

export const imageSrc = (image: string) =>
  image ? ORIGIN + 'images/' + image : '/images/no-image.png';
