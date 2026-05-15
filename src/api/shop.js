import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// GET
export const getItems = async (
  type = "clothes",
  params = {}
) => {
  const res = await api.get(`/${type}`, {
    params,
  });

  return res.data;
};

// POST
export const createItem = async (
  type,
  itemData
) => {
  const res = await api.post(
    `/${type}`,
    itemData
  );

  return res.data;
};

// PUT
export const updateItem = async (
  type,
  id,
  itemData
) => {
  const res = await api.put(
    `/${type}/${id}`,
    itemData
  );

  return res.data;
};

// PATCH
export const patchItem = async (
  type,
  id,
  itemData
) => {
  const res = await api.patch(
    `/${type}/${id}`,
    itemData
  );

  return res.data;
};

// DELETE
export const deleteItem = async (
  type,
  id
) => {
  const res = await api.delete(
    `/${type}/${id}`
  );

  return res.data;
};