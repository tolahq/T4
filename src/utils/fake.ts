import crypto from 'crypto';

export const sample = {
  between: (lower: number, upper: number) => {
    return Math.floor(Math.random() * (upper - lower) + lower);
  },
  one: (list: string[]) => {
    return list[sample.between(list.length, 0)];
  },
  bytes: (length = 12) => {
    return crypto.randomBytes(length).toString('hex');
  },
};

const seeds = {
  names: [
    // Adjectives
    [
      'Sneaky',
      'Dutiful',
      'Magic',
      'Loyal',
      'Smart',
      'Quick',
      'Easy',
      'Smooth',
      'Unfortunate',
    ],
    // Nouns
    [
      'Carpet',
      'Sneaker',
      'Exercise',
      'Barber',
      'Cocktail',
      'Travel',
      'Tea',
      'AI',
      'Sweater',
    ],
    // Kinds
    ['Co', 'Inc', 'Esq'],
  ],
};

export const fake = {
  name: () => {
    return seeds.names.map((v) => sample.one(v)).join(' ');
  },
  amount: () => {
    return sample.between(10_00, 500_00);
  },
  date: () => {
    const d = new Date();
    d.setDate(d.getDate() + sample.between(2, 5));
    return d;
  },
};
