const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const app = express();

const sensorData = { temp: 0, humi: 0, light: 0, sound: 0, feedback: [] };
const keypadData = { input: '' };  // 키패드 입력 저장

function generateFeedback(sensorData) {
  const messages = [];

  if (sensorData.temp < 10) messages.push("🌡 온도가 낮아요. 따뜻한 환경에서 공부해보세요.");
  else if (sensorData.temp > 30) messages.push("🌡 온도가 높아요. 선풍기를 켜보세요.");

  if (sensorData.humi < 35) messages.push("💧 습도가 낮아요. 가습기를 사용하는 걸 추천해요.");
  else if (sensorData.humi > 70) messages.push("💧 습도가 높아요. 환기하세요.");

  if (sensorData.light < 300) messages.push("💡 조명이 어두워요. 불을 켜보세요.");
  if (sensorData.sound > 500) messages.push("🔈 주위가 시끄러워요. 조용한 공간에서 집중해보세요.");

  return messages;
}

function setupSerial() {
  try {
    // 첫 번째 아두이노 연결 (센서 데이터)
    const port1 = new SerialPort({ path: '/dev/cu.usbmodem14201', baudRate: 9600 }); // 첫 번째 아두이노 포트
    const parser1 = port1.pipe(new ReadlineParser({ delimiter: '\n' }));

    // 두 번째 아두이노 연결 (키패드 입력 받기)
    const port2 = new SerialPort({ path: '/dev/cu.usbmodem14101', baudRate: 9600 }); // 두 번째 아두이노 포트
    const parser2 = port2.pipe(new ReadlineParser({ delimiter: '\n' }));

    port1.on('open', () => console.log('✅ SerialPort 1 연결 성공'));
    port2.on('open', () => console.log('✅ SerialPort 2 연결 성공'));

    // 첫 번째 아두이노의 센서 데이터 받기
    parser1.on('data', (line) => {
      const parts = line.trim().split(' '); // 공백으로 구분
      parts.forEach(pair => {
        const [key, value] = pair.split(':');  // key:value로 분리
        const num = parseFloat(value);
        if (key && !isNaN(num)) {
          sensorData[key] = num;  // 센서 데이터에 할당
        }
      });

      // 센서 데이터를 기반으로 피드백 메시지 생성
      sensorData.feedback = generateFeedback(sensorData);
      console.log('[갱신된 sensorData]', sensorData);
    });

    // 두 번째 아두이노의 키패드 값 받기
    parser2.on('data', (line) => {
      if (line.startsWith('Input:')) {
        const key = line.split(':')[1].trim();
        keypadData.input = key;  // 입력된 키 값을 저장
      }

      console.log('[갱신된 keypadData]', keypadData);
    });
  } catch (err) {
    console.error('[Serial 연결 실패]', err.message);
  }
}

// 서버 초기화
function startServer() {
  setupSerial();

  // 간단한 Express 서버 예시
  app.get('/api/sensor', (req, res) => {
    res.json(sensorData); // 센서 데이터를 클라이언트에 전달
  });

  app.get('/api/keypad', (req, res) => {
    res.json({ input: keypadData.input }); // 키패드 입력값 클라이언트에 전달
  });

  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}
module.exports=setupSerial;
//startServer();
