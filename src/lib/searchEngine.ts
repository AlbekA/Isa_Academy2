import { SourceDocument, SearchResult, SmartAnswer, CourseCategory, SourceType } from '../types';
import { ACADEMY_SOURCES } from '../data/sources';

export interface SearchFilters {
  query: string;
  category?: CourseCategory | 'all';
  type?: SourceType | 'all';
  tag?: string | 'all';
  sortBy?: 'relevance' | 'date' | 'title';
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/ё/g, 'е').trim();
}

function highlightSnippet(text: string, queryWords: string[]): string {
  if (!queryWords.length) return text.slice(0, 160) + '...';
  
  const lowerText = text.toLowerCase();
  let firstIdx = -1;
  let matchedWord = '';

  for (const word of queryWords) {
    const idx = lowerText.indexOf(word);
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
      matchedWord = word;
    }
  }

  let start = 0;
  let end = text.length;

  if (firstIdx !== -1) {
    start = Math.max(0, firstIdx - 60);
    end = Math.min(text.length, firstIdx + matchedWord.length + 120);
  } else {
    end = Math.min(text.length, 160);
  }

  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  // Highlight words
  const escapedWords = queryWords.filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escapedWords.length > 0) {
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    return snippet.replace(regex, '<mark class="bg-amber-400/30 text-amber-200 px-1 py-0.5 rounded font-medium">$1</mark>');
  }

  return snippet;
}

export function searchSources(filters: SearchFilters): SearchResult[] {
  const rawQuery = filters.query.trim();
  const normalizedQuery = normalize(rawQuery);
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 1);

  let pool = ACADEMY_SOURCES;

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    pool = pool.filter(s => s.category === filters.category);
  }

  // Filter by type
  if (filters.type && filters.type !== 'all') {
    pool = pool.filter(s => s.type === filters.type);
  }

  // Filter by tag
  if (filters.tag && filters.tag !== 'all') {
    pool = pool.filter(s => s.tags.some(t => normalize(t) === normalize(filters.tag as string)));
  }

  // If no search query, return list with default sorting
  if (!rawQuery) {
    const results: SearchResult[] = pool.map(source => ({
      source,
      score: source.featured ? 100 : 50,
      matchedFields: ['title'],
      matchedChunks: source.chunks.slice(0, 1).map(c => ({
        chunk: c,
        snippet: c.text.slice(0, 140) + '...',
        highlightedSnippet: c.text.slice(0, 140) + '...',
        relevance: 1
      }))
    }));

    if (filters.sortBy === 'title') {
      return results.sort((a, b) => a.source.title.localeCompare(b.source.title));
    }
    if (filters.sortBy === 'date') {
      return results.sort((a, b) => new Date(b.source.date).getTime() - new Date(a.source.date).getTime());
    }
    return results.sort((a, b) => b.score - a.score);
  }

  // Score sources based on query words
  const scored: SearchResult[] = [];

  for (const source of pool) {
    let score = 0;
    const matchedFields: ('title' | 'description' | 'content' | 'tags' | 'category')[] = [];
    const matchedChunks: SearchResult['matchedChunks'] = [];

    const normTitle = normalize(source.title);
    const normDesc = normalize(source.description);
    const normCategory = normalize(source.category);
    const normTags = source.tags.map(normalize);

    // Exact full query match
    if (normTitle.includes(normalizedQuery)) {
      score += 60;
      matchedFields.push('title');
    }
    if (normDesc.includes(normalizedQuery)) {
      score += 35;
      matchedFields.push('description');
    }
    if (normCategory.includes(normalizedQuery)) {
      score += 25;
      matchedFields.push('category');
    }

    // Word by word matching
    for (const word of queryWords) {
      if (normTitle.includes(word)) {
        score += 20;
        if (!matchedFields.includes('title')) matchedFields.push('title');
      }
      if (normDesc.includes(word)) {
        score += 12;
        if (!matchedFields.includes('description')) matchedFields.push('description');
      }
      if (normCategory.includes(word)) {
        score += 10;
        if (!matchedFields.includes('category')) matchedFields.push('category');
      }
      if (normTags.some(t => t.includes(word))) {
        score += 15;
        if (!matchedFields.includes('tags')) matchedFields.push('tags');
      }
    }

    // Check chunks
    for (const chunk of source.chunks) {
      const normChunk = normalize(chunk.text);
      let chunkRelevance = 0;

      if (normChunk.includes(normalizedQuery)) {
        chunkRelevance += 40;
      }
      for (const word of queryWords) {
        if (normChunk.includes(word)) {
          chunkRelevance += 15;
        }
      }

      if (chunkRelevance > 0) {
        score += chunkRelevance;
        if (!matchedFields.includes('content')) matchedFields.push('content');
        matchedChunks.push({
          chunk,
          snippet: chunk.text.slice(0, 150) + '...',
          highlightedSnippet: highlightSnippet(chunk.text, queryWords),
          relevance: chunkRelevance
        });
      }
    }

    if (score > 0) {
      // Sort matched chunks by chunk relevance
      matchedChunks.sort((a, b) => b.relevance - a.relevance);

      scored.push({
        source,
        score,
        matchedFields,
        matchedChunks: matchedChunks.length > 0 ? matchedChunks : source.chunks.slice(0, 1).map(c => ({
          chunk: c,
          snippet: c.text.slice(0, 140) + '...',
          highlightedSnippet: highlightSnippet(c.text, queryWords),
          relevance: 1
        }))
      });
    }
  }

  // Sort
  if (filters.sortBy === 'title') {
    scored.sort((a, b) => a.source.title.localeCompare(b.source.title));
  } else if (filters.sortBy === 'date') {
    scored.sort((a, b) => new Date(b.source.date).getTime() - new Date(a.source.date).getTime());
  } else {
    scored.sort((a, b) => b.score - a.score);
  }

  return scored;
}

/**
 * Synthesizes a factual, deterministic short answer strictly based on matched sources.
 */
export function generateSmartAnswer(query: string, results: SearchResult[]): SmartAnswer | null {
  if (!query || results.length === 0) return null;

  const topResult = results[0];
  const topChunk = topResult.matchedChunks[0]?.chunk || topResult.source.chunks[0];
  
  if (!topChunk) return null;

  // Synthesize concise summary
  const summary = `${topChunk.title}: ${topChunk.text.slice(0, 220).replace(/\s+/g, ' ').trim()}...`;
  const directQuote = topChunk.text.slice(0, 180).trim();

  const citedSources = results.slice(0, 2).map(r => ({
    sourceId: r.source.id,
    sourceSlug: r.source.slug,
    title: r.source.title,
    category: r.source.category,
    section: r.matchedChunks[0]?.chunk.pageOrSection
  }));

  const confidence = topResult.score >= 50 ? 'high' : topResult.score >= 25 ? 'medium' : 'low';

  return {
    summary,
    directQuote: `«${directQuote}»`,
    citedSources,
    confidence
  };
}
