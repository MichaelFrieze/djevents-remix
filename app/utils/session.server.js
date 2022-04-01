import { redirect } from 'remix';
import { API_URL } from '~/config/index';

export async function login({ email, password }) {
  try {
    let strapiLoginRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });

    let user = await strapiLoginRes.json();

    return user;
  } catch {
    throw new Error(
      'Something went wrong trying to fetch from the Strapi API.'
    );
  }
}
