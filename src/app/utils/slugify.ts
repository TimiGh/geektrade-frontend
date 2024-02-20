export function slugify(text: string): string {
  text.replace(' ', '-');
  text.replace('&', 'and');
  return text;
}
