import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("oslr_ultra_secure_jwt_key_2026");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Helper to fetch projects with Upstash Redis or local JSON fallback
async function getProjects(): Promise<any[]> {
  if (REDIS_URL && REDIS_TOKEN) {
    try {
      const res = await fetch(`${REDIS_URL}/get/projects`, {
        headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          return JSON.parse(data.result);
        }
      }
    } catch (e) {
      console.error("Redis GET projects error, falling back to local file:", e);
    }
  }

  // Local JSON fallback
  const filePath = path.join(process.cwd(), "src/data/projects.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

// Helper to save projects with Upstash Redis or local JSON fallback
async function saveProjects(projects: any[]): Promise<void> {
  if (REDIS_URL && REDIS_TOKEN) {
    try {
      const res = await fetch(REDIS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REDIS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "projects", JSON.stringify(projects)]),
      });
      if (res.ok) {
        return;
      }
      throw new Error(`Upstash returned status ${res.status}`);
    } catch (e) {
      console.error("Redis SET projects error, falling back to local file:", e);
    }
  }

  // Local JSON fallback
  const filePath = path.join(process.cwd(), "src/data/projects.json");
  await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
}

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (e) {
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const token = authHeader.split(" ")[1];
    try { await jwtVerify(token, SECRET_KEY); } catch (err) { return NextResponse.json({ error: "Invalid token" }, { status: 403 }); }

    const newProject = await req.json();
    newProject.id = Date.now().toString();

    const projects = await getProjects();
    projects.push(newProject);
    
    await saveProjects(projects);

    return NextResponse.json({ success: true, project: newProject });
  } catch (e: any) {
    console.error("POST PROJECT ERROR:", e);
    return NextResponse.json({ error: "Failed to save project", details: e?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const token = authHeader.split(" ")[1];
    try { await jwtVerify(token, SECRET_KEY); } catch (err) { return NextResponse.json({ error: "Invalid token" }, { status: 403 }); }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    let projects = await getProjects();
    projects = projects.filter((p: any) => p.id !== id);
    
    await saveProjects(projects);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("DELETE PROJECT ERROR:", e);
    return NextResponse.json({ error: "Failed to delete project", details: e?.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const token = authHeader.split(" ")[1];
    try { await jwtVerify(token, SECRET_KEY); } catch (err) { return NextResponse.json({ error: "Invalid token" }, { status: 403 }); }

    const updatedProject = await req.json();
    if (!updatedProject.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    let projects = await getProjects();
    projects = projects.map((p: any) => p.id === updatedProject.id ? updatedProject : p);
    
    await saveProjects(projects);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("PUT PROJECT ERROR:", e);
    return NextResponse.json({ error: "Failed to update project", details: e?.message }, { status: 500 });
  }
}
