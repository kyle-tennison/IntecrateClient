/**
 * Tool for interacting with intecrate api
 */

/**
 * Run a GET request to the Intecrate API
 * @param {string} endpoint
 */
async function get(endpoint) {
  const response = await request(endpoint, {
    method: "GET",
  });
  return response;
}

/**
 * Run a POST request to the Intecrate API
 * @param {string} endpoint
 * @param {string} payload
 */
async function post(endpoint, payload) {
  const response = await request(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
}

/**
 * Runs a wrapped fetch request
 * @param {string} endpoint
 * @param {Object} body
 * @returns
 */
async function request(endpoint, body) {
  const url = getUrl(endpoint);

  let response;
  try {
    console.log(`waiting for ${endpoint} ...`);
    response = await fetch(getUrl(endpoint), body);
  } catch (error) {
    console.error(`Failed to fetch ${url}.`, error);
    return {
      isError: true,
      content: `Sorry! Something unexpected happened: ${error}`,
    };
  }
  if (!response.ok) {
    console.error(`Request to ${url} failed with code ${response.status}`);
    console.error(`Payload?:`, body);
    return {
      isError: true,
      content: `Sorry! Our servers failed with a ${response.status} code`,
    };
  } else {
    const response_json = await response.json();
    console.debug(`${endpoint} responded OK`, response_json);
    return {
      isError: false,
      content: response_json,
    };
  }
}

/**
 * Creates a url to Intecrate API from an endpoint
 * @param {string} endpoint
 */
function getUrl(endpoint) {
  if (endpoint.charAt(0) != "/") {
    console.warn(`endpoint '${endpoint}' should begin with a '/'`);
    endpoint = `/${endpoint}`;
  }

  return `https://api.intecrate.co${endpoint}`;
}

/**
 * ===================================
 *      PUBLIC FUNCTIONS BELOW
 * ===================================
 */

/**
 * Send login request
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  return await post("login", {
    email: email,
    password: password,
  });
}

/**
 * Send signup request
 * @param {string} email
 * @param {string} password
 * @param {string} username
 */
export async function signup(email, password, username, birthday) {
  return await post("signup", {
    name: username,
    email: email,
    password: password,
    birthday: birthday,
  });
}
