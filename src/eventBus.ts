import mitt from 'mitt';

type Events = {
  postCreated: void;
};

const emitter = mitt<Events>();

export default emitter;