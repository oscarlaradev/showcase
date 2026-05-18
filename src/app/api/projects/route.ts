import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("oslr_ultra_secure_jwt_key_2026");

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/projects.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents));
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

    const filePath = path.join(process.cwd(), "src/data/projects.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const projects = JSON.parse(fileContents);
    
    projects.push(newProject);
    
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

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

    const filePath = path.join(process.cwd(), "src/data/projects.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    let projects = JSON.parse(fileContents);
    
    projects = projects.filter((p: any) => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

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

    const filePath = path.join(process.cwd(), "src/data/projects.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    let projects = JSON.parse(fileContents);
    
    projects = projects.map((p: any) => p.id === updatedProject.id ? updatedProject : p);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("PUT PROJECT ERROR:", e);
    return NextResponse.json({ error: "Failed to update project", details: e?.message }, { status: 500 });
  }
}
