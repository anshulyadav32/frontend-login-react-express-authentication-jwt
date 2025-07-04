// Frontend-Backend Connection Test
// This script tests the connection between frontend and backend

const axios = require('axios');

const BACKEND_URL = 'http://localhost:8080';
const FRONTEND_URL = 'http://localhost:5002';

async function testBackendConnection() {
    console.log('🔍 Testing Backend Connection...');
    console.log('================================');
    
    try {
        // Test backend API directly
        const response = await axios.get(`${BACKEND_URL}/api/test/all`);
        console.log('✅ Backend API Status:', response.status);
        console.log('📦 Backend Response:', response.data);
        console.log('🌐 Backend URL:', BACKEND_URL);
        
        return true;
    } catch (error) {
        console.log('❌ Backend Connection Failed:', error.message);
        return false;
    }
}

async function testFrontendStatus() {
    console.log('\n🔍 Testing Frontend Status...');
    console.log('==============================');
    
    try {
        const response = await axios.get(FRONTEND_URL);
        console.log('✅ Frontend Status:', response.status);
        console.log('🌐 Frontend URL:', FRONTEND_URL);
        return true;
    } catch (error) {
        console.log('❌ Frontend Connection Failed:', error.message);
        return false;
    }
}

async function runTests() {
    console.log('🚀 JWT Authentication Project - Connection Test');
    console.log('===============================================\n');
    
    const backendOk = await testBackendConnection();
    const frontendOk = await testFrontendStatus();
    
    console.log('\n📊 Test Summary:');
    console.log('================');
    console.log('Backend API:', backendOk ? '✅ Running' : '❌ Not Running');
    console.log('Frontend App:', frontendOk ? '✅ Running' : '❌ Not Running');
    
    if (backendOk && frontendOk) {
        console.log('\n🎉 All services are running correctly!');
        console.log('📝 Proxy configuration updated to:', BACKEND_URL);
        console.log('⚠️  Note: Restart React server for proxy changes to take effect');
        console.log('\n🌐 Access your app at:', FRONTEND_URL);
    } else {
        console.log('\n⚠️  Some services are not running. Check the server status.');
    }
}

runTests().catch(console.error);
