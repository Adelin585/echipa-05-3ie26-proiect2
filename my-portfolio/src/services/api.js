const STRAPI_URL = 'http://localhost:1337/api';

// Helper pentru preluare imagini din Strapi (care vin cu path relativ)
export const getStrapiMedia = (url) => {
  if (url == null) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `http://localhost:1337${url}`;
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/projects?populate=*`);
    if (!response.ok) throw new Error('Eroare la preluarea proiectelor');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAbout = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/about?populate=*`);
    if (!response.ok) throw new Error('Eroare la preluarea datelor About');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
