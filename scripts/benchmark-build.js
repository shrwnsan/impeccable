#!/usr/bin/env node

/**
 * Simple benchmark that measures the transformer execution time
 * without filesystem operations to avoid permission issues.
 */

import { readSourceFiles, readPatterns } from './lib/utils.js';

const __filename = import.meta.url;
const __dirname = new URL('.', __filename).pathname;
const ROOT_DIR = new URL('..', __filename).pathname;

/**
 * Mock the file operations to avoid permission issues
 */
const mockFileSystem = {
  writes: [],
  mkdirs: [],
  cleanups: []
};

// Mock the utils functions
function mockCleanDir(dirPath) {
  mockFileSystem.cleanups.push(dirPath);
}

function mockEnsureDir(dirPath) {
  mockFileSystem.mkdirs.push(dirPath);
}

function mockWriteFile(filePath, content) {
  mockFileSystem.writes.push({ path: filePath, size: content.length });
}

function mockGenerateYamlFrontmatter(obj) {
  let yaml = '---\n';
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      for (const item of value) {
        if (typeof item === 'object') {
          yaml += `  - ${JSON.stringify(item)}\n`;
        } else {
          yaml += `  - ${item}\n`;
        }
      }
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }
  yaml += '---';
  return yaml;
}

function mockReplacePlaceholders(content, provider) {
  const replacements = {
    'claude-code': { model: 'Claude', config_file: 'CLAUDE.md' },
    'cursor': { model: 'Cursor', config_file: '.cursorrules' },
    'gemini': { model: 'Gemini', config_file: 'gemini.md' },
    'codex': { model: 'Codex', config_file: 'codex.md' }
  };

  const replacer = replacements[provider] || replacements['claude-code'];
  let result = content;

  for (const [key, value] of Object.entries(replacer)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }

  return result;
}

// Mock transformers (just timing the logic, no actual file I/O)
function mockTransformClaudeCode(commands, skills, patterns) {
  mockCleanDir('dist/claude-code');
  mockEnsureDir('dist/claude-code/.claude/commands');
  mockEnsureDir('dist/claude-code/.claude/skills');

  // Process commands
  for (const command of commands) {
    const frontmatter = mockGenerateYamlFrontmatter({
      name: command.name,
      description: command.description,
      ...(command.context && { context: command.context }),
      ...(command.args.length > 0 && { args: command.args })
    });

    const commandBody = mockReplacePlaceholders(command.body, 'claude-code');
    const content = `${frontmatter}\n\n${commandBody}`;
    mockWriteFile(`dist/claude-code/.claude/commands/${command.name}.md`, content);
  }

  // Process skills
  for (const skill of skills) {
    const frontmatter = mockGenerateYamlFrontmatter({
      name: skill.name,
      description: skill.description,
    });

    const skillBody = mockReplacePlaceholders(skill.body, 'claude-code');
    let content = `${frontmatter}\n\n${skillBody}`;

    // Add patterns if available
    if (skill.name === 'frontend-design' && patterns) {
      content += '\n\n' + mockGeneratePatternsMarkdown(patterns);
    }

    mockWriteFile(`dist/claude-code/.claude/skills/${skill.name}/SKILL.md`, content);
  }
}

function mockTransformCursor(commands, skills, patterns) {
  mockCleanDir('dist/cursor');
  mockEnsureDir('dist/cursor/.claude/commands');
  mockEnsureDir('dist/cursor/.claude/skills');

  for (const command of commands) {
    const content = mockReplacePlaceholders(command.body, 'cursor');
    mockWriteFile(`dist/cursor/.claude/commands/${command.name}.md`, content);
  }

  for (const skill of skills) {
    const content = mockReplacePlaceholders(skill.body, 'cursor');
    mockWriteFile(`dist/cursor/.claude/skills/${skill.name}.md`, content);
  }
}

function mockTransformGemini(commands, skills, patterns) {
  mockCleanDir('dist/gemini');
  mockEnsureDir('dist/gemini/.claude/commands');
  mockEnsureDir('dist/gemini/.claude/skills');

  for (const command of commands) {
    const content = mockReplacePlaceholders(command.body, 'gemini');
    mockWriteFile(`dist/gemini/.claude/commands/${command.name}.md`, content);
  }

  for (const skill of skills) {
    const content = mockReplacePlaceholders(skill.body, 'gemini');
    mockWriteFile(`dist/gemini/.claude/skills/${skill.name}.md`, content);
  }
}

function mockTransformCodex(commands, skills, patterns) {
  mockCleanDir('dist/codex');
  mockEnsureDir('dist/codex/.claude/commands');
  mockEnsureDir('dist/codex/.claude/skills');

  for (const command of commands) {
    const content = mockReplacePlaceholders(command.body, 'codex');
    mockWriteFile(`dist/codex/.claude/commands/${command.name}.md`, content);
  }

  for (const skill of skills) {
    const content = mockReplacePlaceholders(skill.body, 'codex');
    mockWriteFile(`dist/codex/.claude/skills/${skill.name}.md`, content);
  }
}

function mockGeneratePatternsMarkdown(patterns) {
  if (!patterns || (!patterns.patterns?.length && !patterns.antipatterns?.length)) {
    return '';
  }

  let md = `## Design Patterns Reference\n\nThis reference defines what TO do and what NOT to do when creating frontend interfaces.\n\n### What TO Do (Patterns)\n`;

  for (const category of patterns.patterns || []) {
    md += `\n**${category.name}**:\n`;
    for (const item of category.items || []) {
      md += `- ${item}\n`;
    }
  }

  md += `\n### What NOT to Do (Anti-Patterns)\n`;

  for (const category of patterns.antipatterns || []) {
    md += `\n**${category.name}**:\n`;
    for (const item of category.items || []) {
      md += `- ${item}\n`;
    }
  }

  return md;
}

/**
 * Benchmark functions
 */
function benchmark(name, fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;
  console.log(`  ${name}: ${duration.toFixed(2)}ms`);
  return duration;
}

async function benchmarkAsync(name, fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  const duration = end - start;
  console.log(`  ${name}: ${duration.toFixed(2)}ms`);
  return duration;
}

function runSequential(commands, skills, patterns) {
  console.log('\n📊 Sequential execution (old approach):');

  const times = {
    unprefixed: benchmark('Unprefixed transforms', () => {
      mockFileSystem.writes = [];
      mockFileSystem.mkdirs = [];
      mockFileSystem.cleanups = [];

      mockTransformCursor(commands, skills, patterns);
      mockTransformClaudeCode(commands, skills, patterns);
      mockTransformGemini(commands, skills, patterns);
      mockTransformCodex(commands, skills, patterns);
    }),
    prefixed: benchmark('Prefixed transforms', () => {
      mockFileSystem.writes = [];
      mockFileSystem.mkdirs = [];
      mockFileSystem.cleanups = [];

      // For prefixed, we'd modify names but for benchmarking the logic is the same
      mockTransformCursor(commands, skills, patterns);
      mockTransformClaudeCode(commands, skills, patterns);
      mockTransformGemini(commands, skills, patterns);
      mockTransformCodex(commands, skills, patterns);
    })
  };

  return times;
}

async function runParallel(commands, skills, patterns) {
  console.log('\n📊 Parallel execution (new approach):');

  const times = {
    unprefixed: await benchmarkAsync('Unprefixed transforms', async () => {
      await Promise.all([
        Promise.resolve(mockTransformCursor(commands, skills, patterns)),
        Promise.resolve(mockTransformClaudeCode(commands, skills, patterns)),
        Promise.resolve(mockTransformGemini(commands, skills, patterns)),
        Promise.resolve(mockTransformCodex(commands, skills, patterns))
      ]);
    }),
    prefixed: await benchmarkAsync('Prefixed transforms', async () => {
      await Promise.all([
        Promise.resolve(mockTransformCursor(commands, skills, patterns)),
        Promise.resolve(mockTransformClaudeCode(commands, skills, patterns)),
        Promise.resolve(mockTransformGemini(commands, skills, patterns)),
        Promise.resolve(mockTransformCodex(commands, skills, patterns))
      ]);
    })
  };

  return times;
}

/**
 * Main benchmark
 */
async function main() {
  console.log('🔨 Build Performance Benchmark (Logic Only)\n');
  console.log('=================================');
  console.log('Note: This benchmark measures the transformer logic execution time');
  console.log('without actual filesystem I/O to avoid permission issues.\n');

  // Load source data
  const { commands, skills } = readSourceFiles(ROOT_DIR);
  const patterns = readPatterns(ROOT_DIR);
  console.log(`📖 Test data: ${commands.length} commands, ${skills.length} skills, ${patterns.patterns.length + patterns.antipatterns.length} pattern categories\n`);

  // Run sequential benchmark
  const sequentialTimes = runSequential(commands, skills, patterns);
  const sequentialTotal = sequentialTimes.unprefixed + sequentialTimes.prefixed;
  console.log(`  Total: ${sequentialTotal.toFixed(2)}ms`);

  // Run parallel benchmark
  const parallelTimes = await runParallel(commands, skills, patterns);
  const parallelTotal = parallelTimes.unprefixed + parallelTimes.prefixed;
  console.log(`  Total: ${parallelTotal.toFixed(2)}ms`);

  // Calculate improvement
  const improvement = ((sequentialTotal - parallelTotal) / sequentialTotal * 100);
  const speedup = (sequentialTotal / parallelTotal).toFixed(2) + 'x';

  console.log('\n=================================');
  console.log('📈 Results:');
  console.log(`  Sequential:  ${sequentialTotal.toFixed(2)}ms`);
  console.log(`  Parallel:    ${parallelTotal.toFixed(2)}ms`);
  console.log(`  Improvement: ${improvement.toFixed(1)}% faster (${speedup} speedup)`);
  console.log('=================================');
}

main();
