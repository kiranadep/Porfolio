import { personalInfo, experiences, skills, projects } from '../data/portfolioData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetches portfolio data from the Django REST API.
 * Gracefully falls back to local portfolioData.js if the backend is offline.
 */
export async function getPortfolioData() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${API_BASE_URL}/portfolio/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return {
      profile: data.profile || personalInfo,
      projects: data.projects && data.projects.length > 0 ? data.projects : projects,
      skills: data.skills && data.skills.length > 0 ? data.skills : skills,
      experiences: data.experiences && data.experiences.length > 0 ? data.experiences : experiences,
      categories: data.categories || [],
      isLive: true,
    };
  } catch (error) {
    console.warn('Backend API note (using local portfolio data):', error.message);
    return {
      profile: personalInfo,
      projects: projects,
      skills: skills,
      experiences: experiences,
      categories: [],
      isLive: false,
    };
  }
}

/**
 * Submits contact form inquiries to the Django backend.
 */
export async function submitContactMessage(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit contact message');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
}
