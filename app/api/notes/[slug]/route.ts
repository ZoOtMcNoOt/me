import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Ensure directory exists
    const notesDirectory = path.join(process.cwd(), 'content/notes');
    if (!fs.existsSync(notesDirectory)) {
      fs.mkdirSync(notesDirectory, { recursive: true });
    }
    
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    
    // Read and parse file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return NextResponse.json({
      metadata: data,
      content
    });
  } catch (error) {
    console.error(`Error reading note:`, error);
    return NextResponse.json(
      { error: 'Failed to load note' },
      { status: 500 }
    );
  }
}