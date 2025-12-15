import { renderCommandDemo } from "../demo-renderer.js";
import { setupCommandDemoToggles } from "../demo-toggles.js";

export function initGlassTerminal() {
    // Initial setup if needed
}

export function renderTerminalLayout(commands) {
    const container = document.querySelector('.commands-gallery');
    if (!container) return;
    
    container.innerHTML = `
        <div class="commands-container">
            <div class="command-manual">
                ${commands.map(cmd => renderManualEntry(cmd)).join('')}
            </div>
            <div class="glass-terminal-wrapper">
                <div class="glass-terminal">
                    <div class="terminal-header">
                        <span class="terminal-dot red"></span>
                        <span class="terminal-dot yellow"></span>
                        <span class="terminal-dot green"></span>
                        <span class="terminal-title">zsh — 80x24</span>
                    </div>
                    <div class="terminal-body" id="terminal-content">
                        <!-- Dynamic Content -->
                        <div class="terminal-line">
                            <span class="terminal-prompt">➜</span>
                            <span>Waiting for input...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupScrollSpy(commands);
    
    // Select first command initially
    if (commands.length > 0) {
        updateTerminal(commands[0], document.getElementById('terminal-content'), commands);
        const firstEntry = document.querySelector('.manual-entry');
        if (firstEntry) firstEntry.classList.add('active');
    }
}

function renderManualEntry(cmd) {
    return `
        <div class="manual-entry" data-id="${cmd.id}" id="cmd-${cmd.id}">
            <h3 class="manual-cmd-name">/${cmd.id}</h3>
            <p class="manual-cmd-desc">${cmd.description}</p>
        </div>
    `;
}

function setupScrollSpy(commands) {
    const entries = document.querySelectorAll('.manual-entry');
    const terminalContent = document.getElementById('terminal-content');
    
    // Intersection Observer for Scroll Spy
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active state
                document.querySelectorAll('.manual-entry').forEach(e => e.classList.remove('active'));
                entry.target.classList.add('active');
                
                // Update terminal
                const cmdId = entry.target.dataset.id;
                const cmd = commands.find(c => c.id === cmdId);
                if (cmd) {
                    updateTerminal(cmd, terminalContent, commands);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "-20% 0px -60% 0px"
    });

    entries.forEach(e => observer.observe(e));
    
    // Click interaction
    entries.forEach(e => {
        e.addEventListener('click', () => {
            e.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

function updateTerminal(cmd, container, allCommands) {
    if (!cmd || !container) return;
    
    // Content update
    const content = `
        <div class="terminal-line">
            <span class="terminal-prompt">➜</span>
            <span>vibe run ${cmd.id}</span>
        </div>
        <div class="terminal-output">
            > Analyzing design context...<br>
            > Applying ${cmd.id} transformation...<br>
            > Done.
        </div>
        <div class="terminal-preview">
            ${renderCommandDemo(cmd.id)}
        </div>
        <div class="terminal-line" style="margin-top: auto;">
            <span class="terminal-prompt">➜</span>
            <span class="terminal-cursor"></span>
        </div>
    `;
    
    container.innerHTML = content;
    
    // Re-bind toggles
    // We pass a no-op for the callback because scrolling handles selection now
    setupCommandDemoToggles(allCommands, () => {}); 
}
