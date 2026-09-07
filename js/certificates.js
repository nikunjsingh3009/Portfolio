/**
 * ============================================================================
 * NIKUNJ SINGH - CERTIFICATES & CREDENTIALS MODULE
 * Modal viewer, credential verification, search filtering, and verified certificates
 * ============================================================================
 */

const certificatesData = [
  {
    id: 'cert-ncc-mh',
    title: 'Military Attachment NCC-Girls Camp',
    issuer: 'Military Hospital, Jalandhar Cantt',
    issuerTag: 'Army Medical Corps / NCC (Boys Bn)',
    category: 'leadership',
    date: '22 March 2026',
    dateRange: '13 Mar 2026 – 22 Mar 2026',
    duration: '10 Days Intensive Military Hospital Attachment',
    credentialId: 'PB2025SD1A5851279',
    cadetRank: 'Cdt',
    unit: '2 PB BN (Boys)',
    college: 'L.P.U., Jalandhar',
    icon: '🎖️',
    accentColor: '#ef4444',
    badgeColor: 'badge-blue',
    fileType: 'image',
    fileTypeLabel: 'IMAGE / DOC',
    fileName: 'Nikunj_Singh_NCC_Military_Hospital_Attachment_Camp.jpeg',
    filePath: 'images/certs/Nikunj_Singh_NCC_Military_Hospital_Attachment_Camp.jpeg',
    downloadName: 'Nikunj_Singh_NCC_Military_Hospital_Attachment_Camp.jpeg',
    previewImg: 'images/certs/preview_ncc_mh_camp.jpeg',
    verificationUrl: 'images/certs/Nikunj_Singh_NCC_Military_Hospital_Attachment_Camp.jpeg',
    signatory: 'Col Sr Regist & Commandant MH Jalandhar Cantt, MH JRC',
    skills: ['Military Hospital Operations', 'Crisis & Medical Attachment Protocols', 'Armed Forces Discipline', 'Team Leadership', 'First Responder Support'],
    description: 'Awarded to Cadet Nikunj Singh (2 PB BN Boys, Lovely Professional University) for successfully completing the rigorous 10-day Military Attachment Camp held at Military Hospital Jalandhar Cantt under Army Medical Corps supervision.'
  },
  {
    id: 'cert-rf-skill-india',
    title: 'Python Programming (Skill India Digital Hub)',
    issuer: 'Reliance Foundation & Skill India',
    issuerTag: 'Reliance Skilling Academy & NSDC',
    category: 'programming',
    date: '10 February 2026',
    dateRange: 'Completed Feb 10, 2026',
    duration: '90 Hours Comprehensive Track',
    credentialId: '91118d47-0cc8-4fb2-b290-af902fb4b2f3',
    icon: '🐍',
    accentColor: '#10b981',
    badgeColor: 'badge-emerald',
    fileType: 'pdf',
    fileTypeLabel: 'PDF',
    fileName: 'Nikunj_Singh_Reliance_Foundation_Skill_India_Python.pdf',
    filePath: 'images/certs/Nikunj_Singh_Reliance_Foundation_Skill_India_Python.pdf',
    downloadName: 'Nikunj_Singh_Reliance_Foundation_Skill_India_Python.pdf',
    previewImg: 'images/certs/preview_rf_skill_india_python.png',
    verificationUrl: 'images/certs/Nikunj_Singh_Reliance_Foundation_Skill_India_Python.pdf',
    signatory: 'Authorized Directorate, Reliance Foundation Skilling Academy & Skill India NSDC Hub',
    skills: ['Python Programming', 'Data Structures & Algorithms', 'Modular Software Design', 'Logic Building', 'Problem Solving'],
    description: 'Accredited certificate of completion awarded to Nikunj Singh for mastering Python Programming through Reliance Foundation Skilling Academy in partnership with Skill India Digital Hub and NSDC.'
  },
  {
    id: 'cert-infosys-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    issuerTag: 'Infosys Springboard AI Track',
    category: 'ai',
    date: '04 April 2026',
    dateRange: 'Issued on Saturday, April 4, 2026',
    duration: 'Accredited Industry AI Certification',
    credentialId: 'INFOSYS-AI-APR-2026',
    icon: '🤖',
    accentColor: '#3b82f6',
    badgeColor: 'badge-blue',
    fileType: 'pdf',
    fileTypeLabel: 'PDF',
    fileName: 'Nikunj_Singh_Infosys_AI_Certificate.pdf',
    filePath: 'images/certs/Nikunj_Singh_Infosys_AI_Certificate.pdf',
    downloadName: 'Nikunj_Singh_Infosys_AI_Certificate.pdf',
    previewImg: 'images/certs/preview_infosys_ai.png',
    verificationUrl: 'https://verify.onwingspan.com',
    signatory: 'Satheesha B. Nanjappa, Senior VP & Head Education, Training & Assessment, Infosys',
    skills: ['Artificial Intelligence', 'Machine Learning Foundations', 'Neural Systems & Heuristics', 'AI Ethics & Lifecycle', 'Data Engineering'],
    description: 'Certified by Infosys Springboard for successfully completing the industry-standard course in Introduction to Artificial Intelligence. Validated via Wingspan credential verification.'
  },
  {
    id: 'cert-rf-skilling',
    title: 'Python Programming (Skilling Academy)',
    issuer: 'Reliance Foundation',
    issuerTag: 'Reliance Foundation Skilling Academy',
    category: 'programming',
    date: '10 February 2026',
    dateRange: 'Completed 10.02.2026',
    duration: 'Online Skilling Course',
    credentialId: 'RFSA000382536',
    icon: '⚡',
    accentColor: '#059669',
    badgeColor: 'badge-emerald',
    fileType: 'pdf',
    fileTypeLabel: 'PDF',
    fileName: 'Nikunj_Singh_Reliance_Foundation_Course_Certificate.pdf',
    filePath: 'images/certs/Nikunj_Singh_Reliance_Foundation_Course_Certificate.pdf',
    downloadName: 'Nikunj_Singh_Reliance_Foundation_Python_Certificate.pdf',
    previewImg: 'images/certs/preview_rf_course_python.png',
    verificationUrl: 'images/certs/Nikunj_Singh_Reliance_Foundation_Course_Certificate.pdf',
    signatory: 'Authorized Signatory, Reliance Foundation Skilling Academy',
    skills: ['Python Syntax & Core Fundamentals', 'Object-Oriented Programming (OOP)', 'File I/O & Exception Handling', 'Scripting & Automation'],
    description: 'Official Certificate of Completion awarded to Nikunj Singh by Reliance Foundation Skilling Academy for successful demonstration of Python programming competencies.'
  },
  {
    id: 'cert-aiesec-exp',
    title: 'Experience Letter of AIESEC Membership',
    issuer: 'AIESEC in Jalandhar',
    issuerTag: 'AIESEC India Local Chapter',
    category: 'leadership',
    date: '31 July 2026',
    dateRange: '08 Feb 2026 – 31 Jul 2026',
    duration: '6 Months Executive & BD Engagement',
    credentialId: 'AIESEC-JAL-EXP-2026',
    icon: '🌐',
    accentColor: '#8b5cf6',
    badgeColor: 'badge-purple',
    fileType: 'pdf',
    fileTypeLabel: 'PDF',
    fileName: 'Nikunj_Singh_AIESEC_Letter_of_Experience.pdf',
    filePath: 'images/certs/Nikunj_Singh_AIESEC_Letter_of_Experience.pdf',
    downloadName: 'Nikunj_Singh_AIESEC_Letter_of_Experience.pdf',
    previewImg: 'images/certs/preview_aiesec_exp.png',
    verificationUrl: 'images/certs/Nikunj_Singh_AIESEC_Letter_of_Experience.pdf',
    signatory: 'Muhammad Abdul Rahman (LCP) & Lakshika Sudhakar (VP HR & PM), AIESEC in Jalandhar',
    skills: ['Business Development', 'Youth Speak Leadership', 'Student Engagement & Outreach', 'Team Collaboration', 'Strategic Marketing'],
    description: 'Official Letter of Experience granted to Nikunj Singh for serving as an active Team Member in Business Development and representing the chapter at Annual General Meeting (Baddi) & Xchange Leadership Development Summit (Silvassa).'
  }
];

function initAllCertificates() {
  initCertificatesGrid();
  initCertificateModal();
  initCertFilter();
  if (typeof window.initScrollReveal === 'function') {
    window.initScrollReveal();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllCertificates);
} else {
  initAllCertificates();
}

function initCertificatesGrid() {
  const grid = document.getElementById('certificates-grid');
  if (!grid) return;

  grid.innerHTML = certificatesData.map(cert => {
    // Top preview box with visual certificate preview matching photo 2
    let previewInner = '';
    if (cert.previewImg) {
      previewInner = `
        <img src="${cert.previewImg}" alt="${cert.title}" class="cert-thumb-img" loading="lazy">
      `;
    } else {
      previewInner = `
        <div class="cert-empty-preview">
          <div class="empty-icon">${cert.icon}</div>
          <div class="empty-issuer">${cert.issuerTag}</div>
        </div>
      `;
    }

    const previewBlock = `
      <div class="certificate-preview-box" onclick="openCertificateModalById('${cert.id}')">
        <span class="cert-header-pill">🛡️ Verified Credential</span>
        <span class="cert-file-pill">📄 ${cert.fileTypeLabel}</span>
        ${previewInner}
        <span class="cert-preview-pill">👁️ Click to Preview</span>
      </div>
    `;

    const skillPills = cert.skills.map(s => `<span class="tech-tag" style="font-size:0.75rem;">${s}</span>`).join('');

    return `
      <div class="certificate-card reveal active" data-category="${cert.category}" data-id="${cert.id}">
        ${previewBlock}

        <div class="cert-card-body">
          <span class="cert-issuer-tag">${cert.issuerTag}</span>
          <h3 class="cert-card-title">${cert.title}</h3>

          <div class="cert-meta-row">
            <span>📅 ${cert.date}</span>
            <span>⏱️ ${cert.duration}</span>
          </div>

          <div class="cert-id-badge">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:82%;">ID: <strong>${cert.credentialId}</strong></span>
            <button style="background:transparent; border:none; cursor:pointer; font-size:0.85rem;" onclick="copyCredentialId('${cert.credentialId}', event)" title="Copy Credential ID">📋</button>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin:0.35rem 0 0.5rem 0;">
            ${skillPills}
          </div>

          <div class="cert-card-actions">
            <button class="cert-btn-preview" onclick="openCertificateModalById('${cert.id}')">
              <span>Preview</span> <span>👁️</span>
            </button>
            <a href="${cert.filePath}" target="_blank" rel="noopener" class="cert-btn-open" title="Open Original File">
              <span>Open</span> <span>↗</span>
            </a>
            <a href="${cert.filePath}" download="${cert.downloadName}" class="cert-btn-icon" title="Download Document" style="text-decoration:none;">
              📥
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openCertificateModalById(id) {
  const cert = certificatesData.find(c => c.id === id);
  if (!cert) return;

  const modal = document.getElementById('cert-modal');
  const modalContent = document.getElementById('cert-modal-content');
  if (!modal || !modalContent) return;

  const previewMedia = cert.previewImg ? `
    <div class="modal-preview-wrapper" style="margin-bottom:1.5rem; text-align:center;">
      <img src="${cert.previewImg}" alt="${cert.title}" class="cert-full-img" style="max-height:460px; width:auto; max-width:100%; object-fit:contain; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,0.35);">
    </div>
  ` : '';

  const verifyAction = cert.verificationUrl && cert.verificationUrl.startsWith('http') ? `
    <a href="${cert.verificationUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
      <span>Verify on Official Portal</span> <span>🛡️</span>
    </a>
  ` : `
    <a href="${cert.filePath}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
      <span>View Full Document</span> <span>↗</span>
    </a>
  `;

  modalContent.innerHTML = `
    <!-- Modal Header Row -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1.5rem; flex-wrap:wrap; padding-bottom:1.25rem; border-bottom:1px solid var(--border-subtle);">
      <div style="display:flex; gap:1rem; align-items:center;">
        <div style="font-size:2.8rem; filter:drop-shadow(0 2px 8px ${cert.accentColor}30);">${cert.icon}</div>
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge ${cert.badgeColor}">${cert.issuer}</span>
            <span class="badge badge-neutral" style="font-size:0.75rem;">Verified Credential</span>
          </div>
          <h2 style="font-size:1.45rem; color:var(--text-main); margin-top:0.35rem; line-height:1.3;">${cert.title}</h2>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.25rem;">Recipient: <strong style="color:var(--text-main);">Nikunj Singh</strong></p>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap;">
        ${verifyAction}
        <a href="${cert.filePath}" download="${cert.downloadName}" class="btn btn-sm btn-secondary">
          <span>Download</span> <span>📥</span>
        </a>
      </div>
    </div>

    <!-- Certificate Document Preview Banner -->
    <div style="margin:1.25rem 0;">
      ${previewMedia}
    </div>

    <!-- Verified Digital Seal Banner -->
    <div style="background:var(--bg-tertiary); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem 1.5rem; margin-bottom:1.25rem;">
      <div style="display:flex; gap:1rem; align-items:flex-start;">
        <div style="font-size:2rem; line-height:1;">🏛️</div>
        <div>
          <h4 style="color:var(--text-main); font-size:1.05rem; margin-bottom:0.25rem;">Credential Overview & Remarks</h4>
          <p style="color:var(--text-muted); font-size:0.92rem; margin:0; line-height:1.6;">
            ${cert.description}
          </p>
        </div>
      </div>
    </div>

    <!-- Metadata Details Grid -->
    <div class="cert-meta-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
      <div class="cert-meta-item" style="background:var(--bg-tertiary); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
        <span class="cert-meta-label" style="font-size:0.75rem; color:var(--text-subtle); text-transform:uppercase;">Registration ID</span>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.25rem;">
          <span class="cert-meta-val" style="font-family:var(--font-mono); color:var(--accent-cyan); font-weight:700; word-break:break-all; font-size:0.85rem;">${cert.credentialId}</span>
          <button class="btn btn-icon" style="padding:0.15rem 0.35rem; font-size:0.85rem; background:transparent; border:none; cursor:pointer;" onclick="copyCredentialId('${cert.credentialId}', event)" title="Copy Credential ID">
            📋
          </button>
        </div>
      </div>

      <div class="cert-meta-item" style="background:var(--bg-tertiary); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
        <span class="cert-meta-label" style="font-size:0.75rem; color:var(--text-subtle); text-transform:uppercase;">Issuing Authority</span>
        <div class="cert-meta-val" style="margin-top:0.25rem; font-weight:600; color:var(--text-main); font-size:0.88rem;">${cert.issuer}</div>
      </div>

      <div class="cert-meta-item" style="background:var(--bg-tertiary); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
        <span class="cert-meta-label" style="font-size:0.75rem; color:var(--text-subtle); text-transform:uppercase;">Timeline / Completed</span>
        <div class="cert-meta-val" style="margin-top:0.25rem; color:var(--text-main); font-size:0.88rem;">${cert.dateRange || cert.date}</div>
      </div>

      <div class="cert-meta-item" style="background:var(--bg-tertiary); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
        <span class="cert-meta-label" style="font-size:0.75rem; color:var(--text-subtle); text-transform:uppercase;">Authorized Signatory</span>
        <div class="cert-meta-val" style="margin-top:0.25rem; color:var(--text-main); font-size:0.85rem;">${cert.signatory}</div>
      </div>
    </div>

    <!-- Verified Skills Tags -->
    <div>
      <h4 style="font-size:0.9rem; color:var(--text-main); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.04em;">Validated Competencies:</h4>
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
        ${cert.skills.map(s => `<span class="tech-tag highlight">${s}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function copyCredentialId(id, e) {
  if (e) e.stopPropagation();
  copyToClipboard(id, 'Credential ID');
}

function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('cert-modal-close');
  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function initCertFilter() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const searchInput = document.getElementById('cert-search');

  function applyFilters() {
    const activeBtn = document.querySelector('.cert-filter-btn.active');
    const filterCat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('.certificate-card');

    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const catMatches = (filterCat === 'all' || cat === filterCat);
      const searchMatches = (!query || text.includes(query));

      if (catMatches && searchMatches) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}
