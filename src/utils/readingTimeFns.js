export function getReadingTime(text, wordsPerMinute = 200) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return {
    minutes,
    text: `${minutes} min read`,
    words,
  };
}
