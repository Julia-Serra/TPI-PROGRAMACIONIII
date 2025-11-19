// js/api.js
// BASE_URL: users + courses (reemplazar si es distinto)
const BASE_URL = "https://691b83ca2d8d785575730d7f.mockapi.io/API";
// ENROLL_URL: enrollments (segunda cuenta)
const ENROLL_URL = "https://691b92da3aaeed735c8d9d38.mockapi.io/API";

/**
 * Helper fetch: centraliza headers, parseo y errores.
 * @param {string} url 
 * @param {object} opts fetch options
 */
async function request(url, opts = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  opts.headers = Object.assign(defaultHeaders, opts.headers || {});
  try {
    const res = await fetch(url, opts);
    const text = await res.text(); // leer texto primero para manejar JSON vacio
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      // incluir body en el error si existe
      const errMsg = (data && data.message) ? data.message : `HTTP ${res.status}`;
      throw new Error(errMsg);
    }
    return data;
  } catch (err) {
    // Re-lanzar para manejar más arriba (UI)
    throw err;
  }
}

/* ---------- USERS ---------- */
async function apiCreateUser(user) {
  return request(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user)
  });
}

async function apiGetUsers() {
  return request(`${BASE_URL}/users`);
}

/**
 * Simula login (MockAPI no tiene auth)
 * @returns user object o null
 */
async function apiLogin(email, password) {
  const users = await apiGetUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

/* ---------- COURSES ---------- */
async function apiGetCourses() {
  return request(`${BASE_URL}/courses`);
}

async function apiCreateCourse(course) {
  return request(`${BASE_URL}/courses`, {
    method: 'POST',
    body: JSON.stringify(course)
  });
}

/* ---------- ENROLLMENTS (segunda cuenta) ---------- */
async function apiGetEnrollments() {
  return request(`${ENROLL_URL}/enrollments`);
}

async function apiCreateEnrollment(enrollment) {
  // enrollment: { userId: "1", courseId: "2", estado: "pendiente" }
  return request(`${ENROLL_URL}/enrollments`, {
    method: 'POST',
    body: JSON.stringify(enrollment)
  });
}

async function apiUpdateEnrollment(id, data) {
  return request(`${ENROLL_URL}/enrollments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}
async function apiDeleteEnrollment(id) {
    return request(`${ENROLL_URL}/enrollments/${id}`, { method: 'DELETE' });
}

/* Opcional: exponer en window si no usás módulos */
window.api = {
  apiCreateUser,
  apiGetUsers,
  apiLogin,
  apiGetCourses,
  apiCreateCourse,
  apiGetEnrollments,
  apiCreateEnrollment,
  apiUpdateEnrollment,
  apiDeleteEnrollment
};
