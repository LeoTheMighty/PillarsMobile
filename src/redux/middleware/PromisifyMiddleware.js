export default () => (next) => (action) => {
  return new Promise((resolve) => resolve(next(action)));
};
