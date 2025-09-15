// fix-gosling-imports.js
const fs = require('fs');
const path = require('path');

// Correct Gosling path
const goslingPath = path.join(__dirname, 'node_modules', 'gosling.js');

if (!fs.existsSync(goslingPath)) {
    console.error(`Folder not found: ${goslingPath}`);
    process.exit(1);
}

function walkDir(dir, callback) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, callback);
        } else if (entry.isFile() && fullPath.endsWith('.d.ts')) {
            callback(fullPath);
        }
    });
}

function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = content.replace(/\bimport type\b/g, 'import');
    if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`Fixed: ${filePath}`);
    }
}

// Walk through all Gosling .d.ts files and fix `import type`
walkDir(goslingPath, fixImports);

console.log('Done fixing import type statements in Gosling.');
