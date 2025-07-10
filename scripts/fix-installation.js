const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing ScorpiusCore Installation\n');

// Function to remove directory recursively
function removeDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✓ Removed ${dirPath}`);
    }
  } catch (error) {
    console.error(`⚠️  Could not remove ${dirPath}: ${error.message}`);
  }
}

// Function to run command safely
function runCommand(command, description) {
  try {
    console.log(`\n${description}...`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return false;
  }
}

console.log('Step 1: Cleaning up corrupted node_modules');
removeDir(path.join(__dirname, '..', 'node_modules'));
removeDir(path.join(__dirname, '..', '.next'));

console.log('\nStep 2: Removing package-lock.json');
const lockFile = path.join(__dirname, '..', 'package-lock.json');
if (fs.existsSync(lockFile)) {
  fs.unlinkSync(lockFile);
  console.log('✓ Removed package-lock.json');
}

console.log('\nStep 3: Clearing npm cache');
runCommand('npm cache clean --force', 'Clearing npm cache');

console.log('\nStep 4: Installing dependencies with legacy peer deps');
if (!runCommand('npm install --legacy-peer-deps', 'Installing dependencies')) {
  console.log('\nTrying with --force flag...');
  runCommand('npm install --force', 'Force installing dependencies');
}

console.log('\n✅ Installation fix complete!');
console.log('\nNext steps:');
console.log('1. Run: npm run dev');
console.log('2. Open: http://localhost:3000');
