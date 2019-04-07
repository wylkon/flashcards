import { AsyncStorage } from 'react-native';
import { format } from './format';

export const DECKS_STORAGE_KEY = 'FlashCards:decks';

export const createDeck = deck => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
};

export const createQuestion = ({ question, key }) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const { questions } = format(results)[key];

    return AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [key]: {
          questions: [...questions, question],
        },
      })
    );
  });
};

export function getDeck() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(format);
}

export function removeDeck() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(() => {
    const data = {};
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
