const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const sensorData = { temp: 0, humi: 0, light: 0, sound: 0, feedback: [] };

function generateFeedback(sensorData) {
  const messages = [];

  if (sensorData.temp < 10) messages.push("🌡 온도가 낮아요. 따뜻한 환경에서 공부해보세요.");
  else if (sensorData.temp >30) messages.push("🌡 온도가 높아요. 선풍기를 켜보세요.");

  if (sensorData.humi < 35) messages.push("💧 습도가 낮아요. 가습기를 사용하는 걸 추천해요.");
  else if (sensorData.humi > 70) messages.push("💧 습도가 높아요. 환기하세요.");

  if (sensorData.light < 300) messages.push("💡 조명이 어두워요. 불을 켜보세요.");
  if (sensorData.sound > 500) messages.push("🔈 주위가 시끄러워요. 조용한 공간에서 집중해보세요.");

  return messages;
}

module.exports = function setupSerial() {
  try {
    const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    port.on('open', () => {
      console.log('✅ SerialPort 연결 성공');
    });

    parser.on('data', (line) => {
      console.log('[원시 수신]', line);

      // "key:value" 형식으로 데이터 파싱
      const parts = line.trim().split(' '); // 공백으로 구분
      parts.forEach(pair => {
        const [key, value] = pair.split(':');  // key:value로 분리
        const num = parseFloat(value);
        if (key && !isNaN(num)) {
          sensorData[key] = num;  // 센서 데이터에 할당
        } else {
          console.warn(`[파싱 실패] '${pair}' → 무시됨`);
        }
      });

      // 센서 데이터를 기반으로 피드백 메시지 생성
      sensorData.feedback = generateFeedback(sensorData);
      console.log('[갱신된 sensorData]', sensorData);
    });

  } catch (err) {
    console.error('[Serial 연결 실패]', err.message);
  }
};

module.exports.sensorData = sensorData;
