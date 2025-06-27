/**
 * Method to get the current environment
 *
 * @returns 'development' | 'production' | 'test'
 */
const getEnv = () => process.env.NODE_ENV;

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_URL || '';
  return getEnv() === 'development' ? 'http://localhost:3000' : publicRootDomain;
}; 