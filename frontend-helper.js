/**
 * Frontend Development Helper
 * 
 * Complete frontend development setup and testing utility
 * Run with: node frontend-helper.js [command]
 */

const { exec, spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8080';
const FRONTEND_PORT = '5002';

const commands = {
  status: async () => {
    console.log('🔍 Frontend & Backend Status Check');
    console.log('==================================\n');
    
    // Check frontend configuration
    console.log('📁 Frontend Configuration:');
    console.log(`   Port: ${FRONTEND_PORT}`);
    console.log(`   API URL: ${API_URL}`);
    
    // Check if backend is running
    console.log('\n🔧 Backend Status:');
    try {
      const response = await axios.get(API_URL, { timeout: 3000 });
      console.log('   ✅ Backend server is RUNNING');
      console.log(`   📋 Response: ${response.data.message}`);
    } catch (error) {
      console.log('   ❌ Backend server is NOT RUNNING');
      console.log('   💡 Backend needs to be started first');
      console.log('   🚀 Start backend with: cd ../backend && npm start');
    }

    // Check frontend dependencies
    console.log('\n📦 Frontend Dependencies:');
    if (fs.existsSync('node_modules')) {
      console.log('   ✅ Dependencies are installed');
    } else {
      console.log('   ❌ Dependencies not installed');
      console.log('   💡 Run: npm install');
    }

    // Check key files
    console.log('\n📄 Key Files Check:');
    const keyFiles = [
      'package.json',
      'src/App.js',
      'src/components/Login.js',
      'src/services/auth.service.js',
      '.env'
    ];

    keyFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ❌ ${file} - missing`);
      }
    });
  },

  test: async () => {
    console.log('🧪 Frontend Integration Test');
    console.log('============================\n');
    
    // Test API connection
    console.log('🔗 Testing API Connection...');
    try {
      await axios.get(API_URL + '/api/test/all');
      console.log('✅ Public API endpoint working');
      
      // Test authentication endpoints
      try {
        await axios.post(API_URL + '/api/auth/signin', {});
      } catch (authError) {
        if (authError.response && authError.response.status === 400) {
          console.log('✅ Authentication endpoints working');
        }
      }
      
      console.log('🎉 Frontend is ready to connect to backend!');
      
    } catch (error) {
      console.log('❌ API connection failed');
      console.log('💡 Make sure backend is running: cd ../backend && npm start');
    }
  },

  dev: () => {
    console.log('🚀 Starting Frontend Development Server...\n');
    console.log('This will:');
    console.log('1. Start React development server on port 5002');
    console.log('2. Open browser automatically');
    console.log('3. Enable hot reloading for development');
    console.log('\n⚠️  Make sure backend is running first!\n');
    
    const reactServer = spawn('npm', ['start'], {
      stdio: 'inherit',
      shell: true
    });

    reactServer.on('close', (code) => {
      console.log(`Frontend server exited with code ${code}`);
    });

    process.on('SIGINT', () => {
      console.log('\n👋 Stopping frontend server...');
      reactServer.kill();
      process.exit();
    });
  },

  build: () => {
    console.log('🏗️  Building Frontend for Production...\n');
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Build failed: ${error.message}`);
        return;
      }
      console.log(stdout);
      console.log('✅ Frontend build completed!');
      console.log('📁 Build files are in the ./build directory');
    });
  },

  components: () => {
    console.log('🧩 Frontend Components Overview');
    console.log('===============================\n');
    
    const componentsDir = 'src/components';
    if (fs.existsSync(componentsDir)) {
      const components = fs.readdirSync(componentsDir)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));

      console.log('📋 Available Components:');
      components.forEach(component => {
        console.log(`   • ${component}`);
      });

      console.log('\n🔗 Component Functions:');
      console.log('   • Home - Landing page');
      console.log('   • Login - User authentication');
      console.log('   • Register - User registration');
      console.log('   • Profile - User profile management');
      console.log('   • BoardUser - User dashboard');
      console.log('   • BoardAdmin - Admin dashboard');
      console.log('   • Navbar - Navigation component');
    } else {
      console.log('❌ Components directory not found');
    }
  },

  help: () => {
    console.log('🛠️  Frontend Development Helper Commands:\n');
    console.log('   node frontend-helper.js status      - Check frontend & backend status');
    console.log('   node frontend-helper.js test        - Test API connectivity');
    console.log('   node frontend-helper.js dev         - Start development server');
    console.log('   node frontend-helper.js build       - Build for production');
    console.log('   node frontend-helper.js components  - View components overview');
    console.log('   node frontend-helper.js help        - Show this help');
    console.log('');
    console.log('🚀 Quick Commands:');
    console.log('   npm start                           - Start development server');
    console.log('   npm run build                       - Build for production');
    console.log('   npm test                            - Run tests');
    console.log('');
    console.log('🔗 URLs:');
    console.log('   Frontend: http://localhost:5002');
    console.log('   Backend API: http://localhost:8080');
  }
};

// Parse command line arguments
const command = process.argv[2] || 'help';

if (commands[command]) {
  commands[command]();
} else {
  console.log(`❌ Unknown command: ${command}`);
  console.log('Run "node frontend-helper.js help" for available commands');
}
