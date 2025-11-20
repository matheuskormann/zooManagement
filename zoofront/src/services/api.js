const API_BASE_URL = "http://localhost:5019/api"; // ajuste a porta se a sua API estiver em outra

async function request(url, options = {}) {
  try {
    const response = await fetch(API_BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Erro na requisição");
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
}

// ANIMAIS

export function getAnimais() {
  return request("/Animais");
}

export function createAnimal(data) {
  return request("/Animais", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateAnimal(id, data) {
  return request(`/Animais/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteAnimal(id) {
  return request(`/Animais/${id}`, {
    method: "DELETE",
  });
}

// CUIDADOS

export function getCuidados() {
  return request("/Cuidados");
}

export function createCuidado(data) {
  return request("/Cuidados", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCuidado(id, data) {
  return request(`/Cuidados/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCuidado(id) {
  return request(`/Cuidados/${id}`, {
    method: "DELETE",
  });
}
