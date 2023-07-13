export const getTraitsArray = (traits) => {
  const validTraitNames = Object.keys(traits).filter(
    (trait) => trait.includes('Name') && traits[trait]
  );

  const obj = {};

  validTraitNames.forEach((traitName) => {
    const traitId = traitName.split('e')[1];

    const name = traits[`traitName${traitId}`];
    const value = traits[`traitValue${traitId}`];

    obj[name] = value;
  });

  return obj;
};
