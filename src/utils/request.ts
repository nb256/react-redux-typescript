export default async function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}
): Promise<TResponse | false> {
  try {
    const response = await fetch(url, config);

    if (!response.ok) return false;

    const jsonResponse = await response.json();

    return jsonResponse as TResponse;
  } catch (e) {
    console.error(e);
    return false;
  }
}
