import path from 'path';
import { cleanDir, ensureDir, writeFile, generateYamlFrontmatter, replacePlaceholders } from '../utils.js';

/**
 * Cursor Transformer (Agent Skills Standard)
 *
 * Commands: Body only in .cursor/commands/ (Cursor doesn't support command frontmatter)
 * Skills: Agent Skills standard with SKILL.md in .cursor/skills/{name}/
 * Reference files are copied to skill subdirectories
 *
 * Note: Agent Skills in Cursor require nightly channel and are agent-decided rules.
 *
 * @param {Object} options - Optional settings
 * @param {string} options.prefix - Prefix to add to command names (e.g., 'i-')
 * @param {string} options.outputSuffix - Suffix for output directory (e.g., '-prefixed')
 */
export function transformCursor(commands, skills, distDir, patterns = null, options = {}) {
  const { prefix = '', outputSuffix = '' } = options;
  const cursorDir = path.join(distDir, `cursor${outputSuffix}`);
  const commandsDir = path.join(cursorDir, '.cursor/commands');
  const skillsDir = path.join(cursorDir, '.cursor/skills');

  cleanDir(cursorDir);
  ensureDir(commandsDir);
  ensureDir(skillsDir);

  // Commands: Body only (Cursor doesn't support command frontmatter/args)
  for (const command of commands) {
    const commandName = `${prefix}${command.name}`;
    const commandBody = replacePlaceholders(command.body, 'cursor');
    const outputPath = path.join(commandsDir, `${commandName}.md`);
    writeFile(outputPath, commandBody);
  }

  // Skills: Agent Skills standard with SKILL.md in subdirectories
  let refCount = 0;
  for (const skill of skills) {
    const skillDir = path.join(skillsDir, skill.name);

    const frontmatter = generateYamlFrontmatter({
      name: skill.name,
      description: skill.description,
      ...(skill.license && { license: skill.license })
    });

    const skillBody = replacePlaceholders(skill.body, 'cursor');
    const content = `${frontmatter}\n\n${skillBody}`;
    const outputPath = path.join(skillDir, 'SKILL.md');
    writeFile(outputPath, content);

    // Copy reference files if they exist
    if (skill.references && skill.references.length > 0) {
      const refDir = path.join(skillDir, 'reference');
      ensureDir(refDir);
      for (const ref of skill.references) {
        const refOutputPath = path.join(refDir, `${ref.name}.md`);
        const refContent = replacePlaceholders(ref.content, 'cursor');
        writeFile(refOutputPath, refContent);
        refCount++;
      }
    }
  }

  const refInfo = refCount > 0 ? ` (${refCount} reference files)` : '';
  const prefixInfo = prefix ? ` [${prefix}prefixed]` : '';
  console.log(`✓ Cursor${prefixInfo}: ${commands.length} commands, ${skills.length} skills${refInfo}`);
}
