/**
 * ============================================================================
 * NIKUNJ SINGH - PROJECTS INTERACTIVE ENGINE
 * ESP32 IoT Smart Relay Simulator & Hotel Management Terminal Simulator
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initIoTSimulator();
  initHotelTerminalSimulator();
});

/* ----------------------------------------------------------------------------
 * 1. ESP32 IOT VOICE & RELAY SIMULATOR
 * ---------------------------------------------------------------------------- */
function initIoTSimulator() {
  const terminal = document.getElementById('iot-terminal-log');
  const switches = document.querySelectorAll('.iot-switch');
  const voiceTriggerBtn = document.getElementById('voice-sim-trigger');

  if (!terminal || !switches.length) return;

  const deviceStates = {
    light: false,
    fan: false,
    ac: false,
    tv: false
  };

  function appendLog(message, isSuccess = true) {
    const timestamp = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.style.marginBottom = '4px';
    const colorClass = isSuccess ? 'term-info' : 'term-danger';
    line.innerHTML = `<span class="term-muted">[${timestamp}]</span> <span class="${colorClass}">${message}</span>`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  appendLog('ESP32 Wi-Fi connected to SSID "SmartHome_5G" (IP: 192.168.1.145)');
  appendLog('MQTT Broker connected: broker.hivemq.com:1883 [Client: ESP32_Nikunj_01]');
  appendLog('Ready for Voice / Web commands.');

  switches.forEach(btn => {
    btn.addEventListener('click', () => {
      const device = btn.getAttribute('data-device');
      const relayPin = btn.getAttribute('data-pin');
      const newState = !deviceStates[device];
      deviceStates[device] = newState;

      if (newState) {
        btn.classList.add('active');
        btn.querySelector('.switch-state-text').textContent = 'ON';
      } else {
        btn.classList.remove('active');
        btn.querySelector('.switch-state-text').textContent = 'OFF';
      }

      const stateStr = newState ? 'HIGH (3.3V)' : 'LOW (0V)';
      const actionStr = newState ? 'TURN_ON' : 'TURN_OFF';

      appendLog(`MQTT Sub: home/appliances/${device}/command -> Payload: "${actionStr}"`);
      setTimeout(() => {
        appendLog(`ESP32 GPIO ${relayPin} set to ${stateStr} | Optocoupler Relay Latched.`);
        appendLog(`MQTT Pub: home/appliances/${device}/telemetry -> {"status": "${newState ? 'ON' : 'OFF'}"}`);
      }, 120);
    });
  });

  if (voiceTriggerBtn) {
    const voiceCommands = [
      { text: '"Hey Google, turn on Living Room Light"', device: 'light', state: true },
      { text: '"Alexa, switch off Ceiling Fan"', device: 'fan', state: false },
      { text: '"Hey Google, turn on Air Conditioner"', device: 'ac', state: true },
      { text: '"Alexa, turn off Smart TV"', device: 'tv', state: false }
    ];
    let cmdIndex = 0;

    voiceTriggerBtn.addEventListener('click', () => {
      const cmd = voiceCommands[cmdIndex % voiceCommands.length];
      cmdIndex++;

      appendLog(`🎙️ Voice Captured: ${cmd.text}`);
      setTimeout(() => {
        appendLog(`IFTTT Webhook Triggered -> Webhook URL: /api/v1/mqtt/publish`);
        const targetBtn = document.querySelector(`.iot-switch[data-device="${cmd.device}"]`);
        if (targetBtn) {
          deviceStates[cmd.device] = cmd.state;
          if (cmd.state) {
            targetBtn.classList.add('active');
            targetBtn.querySelector('.switch-state-text').textContent = 'ON';
          } else {
            targetBtn.classList.remove('active');
            targetBtn.querySelector('.switch-state-text').textContent = 'OFF';
          }
          appendLog(`ESP32 executed: GPIO ${targetBtn.getAttribute('data-pin')} -> ${cmd.state ? 'HIGH' : 'LOW'}`);
        }
      }, 250);
    });
  }
}

/* ----------------------------------------------------------------------------
 * 2. HOTEL MANAGEMENT TERMINAL / SQL SIMULATOR
 * ---------------------------------------------------------------------------- */
function initHotelTerminalSimulator() {
  const terminal = document.getElementById('hotel-cli-output');
  const actionBtns = document.querySelectorAll('.hotel-action-btn');

  if (!terminal || !actionBtns.length) return;

  function appendHotelLog(lines) {
    const timestamp = new Date().toLocaleTimeString();
    lines.forEach(l => {
      const line = document.createElement('div');
      line.style.marginBottom = '3px';
      line.innerHTML = l;
      terminal.appendChild(line);
    });
    terminal.scrollTop = terminal.scrollHeight;
  }

  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');

      if (action === 'check_rooms') {
        appendHotelLog([
          `<span class="term-muted">-- Executing Python Query:</span>`,
          `<span class="term-cmd">SELECT room_id, room_type, price_per_night, status FROM rooms WHERE status='Available';</span>`,
          `<span class="term-success">+---------+-----------------+-----------------+-----------+</span>`,
          `<span class="term-success">| room_id | room_type       | price_per_night | status    |</span>`,
          `<span class="term-success">+---------+-----------------+-----------------+-----------+</span>`,
          `<span class="term-success">| 101     | Standard Single | $65.00          | Available |</span>`,
          `<span class="term-success">| 102     | Executive Suite | $140.00         | Available |</span>`,
          `<span class="term-success">| 204     | Deluxe Suite    | $210.00         | Available |</span>`,
          `<span class="term-success">+---------+-----------------+-----------------+-----------+</span>`,
          `<span class="term-info">3 available suites retrieved successfully in 0.003s.</span>`
        ]);
      } else if (action === 'book_room') {
        const randId = Math.floor(Math.random() * 800) + 120;
        appendHotelLog([
          `<span class="term-muted">-- Starting ACID Transaction with Parameterized Query:</span>`,
          `<span class="term-cmd">START TRANSACTION;</span>`,
          `<span class="term-cmd">INSERT INTO bookings (customer_id, room_id, check_in, check_out, total_amount) VALUES (42, 102, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 420.00);</span>`,
          `<span class="term-cmd">UPDATE rooms SET status = 'Occupied' WHERE room_id = 102;</span>`,
          `<span class="term-cmd">COMMIT;</span>`,
          `<span class="term-success">✓ Booking #BK-${randId} created. Room 102 locked. Invoice sent to customer.</span>`
        ]);
      } else if (action === 'guest_search') {
        appendHotelLog([
          `<span class="term-muted">-- Searching Guest Profile in Normalized Customer Database:</span>`,
          `<span class="term-cmd">SELECT c.id, c.full_name, c.email, b.booking_id, b.room_id FROM customers c JOIN bookings b ON c.id=b.customer_id WHERE c.full_name LIKE '%David%';</span>`,
          `<span class="term-success">Found: David Miller | Phone: +1-555-0199 | Active Room: #204 | Loyalty Points: 350</span>`,
          `<span class="term-info">Query returned in 1.8ms via B-Tree Index on 'full_name'.</span>`
        ]);
      } else if (action === 'clear_cli') {
        terminal.innerHTML = `
          <div class="term-muted">[MySQL Connection Pool: Active (4 Connections Available)]</div>
          <div class="term-info">Hotel Database v1.0. Ready. Select an operation above to execute query.</div>
        `;
      }
    });
  });
}
