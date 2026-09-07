/**
 * ============================================================================
 * NIKUNJ SINGH - SKILLS & CODE RUNNER MODULE
 * Filterable skills matrix, progress meters & interactive code sandbox
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSkillsFilter();
  initCodeSandbox();
  animateSkillBars();
});

/* ----------------------------------------------------------------------------
 * 1. SKILLS FILTERING & SEARCH
 * ---------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category-card');
  const skillsGrid = document.querySelector('.skills-grid-container');
  const searchInput = document.getElementById('skill-search');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (skillsGrid) {
        if (filter === 'all') {
          skillsGrid.classList.remove('single-category-view');
        } else {
          skillsGrid.classList.add('single-category-view');
        }
      }

      skillCategories.forEach(cat => {
        const catGroup = cat.getAttribute('data-category');
        const matches = (filter === 'all' || catGroup === filter);

        if (matches) {
          cat.classList.remove('reveal-right', 'reveal-left');
          cat.classList.add('reveal', 'active');
          cat.style.display = 'block';
          cat.style.opacity = '0';
          cat.style.transform = 'translateY(12px)';

          void cat.offsetWidth;

          requestAnimationFrame(() => {
            cat.style.opacity = '1';
            cat.style.transform = 'translateY(0)';
          });
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const skillRows = document.querySelectorAll('.skill-row');

      skillRows.forEach(row => {
        const skillName = row.querySelector('.skill-name').textContent.toLowerCase();
        if (skillName.includes(term)) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
}

function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  skillFills.forEach(fill => {
    const level = fill.getAttribute('data-level') || '85%';
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = level;
    }, 150);
  });
}

/* ----------------------------------------------------------------------------
 * 2. INTERACTIVE CODE SANDBOX & SNIPPET SWITCHER
 * ---------------------------------------------------------------------------- */
const codeSnippets = {
  python_iot: {
    title: 'Python / ESP32 MQTT Appliance Controller Logic',
    lang: 'python',
    code: `# Voice Assistant & MQTT Telemetry Handler
import paho.mqtt.client as mqtt
import json

BROKER = "mqtt.nikunj-iot.local"
TOPIC_SUBSCRIBE = "home/appliances/commands"
RELAY_PINS = {"living_light": 23, "ceiling_fan": 22, "ac_unit": 21}

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    device = payload.get("device")
    action = payload.get("state")  # "ON" or "OFF"
    
    if device in RELAY_PINS:
        pin = RELAY_PINS[device]
        print(f"[IOT-EXEC] Triggering Relay PIN {pin} -> {action}")
        # Send confirmation telemetry back to cloud / Google Assistant / Alexa
        ack_payload = {"device": device, "status": action, "latency_ms": 14}
        client.publish("home/appliances/state", json.dumps(ack_payload))

client = mqtt.Client()
client.on_message = on_message
client.connect(BROKER, 1883, 60)
client.subscribe(TOPIC_SUBSCRIBE)
print("ESP32 IoT Listener initialized. Waiting for Google Assistant / Alexa commands...")`
  },

  mysql_hotel: {
    title: 'MySQL Hotel Database Schema & Stored Procedure',
    lang: 'sql',
    code: `-- Hotel Reservation System - 3NF Schema & Booking Transaction - Nikunj Singh
CREATE TABLE rooms (
    room_number INT PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') DEFAULT 'AVAILABLE'
);

DELIMITER //
CREATE PROCEDURE BookRoom(
    IN p_customer_id INT,
    IN p_room_num INT,
    IN p_check_in DATE,
    IN p_check_out DATE
)
BEGIN
    DECLARE room_curr_status VARCHAR(20);
    SELECT status INTO room_curr_status FROM rooms WHERE room_number = p_room_num;
    
    IF room_curr_status = 'AVAILABLE' THEN
        INSERT INTO bookings (customer_id, room_number, check_in_date, check_out_date, booking_status)
        VALUES (p_customer_id, p_room_num, p_check_in, p_check_out, 'CONFIRMED');
        
        UPDATE rooms SET status = 'OCCUPIED' WHERE room_number = p_room_num;
        SELECT 'SUCCESS: Room booked successfully!' AS message;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Room is not available';
    END IF;
END //
DELIMITER ;`
  },

  cpp_dsa: {
    title: 'C++ Efficient Graph BFS Shortest Path Algorithm (DSA)',
    lang: 'cpp',
    code: `// Breadth First Search (BFS) for Shortest Path in Unweighted Graph - Nikunj Singh
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
public:
    Graph(int V) : V(V), adj(V) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    void BFS(int startNode) {
        vector<bool> visited(V, false);
        queue<int> q;

        visited[startNode] = true;
        q.push(startNode);

        cout << "BFS Traversal starting from node " << startNode << ": ";
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            cout << curr << " ";

            for (int neighbor : adj[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        cout << endl;
    }
};`
  }
};

/* Syntax Highlighting Engine */
function formatCodeWithSyntax(code, lang) {
  const lines = code.split('\n');
  return lines.map((rawLine, idx) => {
    const lineNum = idx + 1;
    const highlightedCode = highlightLine(rawLine, lang);
    return `<div class="code-line"><span class="line-num">${lineNum}</span><span class="line-code">${highlightedCode}</span></div>`;
  }).join('');
}

function highlightLine(rawLine, lang) {
  if (!rawLine) return '&nbsp;';
  
  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let comment = '';
  let codePart = rawLine;

  if (lang === 'python' && rawLine.includes('#')) {
    const idx = rawLine.indexOf('#');
    comment = rawLine.slice(idx);
    codePart = rawLine.slice(0, idx);
  } else if (lang === 'sql' && rawLine.includes('--')) {
    const idx = rawLine.indexOf('--');
    comment = rawLine.slice(idx);
    codePart = rawLine.slice(0, idx);
  } else if (lang === 'cpp' && rawLine.includes('//')) {
    const idx = rawLine.indexOf('//');
    comment = rawLine.slice(idx);
    codePart = rawLine.slice(0, idx);
  }

  let pattern;
  if (lang === 'python') {
    pattern = /(["'])(?:(?=(\\?))\2.)*?\1|\b(?:import|from|as|def|class|return|if|elif|else|while|for|in|try|except|with|pass|break|continue|and|or|not|is|None|True|False)\b|\b[a-zA-Z_]\w*(?=\()|\b\d+\b/g;
  } else if (lang === 'sql') {
    pattern = /(["'])(?:(?=(\\?))\2.)*?\1|\b(?:CREATE|TABLE|PROCEDURE|IN|BEGIN|END|DECLARE|SELECT|INTO|FROM|WHERE|IF|THEN|ELSE|ELSEIF|INSERT|UPDATE|SET|VALUES|SIGNAL|SQLSTATE|AS|PRIMARY|KEY|NOT|NULL|DEFAULT|ENUM|DELIMITER)\b|\b(?:INT|VARCHAR|DECIMAL|DATE)\b|\b\d+\b/gi;
  } else if (lang === 'cpp') {
    pattern = /#include\s+<[^>]+>|(["'])(?:(?=(\\?))\2.)*?\1|\b(?:using|namespace|class|public|private|void|int|bool|true|false|while|for|if|else|return)\b|\b(?:vector|queue|string|Graph)\b|\b[a-zA-Z_]\w*(?=\()|\b\d+\b/g;
  }

  let highlighted = '';
  let lastIndex = 0;
  let match;

  if (pattern) {
    while ((match = pattern.exec(codePart)) !== null) {
      highlighted += escapeHtml(codePart.slice(lastIndex, match.index));
      const token = match[0];
      
      if (token.startsWith('#include')) {
        highlighted += `<span class="syn-keyword">${escapeHtml(token)}</span>`;
      } else if (token.startsWith('"') || token.startsWith("'")) {
        highlighted += `<span class="syn-string">${escapeHtml(token)}</span>`;
      } else if (/^\d+$/.test(token)) {
        highlighted += `<span class="syn-number">${escapeHtml(token)}</span>`;
      } else if (lang === 'python') {
        if (/^(import|from|as|def|class|return|if|elif|else|while|for|in|try|except|with|pass|break|continue|and|or|not|is|None|True|False)$/.test(token)) {
          highlighted += `<span class="syn-keyword">${escapeHtml(token)}</span>`;
        } else {
          highlighted += `<span class="syn-function">${escapeHtml(token)}</span>`;
        }
      } else if (lang === 'sql') {
        if (/^(INT|VARCHAR|DECIMAL|DATE)$/i.test(token)) {
          highlighted += `<span class="syn-type">${escapeHtml(token)}</span>`;
        } else {
          highlighted += `<span class="syn-keyword">${escapeHtml(token)}</span>`;
        }
      } else if (lang === 'cpp') {
        if (/^(using|namespace|class|public|private|void|int|bool|true|false|while|for|if|else|return)$/.test(token)) {
          highlighted += `<span class="syn-keyword">${escapeHtml(token)}</span>`;
        } else if (/^(vector|queue|string|Graph)$/.test(token)) {
          highlighted += `<span class="syn-type">${escapeHtml(token)}</span>`;
        } else {
          highlighted += `<span class="syn-function">${escapeHtml(token)}</span>`;
        }
      }
      lastIndex = pattern.lastIndex;
    }
  }

  highlighted += escapeHtml(codePart.slice(lastIndex));

  if (comment) {
    highlighted += `<span class="syn-comment">${escapeHtml(comment)}</span>`;
  }

  return highlighted || '&nbsp;';
}

function initCodeSandbox() {
  const tabs = document.querySelectorAll('.code-tab-btn');
  const codeDisplay = document.getElementById('code-display');
  const snippetTitle = document.getElementById('snippet-title');
  const copyBtn = document.getElementById('copy-code-btn');
  const themeSelect = document.getElementById('editor-theme-select');
  const sandboxWrapper = document.getElementById('code-sandbox');

  if (!codeDisplay || !sandboxWrapper) return;

  let currentKey = 'python_iot';

  const savedEditorTheme = localStorage.getItem('portfolio-editor-theme') || 'auto';
  if (themeSelect) {
    themeSelect.value = savedEditorTheme;
  }
  applyEditorTheme(savedEditorTheme);

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('portfolio-editor-theme', selected);
      applyEditorTheme(selected);
      showToast(`Editor theme changed to ${themeSelect.options[themeSelect.selectedIndex].text}`, 'info');
    });
  }

  function applyEditorTheme(theme) {
    if (!sandboxWrapper) return;
    sandboxWrapper.setAttribute('data-editor-theme', theme);
  }

  const observer = new MutationObserver(() => {
    const currentEditorTheme = sandboxWrapper.getAttribute('data-editor-theme');
    if (currentEditorTheme === 'auto') {
      loadSnippet(currentKey);
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function loadSnippet(key) {
    const data = codeSnippets[key];
    if (!data) return;
    currentKey = key;

    if (snippetTitle) snippetTitle.textContent = data.title;
    codeDisplay.innerHTML = formatCodeWithSyntax(data.code, data.lang);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const snippetKey = tab.getAttribute('data-snippet');
      loadSnippet(snippetKey);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activeData = codeSnippets[currentKey];
      if (activeData) {
        copyToClipboard(activeData.code, 'Code snippet');
      }
    });
  }

  loadSnippet('python_iot');
}
