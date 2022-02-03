export const generateToken = () => {
  const token = Math.random().toString(16).slice(2);
  localStorage.setItem('X-APP-ID', JSON.stringify(token));
  return token;
};
