type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) searchParams.append(key, String(val));
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.statusText} (${response.status})`);
  }

  return response.json();
}
