import { supabase, type Blog } from './supabase';
import { blogs as staticBlogs } from '../data/blogs';

function loadDemoBlogs(): Blog[] {
  try {
    return JSON.parse(localStorage.getItem('added_blogs') || '[]');
  } catch {
    return [];
  }
}

/** Dedupe by title (later entries win) and sort newest-first by created_at. */
function normalize(list: Blog[]): Blog[] {
  const map = new Map<string, Blog>();
  for (const b of list) {
    map.set(b.title, {
      ...b,
      readTime: b.readTime || (b as { read_time?: string }).read_time || '5 min read',
    });
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.created_at && b.created_at) return b.created_at.localeCompare(a.created_at);
    if (a.created_at) return -1;
    if (b.created_at) return 1;
    return 0;
  });
}

/**
 * Fetches blogs from Supabase (when configured) and merges them with the
 * static seed + any locally-added demo blogs. Falls back gracefully when the
 * backend is unavailable.
 */
export async function fetchBlogs(): Promise<Blog[]> {
  const demo = loadDemoBlogs();

  if (!supabase) {
    return normalize([...staticBlogs, ...demo]);
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return normalize([...staticBlogs, ...demo, ...((data as Blog[]) ?? [])]);
  } catch (err) {
    console.error('Failed to fetch blogs from Supabase, using static data', err);
    return normalize([...staticBlogs, ...demo]);
  }
}
