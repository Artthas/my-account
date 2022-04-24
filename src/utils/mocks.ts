import {image, name} from 'faker';
import {Contact} from '../types/contact';

export const makeFakeContact = (id: number): Contact => ({
  'id': id,
  'name': name.title(),
  'image': image.image(),
} as Contact);
