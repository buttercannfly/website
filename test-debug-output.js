#!/usr/bin/env node

/**
 * 测试AI API调试输出功能
 * 用于验证curl命令调试信息是否正确输出
 */

const https = require('https');
const http = require('http');

// 测试配置
const TEST_CONFIG = {
  local: {
    baseUrl: 'http://localhost:3000',
    apiEndpoint: '/api/ai/chat'
  }
};

// 测试用的JWT token (需要替换为真实的token)
const TEST_TOKEN = 'your-test-jwt-token-here';

// 测试消息
const TEST_MESSAGES = [
  {
    role: 'user',
    content: 'Hello, this is a test message for debugging.'
  }
];

/**
 * 发送测试请求
 */
async function testDebugOutput() {
  const config = TEST_CONFIG.local;
  const url = `${config.baseUrl}${config.apiEndpoint}`;
  
  const requestBody = {
    messages: TEST_MESSAGES,
    model: 'deepseek-chat',
    stream: false // 使用非流式响应便于测试
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TEST_TOKEN}`
    }
  };

  console.log('=== 测试AI API调试输出 ===');
  console.log('发送请求到:', url);
  console.log('请求体:', JSON.stringify(requestBody, null, 2));
  console.log('请检查服务器控制台输出，应该能看到详细的curl命令调试信息\n');

  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('响应状态:', res.statusCode);
        console.log('响应头:', res.headers);
        console.log('响应体:', data);
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.error('请求错误:', error);
      reject(error);
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

// 运行测试
if (require.main === module) {
  testDebugOutput()
    .then(() => {
      console.log('\n测试完成！请检查服务器控制台输出。');
    })
    .catch((error) => {
      console.error('测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testDebugOutput };
