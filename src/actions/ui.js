import { TOGGLE_MODAL } from './index';

function toggleModal(settings) {
  return {
    type: TOGGLE_MODAL,
    settings,
  };
}

export {
  toggleModal,
};
