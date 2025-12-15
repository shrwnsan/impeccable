import path from 'path';
import { cleanDir, ensureDir, writeFile } from '../utils.js';

/**
 * Codex Transformer (Full Featured - Custom Prompts + Modular Skills)
 *
 * Commands: Uses argument-hint format with $VARIABLE placeholders
 * Skills: Creates modular files with guiding AGENTS.md
 * Reference files are inlined into the main skill file for Codex
 */
export function transformCodex(commands, skills, distDir, patterns = null) {
  const codexDir = path.join(distDir, 'codex');
  const promptsDir = path.join(codexDir, '.codex/prompts');

  cleanDir(codexDir);
  ensureDir(promptsDir);

  // Commands: Transform to Codex prompt format
  for (const command of commands) {
    const yamlLines = ['---'];
    yamlLines.push(`description: ${command.description}`);

    // Build argument-hint from args array
    if (command.args && command.args.length > 0) {
      const hints = command.args.map(arg => {
        const hint = arg.required ? `<${arg.name}>` : `[${arg.name.toUpperCase()}=<value>]`;
        return hint;
      });
      yamlLines.push(`argument-hint: ${hints.join(' ')}`);
    }

    yamlLines.push('---');

    // Transform {{argname}} to $ARGNAME for Codex
    let body = command.body;
    body = body.replace(/\{\{([^}]+)\}\}/g, (match, argName) => {
      return `$${argName.toUpperCase()}`;
    });

    const content = `${yamlLines.join('\n')}\n\n${body}`;
    const outputPath = path.join(promptsDir, `${command.name}.md`);
    writeFile(outputPath, content);
  }

  // Skills: Create modular files (with references inlined)
  const skillEntries = [];
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

    const outputPath = path.join(codexDir, `AGENTS.${skill.name}.md`);
    writeFile(outputPath, content);
    skillEntries.push({
      name: skill.name,
      description: skill.description,
      file: `AGENTS.${skill.name}.md`
    });
  }

  // Create main AGENTS.md that guides Codex to the right skill files
  const agentsMd = [
    '# Codex Agent Instructions',
    '',
    'This repository contains specialized skills for different tasks. When the user requests work in a particular domain, read the corresponding skill file for detailed guidance.',
    '',
    '## Available Skills',
    '',
    'Each skill provides deep expertise in its domain. Use the descriptions below to decide which skill file to read:',
    '',
    ...skillEntries.map(skill =>
      `### ${skill.name}\n\n**When to use**: ${skill.description}\n\n**Read**: \`${skill.file}\` for complete instructions.\n`
    ),
    '',
    '## How to Use Skills',
    '',
    '1. Identify the user\'s request domain',
    '2. Match it to a skill description above',
    '3. Read the corresponding skill file',
    '4. Follow the guidance in that file',
    '',
    'Multiple skills can be combined when the task requires expertise from different domains.'
  ].join('\n');

  writeFile(path.join(codexDir, 'AGENTS.md'), agentsMd);

  const refInfo = refCount > 0 ? ` (${refCount} refs inlined)` : '';
  console.log(`✓ Codex: ${commands.length} prompts, ${skills.length} skills (modular)${refInfo}`);
}

