export const createAudioInstance = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.loop = true;
  return audio;
};