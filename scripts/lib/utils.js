import fs from 'fs';
import path from 'path';

/**
 * Parse frontmatter from markdown content
 * Returns { frontmatter: object, body: string }
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const [, frontmatterText, body] = match;
  const frontmatter = {};
  
  // Simple YAML parser (handles basic key-value and arrays)
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = null;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Calculate indent level
    const leadingSpaces = line.length - line.trimStart().length;
    const trimmed = line.trim();
    
    // Array item at level 2 (nested under a key)
    if (trimmed.startsWith('- ') && leadingSpaces >= 2) {
      if (currentArray) {
        if (trimmed.startsWith('- name:')) {
          // New object in array
          const obj = {};
          obj.name = trimmed.slice(7).trim();
          currentArray.push(obj);
        }
      }
      continue;
    }
    
    // Property of array object (indented further)
    if (leadingSpaces >= 4 && currentArray && currentArray.length > 0) {
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex > 0) {
        const key = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        const lastObj = currentArray[currentArray.length - 1];
        lastObj[key] = value === 'true' ? true : value === 'false' ? false : value;
      }
      continue;
    }
    
    // Top-level key-value pair
    if (leadingSpaces === 0) {
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex > 0) {
        const key = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        
        if (value) {
          frontmatter[key] = value;
          currentKey = key;
          currentArray = null;
        } else {
          // Start of array
          currentKey = key;
          currentArray = [];
          frontmatter[key] = currentArray;
        }
      }
    }
  }
  
  return { frontmatter, body: body.trim() };
}

/**
 * Recursively read all .md files from a directory
 */
export function readFilesRecursive(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      readFilesRecursive(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Read and parse all source files
 * Supports both:
 * - Single file skills: source/skills/{name}.md
 * - Directory skills: source/skills/{name}/SKILL.md + reference/*.md
 */
export function readSourceFiles(rootDir) {
  const commandsDir = path.join(rootDir, 'source/commands');
  const skillsDir = path.join(rootDir, 'source/skills');

  const commandFiles = readFilesRecursive(commandsDir);

  const commands = commandFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);
    const name = path.basename(filePath, '.md');

    return {
      name: frontmatter.name || name,
      description: frontmatter.description || '',
      args: frontmatter.args || [],
      body,
      filePath
    };
  });

  // Read skills - handling both file and directory formats
  const skills = [];

  if (fs.existsSync(skillsDir)) {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(skillsDir, entry.name);

      if (entry.isDirectory()) {
        // Directory-based skill with potential references
        const skillMdPath = path.join(entryPath, 'SKILL.md');
        if (fs.existsSync(skillMdPath)) {
          const content = fs.readFileSync(skillMdPath, 'utf-8');
          const { frontmatter, body } = parseFrontmatter(content);

          // Read reference files if they exist
          const references = [];
          const referenceDir = path.join(entryPath, 'reference');
          if (fs.existsSync(referenceDir)) {
            const refFiles = fs.readdirSync(referenceDir).filter(f => f.endsWith('.md'));
            for (const refFile of refFiles) {
              const refPath = path.join(referenceDir, refFile);
              const refContent = fs.readFileSync(refPath, 'utf-8');
              references.push({
                name: path.basename(refFile, '.md'),
                content: refContent,
                filePath: refPath
              });
            }
          }

          skills.push({
            name: frontmatter.name || entry.name,
            description: frontmatter.description || '',
            license: frontmatter.license || '',
            body,
            filePath: skillMdPath,
            references
          });
        }
      } else if (entry.name.endsWith('.md')) {
        // Single file skill (legacy format)
        const content = fs.readFileSync(entryPath, 'utf-8');
        const { frontmatter, body } = parseFrontmatter(content);
        const name = path.basename(entry.name, '.md');

        skills.push({
          name: frontmatter.name || name,
          description: frontmatter.description || '',
          license: frontmatter.license || '',
          body,
          filePath: entryPath,
          references: []
        });
      }
    }
  }

  return { commands, skills };
}

/**
 * Ensure directory exists, create if needed
 */
export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Clean directory (remove all contents)
 */
export function cleanDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Write file with automatic directory creation
 */
export function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Read and parse patterns.md
 * Returns { patterns: [...], antipatterns: [...], body: string }
 */
export function readPatterns(rootDir) {
  const filePath = path.join(rootDir, 'source/patterns.md');

  if (!fs.existsSync(filePath)) {
    return { patterns: [], antipatterns: [], body: '' };
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Split frontmatter and body
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { patterns: [], antipatterns: [], body: content };
  }

  const [, frontmatterText, body] = match;

  // Parse both patterns and antipatterns sections
  const patterns = [];
  const antipatterns = [];
  const lines = frontmatterText.split('\n');
  let currentSection = null; // 'patterns' or 'antipatterns'
  let currentCategory = null;
  let inItems = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const indent = line.length - line.trimStart().length;

    // Top-level section declaration
    if (indent === 0 && trimmed === 'patterns:') {
      currentSection = 'patterns';
      currentCategory = null;
      inItems = false;
      continue;
    }
    if (indent === 0 && trimmed === 'antipatterns:') {
      currentSection = 'antipatterns';
      currentCategory = null;
      inItems = false;
      continue;
    }

    // New category starts with "- name:"
    if (trimmed.startsWith('- name:') && currentSection) {
      currentCategory = {
        name: trimmed.slice(7).trim(),
        items: []
      };
      if (currentSection === 'patterns') {
        patterns.push(currentCategory);
      } else {
        antipatterns.push(currentCategory);
      }
      inItems = false;
      continue;
    }

    // Items array declaration
    if (trimmed === 'items:' && currentCategory) {
      inItems = true;
      continue;
    }

    // Item within items array (indented with "- ")
    if (trimmed.startsWith('- ') && inItems && currentCategory && indent >= 6) {
      currentCategory.items.push(trimmed.slice(2).trim());
    }
  }

  return { patterns, antipatterns, body: body.trim() };
}

/**
 * Generate YAML frontmatter string
 */
export function generateYamlFrontmatter(data) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        if (typeof item === 'object') {
          lines.push(`  - name: ${item.name}`);
          if (item.description) lines.push(`    description: ${item.description}`);
          if (item.required !== undefined) lines.push(`    required: ${item.required}`);
        } else {
          lines.push(`  - ${item}`);
        }
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

