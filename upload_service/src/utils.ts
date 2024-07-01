const MAX_LEN = 7;

export function generate() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < MAX_LEN; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}