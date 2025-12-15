import path from 'path';
import { cleanDir, ensureDir, writeFile } from '../utils.js';

/**
 * Cursor Transformer (Downgraded - No Frontmatter/Args)
 *
 * Strips all frontmatter and metadata, outputs body only.
 * Cursor doesn't support arguments or frontmatter.
 * Reference files are inlined into the main skill file.
 */
export function transformCursor(commands, skills, distDir, patterns = null) {
  const cursorDir = path.join(distDir, 'cursor');
  const commandsDir = path.join(cursorDir, '.cursor/commands');
  const rulesDir = path.join(cursorDir, '.cursor/rules');

  cleanDir(cursorDir);
  ensureDir(commandsDir);
  ensureDir(rulesDir);

  // Commands: Body only (no frontmatter)
  for (const command of commands) {
    const outputPath = path.join(commandsDir, `${command.name}.md`);
    writeFile(outputPath, command.body);
  }

  // Skills: Body only (with references inlined)
  let refCount = 0;
  for (const skill of skills) {
    let content = skill.body;

    // Merge patterns body into frontend-design skill (before Domain Reference Files section)
    if (skill.name === 'frontend-design' && patterns && patterns.body) {
      const insertPoint = content.indexOf('---\n\n## Domain Reference Files');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + '\n\n' + patterns.body + '\n\n' + content.slice(insertPoint);
      } else {
        content += '\n\n' + patterns.body;
      }
    }

    // Inline reference files if they exist
    if (skill.references && skill.references.length > 0) {
      const refSections = skill.references.map(ref => {
        refCount++;
        return `\n\n---\n\n## Reference: ${ref.name}\n\n${ref.content}`;
      });
      content += refSections.join('');
    }

    const outputPath = path.join(rulesDir, `${skill.name}.md`);
    writeFile(outputPath, content);
  }

  const refInfo = refCount > 0 ? ` (${refCount} refs inlined)` : '';
  console.log(`✓ Cursor: ${commands.length} commands, ${skills.length} skills (downgraded)${refInfo}`);
}

