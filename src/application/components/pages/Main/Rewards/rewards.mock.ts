import { faker } from '@faker-js/faker';
import numeral from 'numeral';

export interface IReward {
  image: string;
  title: string;
  amount: string;
}

export const rewards = (): IReward[] =>
  new Array(15).fill('').map((_, idx) => ({
    image: faker.image.imageUrl(126, 113, undefined, true),
    title: faker.name.findName(),
    amount: `${numeral(
      faker.random.numeric(5, { allowLeadingZeros: false })
    ).format('0,0')} SET`,
  }));
