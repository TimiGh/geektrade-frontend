export function slugify(text: string): string {
 return text
   .split(' ')
   .join('-')
   .replace('&', 'and')
   .toLowerCase();
}
