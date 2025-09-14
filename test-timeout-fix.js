#!/usr/bin/env node

/**
 * 测试超时修复的脚本
 * 用于验证 aipex-website AI API 的超时问题是否已解决
 */

const https = require('https');
const http = require('http');

// 测试配置
const TEST_CONFIG = {
  local: {
    baseUrl: 'http://localhost:3000',
    apiEndpoint: '/api/ai/chat'
  },
  production: {
    baseUrl: 'https://www.claudechrome.com',
    apiEndpoint: '/api/ai/chat'
  }
};

// 测试用的 JWT token (需要替换为真实的 token)
const TEST_TOKEN = 'your-test-jwt-token-here';

// 测试消息 - 设计为可能需要较长时间处理的请求
const TEST_MESSAGES = [
  {
    role: 'system',
    content: 'You are a helpful assistant. Please provide detailed and comprehensive responses.'
  },
  {
    role: 'user',
    content: 'Please write a detailed analysis of the current state of artificial intelligence, including its applications, challenges, and future prospects. Make sure to cover multiple domains like healthcare, finance, education, and technology. Include specific examples and case studies where possible.'
  }
];

/**
 * 发送请求并测量响应时间
 */
async function testTimeoutFix(environment = 'local') {
  const config = TEST_CONFIG[environment];
  const url = `${config.baseUrl}${config.apiEndpoint}`;
  
  console.log(`\n⏱️  Testing timeout fix for ${environment} environment...`);
  console.log(`📍 URL: ${url}`);
  
  const requestData = {
    messages: TEST_MESSAGES,
    model: 'deepseek-chat',
    stream: false // 非流式响应便于测试超时
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TEST_TOKEN}`
    }
  };
  
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      const responseTime = Date.now() - startTime;
      
      console.log(`📥 Response received in ${responseTime}ms`);
      console.log(`Status: ${res.statusCode}`);
      console.log('Headers:', res.headers);
      
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          console.log('✅ Response parsed successfully');
          
          // 检查响应中的元数据
          if (parsed._metadata) {
            console.log('📊 Response metadata:', parsed._metadata);
          }
          
          resolve({
            success: true,
            responseTime,
            statusCode: res.statusCode,
            data: parsed
          });
        } catch (parseError) {
          console.log('⚠️  Response is not JSON:', responseData.substring(0, 200));
          resolve({
            success: false,
            responseTime,
            statusCode: res.statusCode,
            rawData: responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      console.error(`❌ Request failed after ${responseTime}ms:`, error.message);
      reject({
        success: false,
        responseTime,
        error: error.message
      });
    });
    
    // 设置请求超时
    req.setTimeout(60000, () => {
      const responseTime = Date.now() - startTime;
      console.error(`⏰ Request timed out after ${responseTime}ms`);
      req.destroy();
      reject({
        success: false,
        responseTime,
        error: 'Request timeout'
      });
    });
    
    // 发送请求
    console.log('📤 Sending request...');
    console.log('Request data:', JSON.stringify(requestData, null, 2));
    
    req.write(JSON.stringify(requestData));
    req.end();
  });
}

/**
 * 测试流式响应的超时处理
 */
async function testStreamingTimeoutFix(environment = 'local') {
  const config = TEST_CONFIG[environment];
  const url = `${config.baseUrl}${config.apiEndpoint}`;
  
  console.log(`\n🌊 Testing streaming timeout fix for ${environment} environment...`);
  
  const requestData = {
    messages: TEST_MESSAGES,
    model: 'deepseek-chat',
    stream: true
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TEST_TOKEN}`
    }
  };
  
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      const responseTime = Date.now() - startTime;
      
      console.log(`📥 Streaming response started in ${responseTime}ms`);
      console.log(`Status: ${res.statusCode}`);
      console.log('Content-Type:', res.headers['content-type']);
      
      if (res.statusCode !== 200) {
        let errorData = '';
        res.on('data', (chunk) => {
          errorData += chunk;
        });
        res.on('end', () => {
          console.error('❌ Error response:', errorData);
          reject({
            success: false,
            responseTime,
            statusCode: res.statusCode,
            error: errorData
          });
        });
        return;
      }
      
      let chunkCount = 0;
      let totalContent = '';
      let firstChunkTime = null;
      
      res.on('data', (chunk) => {
        if (!firstChunkTime) {
          firstChunkTime = Date.now() - startTime;
          console.log(`📦 First chunk received in ${firstChunkTime}ms`);
        }
        
        chunkCount++;
        const chunkStr = chunk.toString();
        totalContent += chunkStr;
        
        // 解析 SSE 格式的数据
        const lines = chunkStr.split('\n');
        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              console.log('✅ Stream completed with [DONE] marker');
              continue;
            }
            
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;
              
              if (delta?.content) {
                process.stdout.write(delta.content);
              }
              
            } catch (parseError) {
              // 忽略解析错误，可能是部分数据
            }
          }
        }
      });
      
      res.on('end', () => {
        const totalTime = Date.now() - startTime;
        console.log(`\n\n📊 Streaming Summary:`);
        console.log(`  First chunk: ${firstChunkTime}ms`);
        console.log(`  Total time: ${totalTime}ms`);
        console.log(`  Chunks received: ${chunkCount}`);
        console.log(`  Content length: ${totalContent.length}`);
        
        resolve({
          success: true,
          responseTime: totalTime,
          firstChunkTime,
          chunkCount,
          contentLength: totalContent.length
        });
      });
      
      res.on('error', (error) => {
        const responseTime = Date.now() - startTime;
        console.error(`❌ Response stream error after ${responseTime}ms:`, error.message);
        reject({
          success: false,
          responseTime,
          error: error.message
        });
      });
    });
    
    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      console.error(`❌ Request error after ${responseTime}ms:`, error.message);
      reject({
        success: false,
        responseTime,
        error: error.message
      });
    });
    
    // 设置请求超时
    req.setTimeout(60000, () => {
      const responseTime = Date.now() - startTime;
      console.error(`⏰ Request timed out after ${responseTime}ms`);
      req.destroy();
      reject({
        success: false,
        responseTime,
        error: 'Request timeout'
      });
    });
    
    // 发送请求
    console.log('📤 Sending streaming request...');
    
    req.write(JSON.stringify(requestData));
    req.end();
  });
}

/**
 * 主测试函数
 */
async function runTimeoutTests() {
  console.log('🚀 Starting timeout fix tests...\n');
  
  const results = {
    local: { normal: null, streaming: null },
    production: { normal: null, streaming: null }
  };
  
  // 测试本地环境
  console.log('='.repeat(60));
  console.log('🏠 LOCAL ENVIRONMENT TESTS');
  console.log('='.repeat(60));
  
  try {
    results.local.normal = await testTimeoutFix('local');
  } catch (error) {
    console.error('❌ Local normal test failed:', error);
    results.local.normal = error;
  }
  
  try {
    results.local.streaming = await testStreamingTimeoutFix('local');
  } catch (error) {
    console.error('❌ Local streaming test failed:', error);
    results.local.streaming = error;
  }
  
  // 测试生产环境
  console.log('\n' + '='.repeat(60));
  console.log('🌐 PRODUCTION ENVIRONMENT TESTS');
  console.log('='.repeat(60));
  
  try {
    results.production.normal = await testTimeoutFix('production');
  } catch (error) {
    console.error('❌ Production normal test failed:', error);
    results.production.normal = error;
  }
  
  try {
    results.production.streaming = await testStreamingTimeoutFix('production');
  } catch (error) {
    console.error('❌ Production streaming test failed:', error);
    results.production.streaming = error;
  }
  
  // 输出测试结果
  console.log('\n' + '='.repeat(60));
  console.log('📊 TIMEOUT FIX TEST RESULTS');
  console.log('='.repeat(60));
  
  console.log('Local Environment:');
  console.log(`  Normal API: ${results.local.normal?.success ? '✅ PASS' : '❌ FAIL'} (${results.local.normal?.responseTime || 0}ms)`);
  console.log(`  Streaming API: ${results.local.streaming?.success ? '✅ PASS' : '❌ FAIL'} (${results.local.streaming?.responseTime || 0}ms)`);
  
  console.log('\nProduction Environment:');
  console.log(`  Normal API: ${results.production.normal?.success ? '✅ PASS' : '❌ FAIL'} (${results.production.normal?.responseTime || 0}ms)`);
  console.log(`  Streaming API: ${results.production.streaming?.success ? '✅ PASS' : '❌ FAIL'} (${results.production.streaming?.responseTime || 0}ms)`);
  
  // 分析结果
  const allPassed = Object.values(results).every(env => 
    Object.values(env).every(test => test?.success)
  );
  
  const hasTimeouts = Object.values(results).some(env => 
    Object.values(env).some(test => test?.error?.includes('timeout'))
  );
  
  console.log('\n' + '='.repeat(60));
  if (allPassed && !hasTimeouts) {
    console.log('🎉 ALL TESTS PASSED! Timeout issues appear to be resolved.');
  } else if (hasTimeouts) {
    console.log('⚠️  TIMEOUT ISSUES DETECTED. The fix may need further optimization.');
  } else {
    console.log('⚠️  SOME TESTS FAILED. Please check the configuration and logs.');
  }
  console.log('='.repeat(60));
  
  console.log('\n📝 Notes:');
  console.log('- Vercel function timeout is now set to 60 seconds');
  console.log('- AI API requests have a 45-second timeout');
  console.log('- Response times are now logged for monitoring');
  console.log('- Update TEST_TOKEN with a valid JWT token for authentication tests');
}

// 运行测试
if (require.main === module) {
  runTimeoutTests().catch(console.error);
}

module.exports = { testTimeoutFix, testStreamingTimeoutFix, runTimeoutTests };
