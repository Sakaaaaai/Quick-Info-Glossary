import termsData from '../data/terms.json';

export const fetchTerms = async () => {
  try {
    return termsData;
  } catch (error) {
    throw error;
  }
};
