const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ScorpiusCore Startup Check\n');

// Check Node version
const nodeVersion = process.version;
const requiredNode = '18.0.0';
console.log(`✓ Node.js version: ${nodeVersion}`);
if (nodeVersion < `v${requiredNode}`) {
  console.error(`❌ Node.js ${requiredNode} or higher is required`);
  process.exit(1);
}

// Check if dependencies are installed
console.log('\n📦 Checking dependencies...');
const packageJson = require('../package.json');
const requiredDeps = [
  'next',
  'react',
  'react-dom',
  'three',
  '@react-three/fiber',
  'gsap',
  'framer-motion',
  'tailwindcss'
];

const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
if (missingDeps.length > 0) {
  console.error(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
  console.log('Run: npm install');
  process.exit(1);
} else {
  console.log('✓ All core dependencies installed');
}

// Check for required directories
console.log('\n📁 Checking project structure...');
const requiredDirs = [
  'src/app',
  'src/components',
  'src/components/3D Core',
  'src/components/UI Sections',
  'src/components/GSAP',
  'src/components/Effects',
  'src/lib',
  'public'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✓ Created ${dir}`);
  } else {
    console.log(`✓ ${dir}`);
  }
});

// Check for environment variables
console.log('\n🔑 Checking environment variables...');
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env.local file found. Creating template...');
  const envTemplate = `# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
`;
  fs.writeFileSync(envPath, envTemplate);
  console.log('✓ Created .env.local template');
} else {
  console.log('✓ .env.local exists');
}

// Check TypeScript configuration
console.log('\n⚙️  Checking TypeScript configuration...');
const tsconfigPath = path.join(__dirname, '..', 'tsconfig.json');
if (!fs.existsSync(tsconfigPath)) {
  console.error('❌ Missing tsconfig.json');
  process.exit(1);
} else {
  console.log('✓ tsconfig.json exists');
}

// Check for build issues
console.log('\n🔨 Running build check...');
try {
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✓ Build successful!');
} catch (error) {
  console.error('❌ Build failed. Please check the errors above.');
  process.exit(1);
}

console.log('\n✅ All checks passed! ScorpiusCore is ready to launch.');
console.log('\nTo start the development server, run:');
console.log('  npm run dev');
console.log('\nTo run tests:');
console.log('  npm test');
console.log('\nTo check performance:');
console.log('  npm run test:performance');
