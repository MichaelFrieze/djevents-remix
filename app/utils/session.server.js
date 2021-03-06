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
    let res = await fetch(`${process.env.API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });

    if (!res.ok) {
      console.error(res);
    }

    let resObj = await res.json();

    return resObj;
  } catch {
    throw new Error(
      'Something went wrong trying to fetch from the Strapi API. Maybe Strapi is down?'
    );
  }
};

export let getUser = async (request) => {
  if (!request.headers.get('Cookie')) {
    return null;
  }

  try {
    let userToken = await getUserToken(request);
    if (!userToken) {
      return null;
    }

    let res = await fetch(`${process.env.API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    let resObj = await res.json();

    if (res.ok) {
      return resObj;
    } else {
      console.error(res);
      return null;
    }
  } catch {
    throw new Error(
      'Something wrong with getting a user from Strapi. Maybe strapi is down?'
    );
  }
};

export let logout = async (request) => {
  let session = await getUserSession(request);
  return redirect('/account/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
};

export let register = async ({ username, email, password }) => {
  let res = await fetch(`${process.env.API_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    console.error(res);

    let resObj = await res.json();
    throw new Error(
      `${resObj.error.status} | ${resObj.error.name} | Message: ${
        resObj.error.message
      } | Details: ${JSON.stringify(resObj.error.details)}`
    );
  }

  let resObj = await res.json();

  return resObj;
};
