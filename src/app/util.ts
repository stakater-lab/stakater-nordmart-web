export const OpenURLInWindow = (url: string) => (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  window.open(url, "_blank");
};
