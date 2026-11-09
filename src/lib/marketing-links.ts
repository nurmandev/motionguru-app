export const createVideoHref = 'http://localhost:5173/register';

export function getHomeSectionHref(pathname: string, sectionId: string) {
  return pathname === '/' ? `#${sectionId}` : `/#${sectionId}`;
}
