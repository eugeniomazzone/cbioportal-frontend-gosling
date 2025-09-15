const fs = require('fs');
const path = require('path');

const goslingPath = path.join(__dirname, 'node_modules', 'gosling.js');

// Recursively walk directory
function walkDir(dir, callback) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, callback);
        } else if (entry.isFile()) {
            callback(fullPath);
        }
    });
}

// Fix Gosling imports
walkDir(goslingPath, (filePath) => {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace `import { type ... }` with normal `import { ... }`
        const fixed = content.replace(/import\s+\{\s*type\s+([^}]+)\s*\}\s+from/g, 'import { $1 } from');

        if (fixed !== content) {
            fs.writeFileSync(filePath, fixed, 'utf8');
            console.log(`Patched TypeScript import in: ${filePath}`);
        }
    }
});

