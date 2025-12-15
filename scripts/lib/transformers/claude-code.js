import path from 'path';
import { cleanDir, ensureDir, writeFile, generateYamlFrontmatter } from '../utils.js';

/**
 * Claude Code Transformer (Full Featured)
 *
 * Keeps full YAML frontmatter with args support.
 * Skills stored in subdirectories with SKILL.md filename.
 * Supports reference files in skill subdirectories.
 */
export function transformClaudeCode(commands, skills, distDir, patterns = null) {
  const claudeDir = path.join(distDir, 'claude-code');
  const commandsDir = path.join(claudeDir, '.claude/commands');
  const skillsDir = path.join(claudeDir, '.claude/skills');

  cleanDir(claudeDir);
  ensureDir(commandsDir);
  ensureDir(skillsDir);

  // Commands: Keep frontmatter + body
  for (const command of commands) {
    const frontmatter = generateYamlFrontmatter({
      name: command.name,
      description: command.description,
      ...(command.args.length > 0 && { args: command.args })
    });

    const content = `${frontmatter}\n\n${command.body}`;
    const outputPath = path.join(commandsDir, `${command.name}.md`);
    writeFile(outputPath, content);
  }

  // Skills: Keep frontmatter + body in subdirectories
  let refCount = 0;
  for (const skill of skills) {
    const skillDir = path.join(skillsDir, skill.name);

    const frontmatter = generateYamlFrontmatter({
      name: skill.name,
      description: skill.description,
      ...(skill.license && { license: skill.license })
    });

    let body = skill.body;

    // Merge patterns body into frontend-design skill (before Domain Reference Files section)
    if (skill.name === 'frontend-design' && patterns && patterns.body) {
      const insertPoint = body.indexOf('---\n\n## Domain Reference Files');
      if (insertPoint > -1) {
        body = body.slice(0, insertPoint) + '\n\n' + patterns.body + '\n\n' + body.slice(insertPoint);
      } else {
        body += '\n\n' + patterns.body;
      }
    }

    const content = `${frontmatter}\n\n${body}`;
    const outputPath = path.join(skillDir, 'SKILL.md');
    writeFile(outputPath, content);

    // Copy reference files if they exist
    if (skill.references && skill.references.length > 0) {
      const refDir = path.join(skillDir, 'reference');
      ensureDir(refDir);
      for (const ref of skill.references) {
        const refOutputPath = path.join(refDir, `${ref.name}.md`);
        writeFile(refOutputPath, ref.content);
        refCount++;
      }
    }
  }

  const refInfo = refCount > 0 ? ` (${refCount} reference files)` : '';
  console.log(`✓ Claude Code: ${commands.length} commands, ${skills.length} skills${refInfo}`);
}

