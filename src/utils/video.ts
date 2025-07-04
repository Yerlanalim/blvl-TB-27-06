export function extractVimeoId(input: string): string | null {
  if (!input) return null;
  // If numeric, return as is
  if (/^\d+$/.test(input)) return input;
  // If full URL, grab last segment numeric id
  try {
    const url = new URL(input);
    // Example formats: https://vimeo.com/12345678, https://player.vimeo.com/video/12345678
    const segments = url.pathname.split('/').filter(Boolean);
    const maybeId = segments.pop();
    if (maybeId && /^\d+$/.test(maybeId)) return maybeId;
  } catch {
    // not a valid URL
  }
  return null;
} 