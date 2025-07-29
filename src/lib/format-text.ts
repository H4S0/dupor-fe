const formatText = (ocrText: string | undefined) => {
  const formattedText = ocrText
    ?.split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => `<p>${line.trim()}</p>`)
    .join('\n');

  return formattedText;
};

export default formatText;
