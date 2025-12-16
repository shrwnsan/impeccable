#!/usr/bin/env node

/**
 * Build System for Cross-Provider Design Skills & Commands
 *
 * Transforms feature-rich source files into provider-specific formats:
 * - Cursor: Downgraded (no frontmatter/args)
 * - Claude Code: Full featured (frontmatter + body)
 * - Gemini: Full featured (TOML + modular skills)
 * - Codex: Full featured (custom prompts + modular skills)
 *
 * Also builds Tailwind CSS for production deployment.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { readSourceFiles, readPatterns } from './lib/utils.js';
import {
  transformCursor,
  transformClaudeCode,
  transformGemini,
  transformCodex
} from './lib/transformers/index.js';
import { createAllZips } from './lib/zip.js';
import { execSync } from 'child_process';

/**
 * Copy directory recursively
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

/**
 * Build static site using Bun's HTML bundler
 * Automatically bundles JS, CSS (with Tailwind), and assets
 */
async function buildStaticSite() {
  const entrypoint = path.join(ROOT_DIR, 'public', 'index.html');
  const outdir = path.join(ROOT_DIR, 'build');

  console.log('🌐 Building static site with Bun...');

  try {
    const result = await Bun.build({
      entrypoints: [entrypoint],
      outdir: outdir,
      minify: true,
      sourcemap: 'linked',
      // Tailwind is handled automatically via bun-plugin-tailwind
      // when using <link rel="stylesheet" href="tailwindcss" />
    });

    if (!result.success) {
      console.error('Build failed:');
      for (const log of result.logs) {
        console.error(log);
      }
      process.exit(1);
    }

    // Calculate total size
    const totalSize = result.outputs.reduce((sum, o) => sum + o.size, 0);
    const jsFiles = result.outputs.filter(o => o.path.endsWith('.js'));
    const cssFiles = result.outputs.filter(o => o.path.endsWith('.css'));

    console.log(`✓ Static site built to ./build/`);
    console.log(`  HTML: 1 file`);
    console.log(`  JS: ${jsFiles.length} file(s) (${(jsFiles.reduce((s, f) => s + f.size, 0) / 1024).toFixed(1)} KB)`);
    console.log(`  CSS: ${cssFiles.length} file(s) (${(cssFiles.reduce((s, f) => s + f.size, 0) / 1024).toFixed(1)} KB)`);
    console.log(`  Total: ${(totalSize / 1024).toFixed(1)} KB\n`);

    return result;
  } catch (error) {
    console.error('Failed to build static site:', error.message);
    process.exit(1);
  }
}

/**
 * Main build process
 */
async function build() {
  console.log('🔨 Building cross-provider design plugins...\n');

  // Build static site (HTML, JS, CSS with Tailwind)
  await buildStaticSite();

  // Read source files
  const { commands, skills } = readSourceFiles(ROOT_DIR);
  const patterns = readPatterns(ROOT_DIR);
  console.log(`📖 Read ${commands.length} commands, ${skills.length} skills, and ${patterns.patterns.length + patterns.antipatterns.length} pattern categories\n`);

  // Transform for each provider
  transformCursor(commands, skills, DIST_DIR, patterns);
  transformClaudeCode(commands, skills, DIST_DIR, patterns);
  transformGemini(commands, skills, DIST_DIR, patterns);
  transformCodex(commands, skills, DIST_DIR, patterns);
  
  // Create ZIP bundles
  await createAllZips(DIST_DIR);

  // Copy Claude Code output to project's .claude directory for local development
  const claudeCodeSrc = path.join(DIST_DIR, 'claude-code', '.claude');
  const claudeCodeDest = path.join(ROOT_DIR, '.claude');

  // Copy commands and skills directories (preserves other files like settings.local.json)
  const commandsSrc = path.join(claudeCodeSrc, 'commands');
  const skillsSrc = path.join(claudeCodeSrc, 'skills');
  const commandsDest = path.join(claudeCodeDest, 'commands');
  const skillsDest = path.join(claudeCodeDest, 'skills');

  // Remove existing and copy fresh
  if (fs.existsSync(commandsDest)) fs.rmSync(commandsDest, { recursive: true });
  if (fs.existsSync(skillsDest)) fs.rmSync(skillsDest, { recursive: true });

  copyDirSync(commandsSrc, commandsDest);
  copyDirSync(skillsSrc, skillsDest);

  console.log(`📋 Synced to .claude/: commands + skills`);

  console.log('\n✨ Build complete!');
}

// Run the build
build();
