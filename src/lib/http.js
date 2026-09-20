const UNREACHABLE_MESSAGE = "Couldn't load this right now. Try refreshing the page.";

async function readJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    // The most common cause here: the mock API layer (service worker) didn't
    // intercept the request, so this is the app's own HTML shell instead of
    // real JSON. Surface a message people can act on, not the raw parser error.
    throw new Error(UNREACHABLE_MESSAGE);
  }
}

/**
 * fetch() that never lets a non-JSON response (e.g. an HTML fallback page)
 * reach callers as a cryptic "Unexpected token '<'" parse error.
 */
export async function fetchJson(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error(UNREACHABLE_MESSAGE);
  }
  const data = await readJson(res);
  return { res, data };
}
