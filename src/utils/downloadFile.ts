export const downloadFile = (
  file: string,
) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = file;
  downloadLink.setAttribute('target', '_blank');
  downloadLink.download = file;
  downloadLink.click();
};
