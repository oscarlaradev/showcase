"use client";
import { useState, useEffect } from "react";

type Project = { id?: string; title: string; role: string; image: string; url: string };

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  useEffect(() => {
    if (token) fetchProjects();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setMessage("");
    } else {
      setMessage("Acceso Denegado");
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, title, role, image, url } : { title, role, image, url };
    
    const res = await fetch("/api/projects", {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    
    if (res.ok) {
      setMessage(editingId ? "Proyecto actualizado." : "Proyecto añadido.");
      setTitle(""); setRole(""); setImage(""); setUrl(""); setEditingId(null);
      fetchProjects();
    } else {
      setMessage("Error al guardar el proyecto.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto de la realidad?")) return;
    const res = await fetch(`/api/projects?id=${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) fetchProjects();
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id!);
    setTitle(p.title);
    setRole(p.role);
    setImage(p.image);
    setUrl(p.url || "");
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle(""); setRole(""); setImage(""); setUrl("");
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void text-white font-mono p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm p-8 border border-white/10 bg-white/5 rounded">
          <h1 className="text-2xl font-display font-bold mb-6 text-center tracking-tighter">OSLR.SYS // LOGIN</h1>
          <input type="password" placeholder="Contraseña Maestra" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-white/20 rounded focus:border-white outline-none" />
          <button type="submit" className="w-full p-3 bg-white text-black font-bold uppercase rounded hover:bg-gray-200">Iniciar Protocolo</button>
          {message && <p className="mt-4 text-red-500 text-center text-sm">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white font-mono p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <form onSubmit={handleSaveProject} className="w-full p-8 border border-white/10 bg-white/5 rounded sticky top-8">
          <h1 className="text-2xl font-display font-bold mb-6 tracking-tighter">{editingId ? "MODIFICAR MATRIZ" : "SUBIR AL VACÍO"}</h1>
          <input type="text" placeholder="Título (ej. NEON)" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-white/20 rounded focus:border-white outline-none" />
          <input type="text" placeholder="Rol (ej. UI/UX)" required value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-white/20 rounded focus:border-white outline-none" />
          <input type="text" placeholder="URL de Imagen (ej. /assets/neon.png)" required value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-white/20 rounded focus:border-white outline-none" />
          <input type="text" placeholder="URL Externa (ej. https://...)" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-white/20 rounded focus:border-white outline-none" />
          
          <div className="flex gap-4">
            <button type="submit" className="w-full p-3 bg-white text-black font-bold uppercase rounded hover:bg-gray-200">
              {editingId ? "Actualizar" : "Inyectar Datos"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="w-full p-3 bg-red-900 text-white font-bold uppercase rounded hover:bg-red-800">
                Cancelar
              </button>
            )}
          </div>
          {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-display font-bold mb-2 tracking-tighter">PROYECTOS ACTIVOS</h2>
        {projects.map(p => (
          <div key={p.id} className="p-4 border border-white/10 bg-black rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="px-3 py-1 border border-white/20 text-xs hover:bg-white hover:text-black">EDITAR</button>
              <button onClick={() => handleDelete(p.id!)} className="px-3 py-1 border border-red-500 text-red-500 text-xs hover:bg-red-500 hover:text-white">BORRAR</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-500">No hay proyectos.</p>}
      </div>
    </div>
  );
}
