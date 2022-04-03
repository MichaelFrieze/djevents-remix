import { createCookieSessionStorage, redirect } from 'remix';

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable is not set.');
}

let storage = createCookieSessionStorage({
  cookie: {
    name: 'DJ_Events_Session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

let getUserSession = (request) => {
  try {
    let session = storage.getSession(request.headers.get('Cookie'));
    return session;
  } catch {
    throw new Error('Could not get user session.');
  }
};

export let getUserToken = async (request) => {
  try {
    let session = await getUserSession(request);
    let userToken = session.get('userToken');
    if (!userToken || typeof userToken !== 'string') {
      return null;
    }
    return userToken;
  } catch {
    throw new Error('Could not get user token.');
  }
};

export let createUserSession = async (userToken) => {
  try {
    let session = await storage.getSession();
    session.set('userToken', userToken);
    return redirect('/events', {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    });
  } catch {
    throw new Error('Could not create user session.');
  }
};

export let login = async ({ email, password }) => {
  try {
    let strapiLoginRes = await fetch(`${process.env.API_URL}/api/auth/local`, {
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
};

export let getUser = async (request) => {
  if (!request.headers.get('cookie')) {
    return null;
  }

  let userToken = await getUserToken(request);

  try {
    let strapiUserRes = await fetch(`${process.env.API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    let user = await strapiUserRes.json();

    if (strapiUserRes.ok) {
      return user;
    } else {
      console.log(strapiUserRes);
      return null;
    }
  } catch {
    throw new Error('Something wrong with getting a user from Strapi.');
  }
};
