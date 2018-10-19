import { CONNECT_DB } from './index';

function connectDb() {
  return {
    type: CONNECT_DB,
  };
}

export {
  connectDb,
};
