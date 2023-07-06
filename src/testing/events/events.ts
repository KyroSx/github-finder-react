import userEvent from '@testing-library/user-event';
import { Handler, ValueHandler } from './events.types';

export const typeOn: ValueHandler = (element) => (value) =>
  userEvent.type(element, value);

const clear: Handler = (element) => {
  userEvent.clear(element);
};

export const pressEnterKey = () => {
  userEvent.keyboard('[Enter]');
};

export const clearThenTypeOn: ValueHandler = (element) => (value) => {
  clear(element);
  typeOn(element)(value);
};

export const clickOn: Handler = (element) => {
  userEvent.click(element);
};
