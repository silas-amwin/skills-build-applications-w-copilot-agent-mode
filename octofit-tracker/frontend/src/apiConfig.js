// API helpers using Vite environment variables with a safe fallback.
// Prefer setting VITE_CODESPACE_NAME in .env.local for Codespace-hosted backends.
const CODESPACE = import.meta.env.VITE_CODESPACE_NAME;

export const getApiBase = () => {
	if (CODESPACE && typeof CODESPACE === 'string' && CODESPACE.length > 0) {
		return `https://${CODESPACE}-8000.app.github.dev/api`;
	}
	// Fallback to relative path to avoid malformed https://undefined-8000... URLs
	return '/api';
}

export const API_BASE_URL = getApiBase();

export async function fetchList(resource, options = {}) {
	const base = getApiBase();
	let url;

	if (/^https?:\/\//.test(resource)) {
		url = resource;
	} else if (resource.startsWith('/api')) {
		// If our base is an absolute URL that contains /api, make an absolute URL
		if (base.startsWith('http')) {
			url = base.replace(/\/api$/, '') + resource;
		} else {
			// relative path ok
			url = resource;
		}
	} else {
		// resource is a short name like 'activities'
		url = `${base.replace(/\/$/, '')}/${resource}/`;
	}

	if (!url.endsWith('/')) url = url + '/';

	const res = await fetch(url, options);
	if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
	const json = await res.json();

	// Normalize responses: accept arrays or objects with common pagination keys
	let items = [];
	let pagination = null;

	if (Array.isArray(json)) {
		items = json;
	} else if (json.results && Array.isArray(json.results)) {
		items = json.results;
		pagination = { next: json.next, previous: json.previous, count: json.count };
	} else if (json.data && Array.isArray(json.data)) {
		items = json.data;
		pagination = { meta: json.meta };
	} else if (json.items && Array.isArray(json.items)) {
		items = json.items;
		pagination = { meta: json.meta };
	} else if (Array.isArray(json.items || json.data || json.results)) {
		items = json.items || json.data || json.results;
	} else {
		// If it's an object but not paginated, present it as a single-item list
		items = [json];
	}

	return { items, pagination, raw: json };
}

export async function fetchUrl(url, options = {}) {
	const res = await fetch(url, options);
	if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
	const json = await res.json();

	let items = [];
	let pagination = null;

	if (Array.isArray(json)) {
		items = json;
	} else if (json.results && Array.isArray(json.results)) {
		items = json.results;
		pagination = { next: json.next, previous: json.previous, count: json.count };
	} else if (json.data && Array.isArray(json.data)) {
		items = json.data;
		pagination = { meta: json.meta };
	} else if (json.items && Array.isArray(json.items)) {
		items = json.items;
		pagination = { meta: json.meta };
	} else {
		items = [json];
	}

	return { items, pagination, raw: json };
}
