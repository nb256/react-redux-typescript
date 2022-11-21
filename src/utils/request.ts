export default async function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);

  if (!response.ok) throw new Error(response.statusText);

  const jsonResponse = await response.json();

  return jsonResponse as TResponse;
}
