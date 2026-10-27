import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api"
});

// GET - Get all documents
export const getDocuments = () =>
  api.get("/documents");

// POST - Create a document
export const createDocument = (data) =>
  api.post("/documents", data);

// PUT - Update a document
export const updateDocument = (id, data) =>
  api.put(`/documents/${id}`, data);

// DELETE - Delete a document
export const deleteDocument = (id) =>
  api.delete(`/documents/${id}`);