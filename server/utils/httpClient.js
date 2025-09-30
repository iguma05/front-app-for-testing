const https = require('https');
const axios = require('axios');
const { API_URL } = require('../config');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function getAuthHeaders(ctx) {
  const token = ctx.cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiGet(ctx, url, config = {}) {
  const headers = { ...getAuthHeaders(ctx), ...(config.headers || {}) };
  const res = await axios.get(`${API_URL}${url}`, { httpsAgent, withCredentials: false, headers });
  return res.data;
}

async function apiPost(ctx, url, data = {}, config = {}) {
  const headers = { ...getAuthHeaders(ctx), ...(config.headers || {}) };
  const res = await axios.post(`${API_URL}${url}`, data, { httpsAgent, withCredentials: false, headers });
  return res.data;
}

async function apiPut(ctx, url, data = {}, config = {}) {
  const headers = { ...getAuthHeaders(ctx), ...(config.headers || {}) };
  const res = await axios.put(`${API_URL}${url}`, data, { httpsAgent, withCredentials: false, headers });
  return res.data;
}

async function apiDelete(ctx, url, config = {}) {
  const headers = { ...getAuthHeaders(ctx), ...(config.headers || {}) };
  const res = await axios.delete(`${API_URL}${url}`, { httpsAgent, withCredentials: false, headers });
  return res.data;
}

module.exports = { apiGet, apiPost, apiPut, apiDelete };


