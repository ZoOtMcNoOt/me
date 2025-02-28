import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const notesDirectory = path.join(process.cwd(), 'content/notes');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(notesDirectory)) {
      fs.mkdirSync(notesDirectory, { recursive: true });
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(notesDirectory);
    
    if (!fileNames || fileNames.length === 0) {
      console.log('No files found in notes directory');
      return NextResponse.json([]);
    }
    
    const allNotesData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');
        
        // Read markdown file
        const fullPath = path.join(notesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the metadata section
        try {
          const { data } = matter(fileContents);
          
          // Combine the data with the slug
          return {
            slug,
            ...data
          };
        } catch (error) {
          console.error(`Error parsing markdown for ${fileName}:`, error);
          return {
            slug,
            title: slug,
            excerpt: 'Error loading note content',
            date: new Date().toISOString(),
            tags: []
          };
        }
      });
    
    // Sort notes by date (newest first)
    return NextResponse.json(
      allNotesData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  } catch (error) {
    console.error('Error in GET /api/notes:', error);
    return NextResponse.json({ error: 'Failed to load notes' }, { status: 500 });
  }
}