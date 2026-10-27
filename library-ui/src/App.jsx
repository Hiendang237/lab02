import { useEffect, useState } from "react";

import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument
} from "./services/documentService";

import "./App.css";

const emptyForm = {
  title: "",
  author: "",
  publicationYear: 2026,
  description: ""
};

function App() {
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadDocuments = async () => {
    try {
      const response = await getDocuments();
      setDocuments(response.data);
      setError("");
    } catch {
      setError("Không thể kết nối Backend.");
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await updateDocument(editingId, form);
      } else {
        await createDocument(form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadDocuments();
    } catch {
      setError("Không thể lưu tài liệu.");
    }
  };

  const handleEdit = (doc) => {
    setEditingId(doc.id);

    setForm({
      title: doc.title,
      author: doc.author,
      publicationYear: doc.publicationYear,
      description: doc.description
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài liệu?")) {
      return;
    }

    try {
      await deleteDocument(id);
      await loadDocuments();
    } catch {
      setError("Không thể xóa tài liệu.");
    }
  };

  return (
    <div className="container">
      <h1>Thư viện tài liệu khoa học</h1>
      <p>Quản lý tài liệu bằng ASP.NET Core và React</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <h2>
          {editingId !== null
            ? "Cập nhật tài liệu"
            : "Thêm tài liệu mới"}
        </h2>

        <input
          placeholder="Tên tài liệu"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          placeholder="Tác giả"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Năm xuất bản"
          value={form.publicationYear}
          onChange={(e) =>
            setForm({
              ...form,
              publicationYear: Number(e.target.value)
            })
          }
          required
        />

        <textarea
          placeholder="Mô tả tài liệu"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
        />

        <div>
          <button type="submit">
            {editingId !== null ? "Cập nhật" : "Thêm tài liệu"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <h2>Danh sách tài liệu</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên tài liệu</th>
            <th>Tác giả</th>
            <th>Năm</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td>{doc.author}</td>
              <td>{doc.publicationYear}</td>
              <td>
                <button onClick={() => handleEdit(doc)}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(doc.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;