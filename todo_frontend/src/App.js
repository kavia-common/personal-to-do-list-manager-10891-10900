import React, { useState } from 'react';
import './App.css';
import './design-system.css';
import { Icon } from './Icon';

/**
 * PUBLIC_INTERFACE
 * Root component for the todo app UI, using the provided design system and modern minimal style.
 * Features: add todo, edit todo, delete todo, mark complete. All logic handled in React state.
 */
function App() {
  // Simple in-memory todo state
  const [todos, setTodos] = useState([
    // { id: 1, title: 'Learn React', detail: 'Finish todo app', completed: false }
  ]);
  const [form, setForm] = useState({ title: '', detail: '' });
  const [editing, setEditing] = useState(null); // todo id or null
  const [editForm, setEditForm] = useState({ title: '', detail: '' });

  // PUBLIC_INTERFACE
  // Handle add todo
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function handleAddTodo(e) {
    e.preventDefault();
    if (form.title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: form.title.trim(),
          detail: form.detail.trim(),
          completed: false,
        },
      ]);
      setForm({ title: '', detail: '' });
    }
  }

  // PUBLIC_INTERFACE
  // Edit button opens modal
  function startEdit(todo) {
    setEditing(todo.id);
    setEditForm({ title: todo.title, detail: todo.detail });
  }
  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }
  function handleUpdateTodo(e) {
    e.preventDefault();
    setTodos((todos) =>
      todos.map((td) =>
        td.id === editing
          ? { ...td, title: editForm.title, detail: editForm.detail }
          : td
      )
    );
    setEditing(null);
  }
  function handleEditCancel() {
    setEditing(null);
  }

  // PUBLIC_INTERFACE
  // Mark as complete/incomplete
  function handleToggleComplete(id) {
    setTodos((todos) =>
      todos.map((td) =>
        td.id === id ? { ...td, completed: !td.completed } : td
      )
    );
  }

  // PUBLIC_INTERFACE
  // Delete todo
  function handleDelete(id) {
    setTodos((todos) => todos.filter((td) => td.id !== id));
  }

  return (
    <div className="todo-app-root">
      {/* Status Bar - demo only, not functional */}
      <div className="status-bar">
        <div className="status-notch"></div>
        <div className="status-icons">
          <span className="icon-signal"></span>
          <span className="icon-wifi"></span>
          <span className="icon-battery"></span>
        </div>
        <div className="status-indicator"></div>
        <div className="status-time">9:41</div>
      </div>
      <div className="appbar">
        {editing ? (
          <button
            className="icon-back"
            aria-label="Cancel Edit"
            onClick={handleEditCancel}
            type="button"
            style={{ background: "none", position: "absolute", left: 16, bottom: 16 }}
          >
            <Icon name="back" size={28} color="#9395d3" />
          </button>
        ) : null}
        <div className="appbar-title">
          <span className="typo-h1">{editing ? "Edit Task" : "TODO APP"}</span>
        </div>
      </div>
      <main className="todo-main-container">
        {/* Form: Add or Edit */}
        {editing === null ? (
          <form className="todo-form" onSubmit={handleAddTodo}>
            <div className="form-group">
              <label className="form-label typo-body" htmlFor="todo-title">Title</label>
              <input
                type="text"
                className="input-field"
                id="todo-title"
                name="title"
                placeholder="Enter ToDo Title"
                value={form.title}
                onChange={handleChange}
                maxLength={80}
                required
              />
              <span className="input-underline"></span>
            </div>
            <div className="form-group">
              <label className="form-label typo-body" htmlFor="todo-detail">Detail</label>
              <input
                type="text"
                className="input-field"
                id="todo-detail"
                name="detail"
                placeholder="Enter detail"
                value={form.detail}
                onChange={handleChange}
                maxLength={150}
              />
              <span className="input-underline"></span>
            </div>
            <div className="todo-form-buttons">
              <button className="btn-filled" type="submit">Add</button>
            </div>
          </form>
        ) : (
          <form className="todo-form" onSubmit={handleUpdateTodo}>
            <div className="form-group">
              <label className="form-label typo-body" htmlFor="edit-title">Title</label>
              <input
                type="text"
                className="input-field"
                id="edit-title"
                name="title"
                placeholder="Enter ToDo Title"
                value={editForm.title}
                onChange={handleEditChange}
                maxLength={80}
                required
              />
              <span className="input-underline"></span>
            </div>
            <div className="form-group">
              <label className="form-label typo-body" htmlFor="edit-detail">Detail</label>
              <input
                type="text"
                className="input-field"
                id="edit-detail"
                name="detail"
                placeholder="Enter detail"
                value={editForm.detail}
                onChange={handleEditChange}
                maxLength={150}
              />
              <span className="input-underline"></span>
            </div>
            <div className="todo-form-buttons">
              <button className="btn-filled" type="submit">Update</button>
              <button className="btn-outline" type="button" onClick={handleEditCancel}>Cancel</button>
            </div>
          </form>
        )}
        {/* Todo List */}
        <section className="todo-list-section">
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 18 }}>
            Tasks
          </div>
          <div className="todo-list">
            {todos.length === 0 && (
              <div style={{ color: "#8b8787", opacity: 0.7 }}>No todos yet.</div>
            )}
            {todos.map((td) => (
              <div
                className={`todo-item${td.completed ? " completed" : ""}`}
                key={td.id}
              >
                <div className="todo-item-main">
                  <div className="todo-title">{td.title}</div>
                  {td.detail && <div className="todo-detail">{td.detail}</div>}
                </div>
                <div className="todo-item-actions">
                  <button
                    className="action-btn"
                    title={td.completed ? "Mark incomplete" : "Mark complete"}
                    aria-label={td.completed ? "Mark incomplete" : "Mark as complete"}
                    onClick={() => handleToggleComplete(td.id)}
                    type="button"
                  >
                    <Icon name="check" color={td.completed ? "#34c759" : "#9395d3"} />
                  </button>
                  <button
                    className="action-btn"
                    title="Edit"
                    aria-label="Edit"
                    onClick={() => startEdit(td)}
                    type="button"
                  >
                    <Icon name="edit" color="#9395d3" />
                  </button>
                  <button
                    className="action-btn"
                    title="Delete"
                    aria-label="Delete"
                    onClick={() => handleDelete(td.id)}
                    type="button"
                  >
                    <Icon name="delete" color="#ff4343" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
