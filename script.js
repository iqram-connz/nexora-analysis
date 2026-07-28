
// =========================
// GLOBAL COLOR MAPPINGS (UNTUK BADGE/CLASS)
// =========================
const vocalColorMap = {
    "red": "badge-dozen", "orange": "badge-complete", 
    "green": "badge-good", "blue": "badge-great", 
    "purple": "badge-ace", "black": "badge-master", "brown": "badge-perfect"
};

const danceColorMap = {
    "red": "badge-dozen", 
    "orange": "badge-average",       // Pastikan ini sesuai dengan CSS .badge-basic
    "green": "badge-intermediate", // Pastikan ini sesuai dengan CSS .badge-intermediate
    "blue": "badge-advanced", 
    "purple": "badge-proficient", 
    "black": "badge-master"
};

const rapColorMap = {
    "red": "badge-dozen", "orange": "badge-average", 
    "lightgreen": "badge-above-avg", "green": "badge-good", 
    "blue": "badge-great", "purple": "badge-ace", 
    "black": "badge-master", "brown": "badge-perfect"
};

const spColorMap = {
    "red": "badge-dozen", "orange": "badge-complete", 
    "green": "badge-good", "blue": "badge-great", 
    "purple": "badge-ace", "black": "badge-master"
};

const creditColorMap = {
    "red": "badge-dozen", "orange": "badge-complete", 
    "green": "badge-good", "blue": "badge-great", 
    "purple": "badge-ace", "black": "badge-producer", 
    "brown": "badge-perfect"
};

const visualColorMap = {
    "red": "badge-dozen", "orange": "badge-average",
    "green": "badge-good", "blue": "badge-great",
    "purple": "badge-graceful", "black": "badge-master",
    "brown": "badge-perfect"
};

// =========================
// FUNGSI PEWARNAAN TEKS POIN (SOLID COLORS - FIXED RESET)
// =========================
function applyColorToStat(statId, value, type) {
    const el = document.getElementById(statId);
    if (!el) return;

    let num = parseFloat(String(value).replace(/[^\d.-]/g, ''));
    if (isNaN(num)) {
        // Reset total jika error/kosong
        el.style.cssText = ""; 
        el.style.color = "#fff"; 
        el.style.fontWeight = "900";
        return;
    }

    let color = "#fff"; // Default putih

    // LOGIKA WARNA SOLID SESUAI REQUEST
    if (type === 'vocal') {
        if (num <= 10) color = "#ff4d4d";      // Merah (5-10)
        else if (num <= 20) color = "#feca57"; // Kuning (15-20)
        else if (num <= 50) color = "#5bff1b"; // Hijau (25-50)
        else if (num <= 95) color = "#a29bfe"; // Ungu Muda (55-95)
        else color = "#6c5ce7";                // Ungu Terang (100)
    } 
    else if (type === 'dance') {
        if (num < 40) color = "#ff4d4d";       // Merah (10.0-39.5)
        else if (num < 60) color = "#feca57";  // Kuning (40.0-59.5)
        else if (num < 80) color = "#5bff1b";  // Hijau (60.0-79.5)
        else if (num < 100) color = "#a29bfe"; // Ungu Muda (80.0-99.5)
        else color = "#6c5ce7";                // Ungu Terang (100)
    } 
    else if (type === 'rap') {
        if (num <= 10) color = "#ff4d4d";      // Merah (5-10)
        else if (num <= 15) color = "#feca57"; // Kuning (15)
        else if (num <= 50) color = "#5bff1b"; // Hijau (20-50)
        else if (num <= 95) color = "#a29bfe"; // Ungu Muda (55-95)
        else color = "#6c5ce7";                // Ungu Terang (100)
    }
    else if (type === 'sp') {
        if (num <= 45) color = "#ff4d4d";      // Merah (5-50)
        else if (num <= 65) color = "#feca57"; // Kuning (55-65)
        else if (num <= 85) color = "#5bff1b"; // Hijau (70-80)
        else if (num <= 95) color = "#a29bfe"; // Ungu Muda (85-95)
        else color = "#6c5ce7";                // Ungu Tua/Terang (100)
    }
    
    else if (type === 'credit') {
        if (num === 0) color = 
          "#ff4d4d";    
        else if (num <= 0.9) color = "#feca57"; 
        else if (num <= 2.9) color = "#5bff1b"; 
        else if (num <= 3.9) color = "#a29bfe"; 
        else color = 
          "#6c5ce7";           
      
    }
    else if (type === 'visual') {
        if (num <= 2.9) color = 
          "#ff4d4d";      
        else if (num <= 4.9) color = "#feca57"; 
        else if (num <= 6.9) color = "#5bff1b"; 
        else if (num <= 7.9) color = "#a29bfe"; 
        else color = "#6c5ce7";                
    }

    // --- BAGIAN PENTING: RESET TOTAL SEBELUM MEMBERI WARNA ---
    el.style.background = "none";
    el.style.webkitBackgroundClip = "initial";
    el.style.backgroundClip = "initial";
    el.style.webkitTextFillColor = "initial"; 
    
    // Baru terapkan warna solid
    el.style.color = color;
    el.style.fontWeight = "900";
}


// =========================
// 1. FUNGSI SUARA & UTILITAS (GLOBAL)
// =========================
function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0; 
        sound.volume = 0.4;    
        sound.play().catch(e => console.log("Audio blocked by browser"));
    }
}

function showToast(message) {
    // Buat container jika belum ada
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "nexora-toast";
    toast.innerHTML = `<span>✨</span> ${message}`; // Tambah ikon kecil
    
    container.appendChild(toast);

    // Hapus setelah 3 detik
    setTimeout(() => {
        toast.classList.add("hiding");
        toast.addEventListener("animationend", () => {
            toast.remove();
            // Hapus container kalau kosong
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, 3000);
}

// =========================
// GLOBAL VARIABLES FOR ANALYSIS
// =========================
let currentComment = ""; // Kita beri nama berbeda agar tidak bentrok
let currentFinalGrade = "";



// Fungsi Helper untuk mengambil angka dari Div Point Box (FIX UTAMA)
function getPointFromBox(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    // Ambil teks, hapus karakter non-angka (seperti '+'), lalu parse
    let text = el.textContent || el.innerText;
    let cleanText = text.replace(/[^0-9.]/g, ''); 
    const val = parseFloat(cleanText);
    return isNaN(val) ? 0 : val;
}

// =========================
// MAIN LOGIC
// =========================
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // STAR BACKGROUND
    // =========================
    const stars = document.getElementById("stars");
    if (stars) {
        stars.innerHTML = ''; 
        for (let i = 0; i < 75; i++) { 
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            const size = Math.random() * 2 + 1; 
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.animationDelay = Math.random() * 5 + "s";
            star.style.animationDuration = (2 + Math.random() * 3) + "s";
            stars.appendChild(star);
        }
    }

    // =========================
    // SPLASH SCREEN LOGIC
    // =========================
    const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", () => {
        // 1. Mainkan suara transisi (opsional, kalau ada file audionya)
        if (typeof playSound === 'function') {
            playSound('clickSound'); 
        }
            const splash = document.getElementById("splash-screen");
            const main = document.getElementById("main-content");
            if (splash && main) {
                splash.classList.add("fade-out");
                setTimeout(() => {
                    splash.style.display = "none";
                    main.style.display = "block";
                    main.style.animation = "fadeIn 0.8s forwards";
                }, 800);
            }
        }); 
    }

let deleteTargetIndex = null; // Untuk menyimpan index yang sedang dipilih

// --- RANDOM IDOL GENERATOR (CLEANED & ANIMATED) ---
const idolList = [
    "Yujin (IVE)", "Ahyeon (BABYMONSTER)", "Rosè (BLACKPINK) ", "Winter (Aespa)", 
    "Sana (TWICE)", "Asa (BABYMONSTER)", "Hanni (NEWJEANS)", "Miyeon (I-DLE)", "Jennie (BLACKPINK)", "Karina (Aespa)", "Yuju (GFRIEND)", "Rei (IVE)", "Nayeon (TWICE)", "Irene (Red Velvet)", "Ian (Hearts2Hearts)", "Chiquita (BABYMONSTER)", "Ningning (Aespa)", "Chaewon (LE SSERAFIM)", "Minju (ILLIT)", "Sakura (LE SSERAFIM)", "Yeji (ITZY)", "Soyeon (I-DLE)", "Jihyo (TWICE)", "Wonhee (ILLIT)", "Yuna (ITZY)", "Rora (BABYMONSTER)", "Wonyoung (IVE)", "Haewon (NMIXX)", "Momo (TWICE)", "Yunah (ILLIT)", "Kyujin (NMIXX)", "Lily (NMIXX)", "Lesseo (IVE)", "Yunjin (LE SSERAFIM)", "Seulgi (Red Velvet)", "Tzuyu (TWICE)", "Eunchae (LE SSERAFIM)", "Jiwoo (NMIXX)", "Yuha (Hearts2Hearts)", "Yeon (Hearts2Hearts)", "Dahyun (TWICE)", "Giselle (Aespa)", "Jisoo (BLACKPINK)", "Lia (ITZY)", "Ruka (BABYMONSTER)", "Lisa (BLACKPINK)", "Pharita (BABYMONSTER)", "Gaeul (IVE)", "Rami ♡ (BABYMONSTER)", "Haerin (NEWJEANS)", "Hyein (NEWJEANS)", "Jeongyeon (TWICE)", "Kazuha (LE SSERAFIM)", "Gawon (MEOVV)", "Minnie (I-DLE)", "Jiwoo (Hearts2Hearts)", "Bailey (ADP)", "Anna (MEOVV)", "Juun (Hearts2Hearts)", "Yuqi (I-DLE)", "Shuhua (I-DLE)", "Ella (MEOVV)", "Carmen (Hearts2Hearts)", "Danielle ♡ (NEWJEANS)", "Minji (NEWJEANS)", "Chaeyoung (TWICE)", "Bae (NMIXX)", "Narin (MEOVV)", "Hyoyeon (SNSD)", "Ryujin (ITZY)", "Chaeryoung (ITZY)", "Moka (ILLIT)", "Mina (TWICE)", "Iroha (ILLIT)", "Sullyoon (NMIXX)"
];

const randomBtn = document.getElementById("randomNameBtn");
const nameInput = document.getElementById("names");

if (randomBtn && nameInput) {
    randomBtn.addEventListener("click", () => {
        // Efek "Shuffle" cepat sebelum berhenti di satu nama
        let count = 0;
        const shuffleInterval = setInterval(() => {
            nameInput.value = idolList[Math.floor(Math.random() * idolList.length)];
            count++;
            
            // Hentikan setelah 7 kali ganti (sekitar 0.5 detik)
            if (count > 7) {
                clearInterval(shuffleInterval);
                // Pilih nama final
                const finalIdol = idolList[Math.floor(Math.random() * idolList.length)];
                nameInput.value = finalIdol;
                
                // Mainkan suara
                if (typeof playSound === 'function') playSound('clickSound');
            }
        }, 50); // Ganti nama setiap 50ms
        
    });
}


    // =========================
    // 1. VOCAL DROPDOWN & LOGIC
    // =========================
    const vocalSelect = document.getElementById("vocal");
    // Pastikan vocalData ada, jika tidak pakai array kosong agar tidak error
    const vData = (typeof vocalData !== 'undefined' && Array.isArray(vocalData)) ? vocalData : [];
    
    if (vocalSelect) {
        vocalSelect.innerHTML = '<option value="">Choose Vocals...</option>';
        
        if (vData.length > 0) {
            vData.forEach(item => {
                if (!item.name || String(item.name).trim() === "") return;
                const option = document.createElement("option");
                option.value = item.name;
                option.textContent = item.name;
                option.dataset.point = item.point || 0;
                option.dataset.badge = item.badge || "-";
                option.dataset.color = item.color || "";
                vocalSelect.appendChild(option);
            });
        } else {
            // Fallback jika data belum siap
            console.warn("Vocal data not loaded yet.");
        }

        vocalSelect.addEventListener("change", function() {
            const selectedOption = this.options[this.selectedIndex];
            const pointEl = document.getElementById("vocalPoint");
            const badgeEl = document.getElementById("vocalBadge");
            
            if (!this.value) {
                pointEl.textContent = "+0";
                badgeEl.className = "badge-box";
                applyColorToStat("vocalPoint", "0", "vocal"); // Reset warna
                return;
            }
            
            const pointVal = "+" + selectedOption.dataset.point;
            pointEl.textContent = pointVal;
            
            badgeEl.textContent = selectedOption.dataset.badge;
            badgeEl.className = "badge-box"; 
            const targetClass = vocalColorMap[selectedOption.dataset.color];
            if (targetClass) badgeEl.classList.add(targetClass);

            // PENTING: Update warna point box
            applyColorToStat("vocalPoint", pointVal, "vocal");
        });
    }

// =========================
// 2. DANCE INPUT & LOGIC (FIXED CLASS HANDLING)
// =========================
const danceInput = document.getElementById("dance");
const dancePointEl = document.getElementById("dancePoint");
const danceBadgeEl = document.getElementById("danceBadge");

if (danceInput && dancePointEl && danceBadgeEl) {
    danceInput.addEventListener("input", function() {
        let val = this.value;
        
        // Reset tampilan jika kosong
        if (val === "") {
            dancePointEl.textContent = "+0";
            danceBadgeEl.textContent = "-";
            
            // PENTING: Hapus SEMUA class badge spesifik, sisakan hanya badge-box
            danceBadgeEl.className = "badge-box"; 
            
            applyColorToStat("dancePoint", "0", "dance");
            return;
        }

        let score = parseFloat(val);
        if (isNaN(score)) {
            dancePointEl.textContent = "+0";
            danceBadgeEl.className = "badge-box";
            applyColorToStat("dancePoint", "0", "dance");
            return;
        }
        
        let result = getDanceTier(score);
        const pointVal = "+" + result.point;
        dancePointEl.textContent = pointVal;
        danceBadgeEl.textContent = result.tier;
        
        // PENTING: Reset class dulu, lalu tambahkan class baru
        danceBadgeEl.className = "badge-box"; 
        danceBadgeEl.classList.add("badge-" + result.color);
        
        // Update warna point box
        applyColorToStat("dancePoint", pointVal, "dance");
    });
}

function getDanceTier(score) {
    let point = (score * 10); 
    // Pastikan 'color' yang dikembalikan sesuai dengan nama class di CSS (tanpa 'badge-')
    if (score <= 3.95) return { point: point, color: "dozen", tier: "Non-Dancer" }; // Merah
    if (score <= 5.95) return { point: point, color: "basic", tier: "Average" };      // Oranye
    if (score <= 7.95) return { point: point, color: "intermediate", tier: "Intermediate" }; // Hijau
    if (score <= 8.95) return { point: point, color: "advanced", tier: "Advanced" }; // Biru
    if (score <= 9.85) return { point: point, color: "proficient", tier: "Proficient" }; // Ungu
    return { point: point, color: "master", tier: "Ace Dancer" };                   // Hitam
}

// =========================
// RAP DROPDOWN & LOGIC (SUB-TIER DI DROPDOWN SAJA)
// =========================
const rapSelect = document.getElementById("rap");

if (rapSelect && typeof rapData !== 'undefined' && Array.isArray(rapData)) {
    rapSelect.innerHTML = '<option value="">Choose Raps...</option>';
    
    // 1. Opsi Nama Tier
    rapData.filter(item => item.name && !item.min).forEach(item => {
        const option = document.createElement("option");
        option.value = item.name;
        // Di Dropdown: Low.Nr (Low T7)
        option.textContent = item.subTier ? `${item.name} (${item.subTier})` : item.name;
        
        option.dataset.point = item.point;
        option.dataset.badge = item.badge; // Ini yang akan muncul di Badge Box nanti
        option.dataset.color = item.color;
        rapSelect.appendChild(option);
    });

    // 2. Generate Opsi Angka Berdasarkan Range
    rapData.filter(item => item.min !== undefined).forEach(range => {
        for (let score = range.min; score <= range.max + 0.001; score += 0.25) {
            const roundedScore = Math.round(score * 100) / 100; 
            if (roundedScore > range.max) break;

            const option = document.createElement("option");
            option.value = roundedScore;
            // Di Dropdown: 17.25 (Mid T5)
            option.textContent = range.subTier ? `${roundedScore.toFixed(2)} (${range.subTier})` : roundedScore.toFixed(2);
            
            option.dataset.point = range.point;
            option.dataset.badge = range.badge; // Ini yang akan muncul di Badge Box nanti
            option.dataset.color = range.color;
            rapSelect.appendChild(option);
        }
    });

    // 3. Event Listener
    rapSelect.addEventListener("change", function () {
        const selectedOption = this.options[this.selectedIndex];
        const pointEl = document.getElementById("rapPoint");
        const badgeEl = document.getElementById("rapBadge");
        
        if (!this.value) {
            pointEl.textContent = "+0";
            badgeEl.textContent = "-";
            badgeEl.className = "badge-box";
            applyColorToStat("rapPoint", "0", "rap");
            return;
        }

        const pointVal = "+" + selectedOption.dataset.point;
        pointEl.textContent = pointVal;
        
        // PENTING: Hanya ambil dataset.badge (Dozen/Great/dll), JANGAN ambil subTier
        badgeEl.textContent = selectedOption.dataset.badge;
        
        badgeEl.className = "badge-box"; 
        
        const targetClass = rapColorMap[selectedOption.dataset.color];
        if (targetClass) badgeEl.classList.add(targetClass);
        
        applyColorToStat("rapPoint", pointVal, "rap");
    });
} else if (rapSelect) {
    rapSelect.innerHTML = '<option value="">Data Rap Belum Siap...</option>';
}

    // =========================
    // 4. STAGE PRESENCE
    // =========================
    const spSelect = document.getElementById("sp");
    const sData = (typeof spData !== 'undefined' && Array.isArray(spData)) ? spData : [];

    if (spSelect) {
        spSelect.innerHTML = '<option value="">Choose Stage Presence...</option>';
        
        if (sData.length > 0) {
            sData.forEach(item => {
                if (!item.name || String(item.name).trim() === "") return;
                const option = document.createElement("option");
                option.value = item.name; 
                option.textContent = item.name; 
                option.dataset.point = item.point || 0;
                option.dataset.badge = item.badge || "-";
                option.dataset.color = item.color || "";
                spSelect.appendChild(option);
            });
        } else {
            console.warn("SP data not loaded yet.");
        }

        spSelect.addEventListener("change", function () {
            const selectedOption = this.options[this.selectedIndex];
            const pointEl = document.getElementById("spPoint");
            const badgeEl = document.getElementById("spBadge");
            
            if (!this.value) {
                pointEl.textContent = "+0";
                badgeEl.textContent = "-";
                badgeEl.className = "badge-box";
                applyColorToStat("spPoint", "0", "sp");
                return;
            }
            
            const pointVal = "+" + selectedOption.dataset.point;
            pointEl.textContent = pointVal;
            
            badgeEl.textContent = selectedOption.dataset.badge;
            badgeEl.className = "badge-box"; 
            const targetClass = spColorMap[selectedOption.dataset.color];
            if (targetClass) badgeEl.classList.add(targetClass);

            // PENTING: Update warna point box
            applyColorToStat("spPoint", pointVal, "sp");
        });
    }

    // =========================
    // 5. CREDIT SONGS LOGIC
    // =========================
    const creditInput = document.getElementById("credit");
    function getCreditTier(lagu) {
        if (lagu === 0) return { point: "0", color: "red", tier: "Dozen" };
        if (lagu >= 1 && lagu <= 9) return { point: (lagu / 10), color: "orange", tier: "Complete" };
        if (lagu >= 10 && lagu <= 19) return { point: (lagu / 10), color: "green", tier: "Good" };
        if (lagu >= 20 && lagu <= 29) return { point: (lagu / 10), color: "blue", tier: "Great" };
        if (lagu >= 30 && lagu <= 49) return { point: (lagu / 10), color: "purple", tier: "Ace" };
        if (lagu >= 50 && lagu <= 99) return { point: (lagu / 10), color: "black", tier: "Producer" };
        return { point: (lagu / 10), color: "brown", tier: "Perfect" };
    }

    if (creditInput) {
        creditInput.addEventListener("input", function() {
            let val = parseInt(this.value);
            if (isNaN(val) || val < 0) {
                val = 0;
                this.value = "";
            } else {
                this.value = val; 
            }
            const tierData = getCreditTier(val);
            const pointVal = "+" + tierData.point;
            document.getElementById("creditPoint").textContent = pointVal;
            const badgeEl = document.getElementById("creditBadge");
            badgeEl.textContent = tierData.tier;
            badgeEl.className = "badge-box";
            const targetClass = creditColorMap[tierData.color];
            if (targetClass) badgeEl.classList.add(targetClass);
            
            // PENTING: Update warna point box
            applyColorToStat("creditPoint", pointVal, "credit");
        });
    }

    // =========================
    // 6. VISUAL LOGIC
    // =========================
    const visualInput = document.getElementById("visual");
    function getVisualTier(percent) {
        percent = parseFloat(percent);
        if (isNaN(percent) || percent < 0) return { point: "0.0", color: "red", tier: "Low" };
        if (percent <= 29) return { point: (percent / 10), color: "red", tier: "Low" };
        if (percent <= 49) return { point: (percent / 10), color: "orange", tier: "Mid" };
        if (percent <= 69) return { point: (percent / 10), color: "green", tier: "High" };
        if (percent <= 79) return { point: (percent / 10), color: "blue", tier: "Great" };
        if (percent <= 89) return { point: (percent / 10), color: "purple", tier: "Graceful" };
        if (percent <= 99) return { point: (percent / 10), color: "black", tier: "Visualist" };
        return { point: "10.0", color: "brown", tier: "Perfect" };
    }

    if (visualInput) {
        visualInput.addEventListener("input", function() {
            let val = parseFloat(this.value);
            if (isNaN(val) || val < 0) val = 0;
            else if (val > 100) val = 100;

            const tierData = getVisualTier(val);
            const pointVal = "+" + tierData.point;
            document.getElementById("visualPoint").textContent = pointVal;
            const badgeEl = document.getElementById("visualBadge");
            badgeEl.textContent = tierData.tier;
            badgeEl.className = "badge-box";
            const targetClass = visualColorMap[tierData.color];
            if (targetClass) badgeEl.classList.add(targetClass);
            
            // PENTING: Update warna point box
            applyColorToStat("visualPoint", pointVal, "visual");
        });
    }

// =========================
// ANALYZE BUTTON LOGIC (FINAL STABLE VERSION)
// =========================
const analyzeBtn = document.getElementById('analyze');

if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        playSound('clickSound');
        const loading = document.getElementById("loadingScreen");
        if (loading) loading.style.display = "flex";

        setTimeout(() => {
            try {
                // --- 1. AMBIL NILAI DARI POINT BOX (Pastikan Bersih) ---
                const vocalP = parseFloat(getPointFromBox("vocalPoint")) || 0;
                const danceP = parseFloat(getPointFromBox("dancePoint")) || 0;
                const rapP = parseFloat(getPointFromBox("rapPoint")) || 0;
                const spP = parseFloat(getPointFromBox("spPoint")) || 0;
                const creditP = parseFloat(getPointFromBox("creditPoint")) || 0;
                const visualP = parseFloat(getPointFromBox("visualPoint")) || 0;

                const nameInput = document.getElementById("names").value.trim() || "Unknown";
                
                console.log("Analyze Start:", nameInput);

                // --- 2. PANGGIL AI SUMMARY DULU (SEBELUM CHART) ---

                // --- 3. BAGIAN CHART ---
                const ctx = document.getElementById("talentRadar");
                if (ctx) {
                    // Hancurkan chart lama secara total sebelum buat baru
                    if (window.talentChart) {
                        window.talentChart.destroy();
                        window.talentChart = null;
                    }

                    const v = vocalP || 0;
                    const d = danceP || 0;
                    const r = rapP || 0;
                    const s = spP || 0;
                    const c = creditP || 0;
                    const vis = visualP || 0;

                    const safeData = [
                        v > 0 ? Math.min(v * 1.5, 100) : 0,
                        d > 0 ? Math.min(d - 15.5, 100) : 0,
                        r > 0 ? Math.min(r * 1.8, 100) : 0,
                        s > 0 ? Math.min(s - 15, 100) : 0,
                        c > 0 ? Math.min(c * 5, 100) : 0,
                        vis > 0 ? Math.min(vis * 5.5, 100) : 0
                    ];

                    const radarShadowPlugin = {
                        id: 'radarShadow',
                        beforeDatasetDraw: function(chart) {
                            const ctx = chart.ctx;
                            ctx.save();
                            ctx.shadowColor = 'rgba(162, 89, 255, 0.8)'; 
                            ctx.shadowBlur = 20; 
                            ctx.restore();
                        }
                    };

                    window.talentChart = new Chart(ctx, {
                        type: "radar",
                        data: {
                            labels: ["Vocal", "Dance", "Rap", "Stage Presence", "Credit", "Visual"],
                            datasets: [{
                                label: "",
                                data: safeData,
                                backgroundColor: "rgba(162, 89, 255, 0.2)",
                                borderColor: "#b78cff",
                                borderWidth: 2,
                                pointBackgroundColor: "#fff",
                                pointBorderColor: "#c871ff",
                                pointRadius: 4,
                                pointHoverRadius: 7,
                                pointHoverBorderWidth: 3,
                                pointHoverBackgroundColor: "#a259ff"
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                r: {
                                    min: 0, max: 100, beginAtZero: true,
                                    angleLines: { color: "rgba(255,255,255,.12)" },
                                    grid: { circular: true, color: "rgba(255,255,255,.12)" },
                                    pointLabels: { color: "#fff", font: { size: 12, weight: 'bold' }, padding: 15 },
                                    ticks: { display: false, backdropColor: "transparent", stepSize: 10 }
                                }
                            },
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    enabled: true,
                                    backgroundColor: 'rgba(18, 18, 18, 0.95)',
                                    titleColor: '#a259ff', bodyColor: '#fff',
                                    borderColor: '#a259ff', borderWidth: 1, padding: 12,
                                    displayColors: false,
                                    callbacks: {
                                        title: () => null,
                                        label: function(context) {
                                            return `${context.label}: ${context.parsed.r.toFixed(1)}`;
                                        }
                                    }
                                }
                            },
                            animation: { duration: 1000, easing: 'easeOutQuart' }
                        },
                        plugins: [radarShadowPlugin]
                    });
                }

                  generateAISummary();
               
                // --- 4. LOGIKA STATUS & BONUS (ACE MENIMPA ALL-ROUNDER) ---
                let arStatus = "● BALANCED ●";
                let arBonus = 0;
                let unmetCount = 0;

                // Cek All-Rounder
                if (vocalP < 25) unmetCount++;
                if (danceP < 60) unmetCount++;
                if (rapP < 20) unmetCount++;
                if (spP < 70) unmetCount++;
                
                if (unmetCount === 0) {
                    arStatus = "★ ALL-ROUNDER ★";
                    arBonus = 0.05;
                } else if (unmetCount === 1) {
                    arStatus = "☆ ALMOST ALL-ROUNDER ☆";
                    arBonus = 0.01;
                }

                // Cek Ace (Menimpa)
                unmetCount = 0; 
                if (vocalP < 55) unmetCount++;
                if (danceP < 80) unmetCount++;
                if (rapP < 55) unmetCount++;
                if (spP < 90) unmetCount++;

                if (unmetCount === 0) {
                    arStatus = "♥︎ ACE ♥︎";
                    arBonus = 0.15;
                } else if (unmetCount === 1 && arBonus < 0.10) { 
                    arStatus = "♡ ALMOST ACE ♡";
                    arBonus = 0.10;
                }

                // --- 5. PERHITUNGAN SKOR AKHIR ---
                const totalRaw = vocalP + danceP + rapP + spP + creditP + visualP + arBonus;
                const dividedBy4 = totalRaw / 4;
                const truncated = Math.floor(dividedBy4 * 10) / 10;
                
                const formula = `(${vocalP} + ${danceP} + ${rapP} + ${spP} + ${creditP} + ${visualP} + ${arBonus.toFixed(2)}) ÷ 4`;

                document.getElementById("formulaText").textContent = formula;
                document.getElementById("averageText").textContent = `= ${(totalRaw / 4).toFixed(2)}`;
                
                let finalScore = (truncated / 10) + 2;

                // Tentukan Nama Tier
                let tierName = "Dozen Idol";
                if (finalScore >= 10) tierName = "Perfect Idol";
                else if (finalScore >= 9) tierName = "Top Idol";
                else if (finalScore >= 8) tierName = "Great Idol";
                else if (finalScore >= 7) tierName = "Good Idol";
                else if (finalScore >= 6) tierName = "Above A. Idol";
                else if (finalScore >= 5) tierName = "Average Idol";

                // Update UI Skor & Nama
                const scoreEl = document.getElementById("finalScore");
                const tierEl = document.getElementById("tierText");
                const nameEl = document.getElementById("resultName");
                const arEl = document.getElementById("arStatus");
                const bonusEl = document.getElementById("bonusText");

                if (nameEl) nameEl.textContent = nameInput || "Unknown";
                
                if (scoreEl) {
                    animateScore(scoreEl, finalScore);
                    if (finalScore >= 10) {
                        scoreEl.style.color = "#e0b0ff"; 
                        scoreEl.style.textShadow = "0 0 15px rgba(162, 89, 255, 0.8)";
                    } else if (finalScore >= 8) {
                        scoreEl.style.color = "#dcd6f7"; 
                        scoreEl.style.textShadow = "0 0 10px rgba(100, 50, 150, 0.6)";
                    } else if (finalScore >= 6) {
                        scoreEl.style.color = "#a2d2ff"; 
                        scoreEl.style.textShadow = "0 0 10px rgba(56, 189, 248, 0.5)";
                    } else {
                        scoreEl.style.color = "#ffcccc"; 
                        scoreEl.style.textShadow = "0 0 8px rgba(255, 100, 100, 0.4)";
                    }
                }

setTimeout(() => {
    // 1. HITUNG DULU SEMUA POIN (vocalP, danceP, dll)

    // 2. BUAT OBJEK window.lastAnalysis TERLEBIH DAHULU
    window.lastAnalysis = {
        name: nameInput,
        vocal: document.getElementById("vocal").value,
        vocalPoint: vocalP,   // <--- PASTIKAN vocalP SUDAH BERISI ANGKA
        dance: document.getElementById("dance").value,
        dancePoint: danceP,   // <--- PASTIKAN danceP SUDAH BERISI ANGKA
        rap: document.getElementById("rap").value,
        rapPoint: rapP,       // <--- PASTIKAN rapP SUDAH BERISI ANGKA
        sp: document.getElementById("sp").value,
        spPoint: spP,         // <--- PASTIKAN spP SUDAH BERISI ANGKA
        credit: document.getElementById("credit").value,
        creditPoint: creditP,
        visual: document.getElementById("visual").value,
        visualPoint: visualP, // <--- PASTIKAN visualP SUDAH BERISI ANGKA
        
        formula: document.getElementById("formulaText").textContent,
        bonus: arBonus,
        status: arStatus,
        score: finalScore,
        tier: tierName,
        grade: currentFinalGrade, 
        insight: currentComment
    };
    
updatePremiumAchievement(window.lastAnalysis);

    // 4. Update UI lainnya
    if (gradeBadge) gradeBadge.textContent = finalGrade;
    if (insightText) insightText.textContent = comment;

}, 1500);

                // --- 7. UPDATE BADGE TIER & STATUS ---
                if (tierEl) {
                    tierEl.textContent = tierName;
                    tierEl.className = "tier-text"; 
                    tierEl.style.color = "#ffffff";
                    tierEl.style.textShadow = "none";
                    
                    let badgeBg = "#576574"; 
                    if (tierName === "Perfect Idol") badgeBg = "linear-gradient(135deg, #000000, #8a2be2)";
                    else if (tierName === "Top Idol") badgeBg = "linear-gradient(135deg, #9012eb, #1a1a1a)";
                    else if (tierName === "Great Idol") badgeBg = "linear-gradient(135deg, #325fe6, #9752d3)";
                    else if (tierName === "Good Idol") badgeBg = "linear-gradient(135deg, #64f265, #59a0ef)";
                    else if (tierName === "Above A. Idol") badgeBg = "linear-gradient(135deg, #32d454, #34dbaf)";
                    else if (tierName === "Average Idol") badgeBg = "linear-gradient(135deg, #e67f00, #ff4900)";
                    else if (tierName === "Dozen Idol") badgeBg = "linear-gradient(135deg, #ff3f0e, #ff6f1a)";

                    tierEl.style.background = badgeBg;
                }

                if (arEl) {
                    arEl.textContent = arStatus;
                    arEl.style.display = "inline-block";
                    arEl.style.visibility = "visible";
                    arEl.style.color = "#0a0a0a";
                    arEl.style.background = "linear-gradient(135deg,#8300e1,#7a97ef)";
                    arEl.style.padding = "10px 18px";
                    arEl.style.borderRadius = "999px";
                    arEl.style.fontWeight = "600";
                    arEl.style.letterSpacing = "1px";
                    arEl.style.boxShadow = "0 0 18px rgba(162,89,255,.35)";
                }

                if (bonusEl) {
                    if (arBonus > 0) {
                        bonusEl.textContent = `✦ BONUS +${arBonus.toFixed(2)}`;
                        bonusEl.style.display = "block";
                        bonusEl.style.color = "#cbb7ff";
                        bonusEl.style.textShadow = "0 0 10px rgba(203,183,255,.35)";
                        bonusEl.style.fontWeight = "600";
                        bonusEl.style.fontSize = "14px";
                        bonusEl.style.marginTop = "10px";
                    } else {
                        bonusEl.style.display = "none";
                    }
                }

                // --- 8. TAMPILKAN RESULT CARD ---
                const resultCard = document.getElementById("resultCard");
                if (resultCard) {
                    resultCard.style.display = "block";
                    setTimeout(() => { resultCard.scrollIntoView({ behavior: "smooth" }); }, 50);
                }

                showCompareButtons(); 

                try {
                    playSound('successSound');
                    if (finalScore >= 8.5 && typeof triggerConfetti === 'function') {
                        triggerConfetti();
                    }
                } catch (e) { console.warn("⚠️ Sound/Confetti failed:", e); }

            } catch (err) {
                console.error("CRITICAL ERROR:", err);
                alert("Error: " + err.message);
            } finally {
                if (loading) loading.style.display = "none";
            }
        }, 2700);
    });
}
  
// =========================
// COPY RESULT FUNCTIONS (SAFE VERSION)
// =========================

function getSortedDistribution(data) {
    // Ambil dari global stats yang sudah dihitung rumusnya
    if (!window.currentStatsList) return [];
    
    return window.currentStatsList.map(stat => ({
        name: stat.name,
        value: stat.val // Pastikan ini yang dipakai, karena 'val' sudah dikali rumus (misal vocal x1.5)
    })).sort((a, b) => b.value - a.value);
}


// 1️ TOMBOL: COPY RESULT (Only Talent 🎤)
const btnTalent = document.getElementById("copyResult");
if (btnTalent) {
    btnTalent.addEventListener("click", async () => {
        if (!window.lastAnalysis) return showToast("Analyze an idol first!");
        
        const d = window.lastAnalysis;
        const text = `NEXORA Talent Analysis

${d.name}

• Vocal: ${d.vocal} | +${d.vocalPoint} (${vocalBadge.textContent})

• Dance: ${d.dance} | +${d.dancePoint} (${danceBadge.textContent})

• Rap: ${d.rap} | +${d.rapPoint} (${rapBadge.textContent})

• SP: ${d.sp} | +${d.spPoint} (${spBadge.textContent})

• Credit Songs: ${d.credit}+ | +${d.creditPoint} (${creditBadge.textContent})

• Visual: ${d.visual}% | +${d.visualPoint} (${visualBadge.textContent})

━━━━━━━━━━━━━━━━━━━━━━━

Status: ${d.status} (+${d.bonus.toFixed(2)})

Total:
${document.getElementById("formulaText").textContent} ${document.getElementById("averageText").textContent}

Score: ${d.score.toFixed(2)} (${d.tier})`;

        try {
            await navigator.clipboard.writeText(text);
            showToast("🎤 Result copied!");
        } catch (err) { showToast("Copy failed!"); }
    });
}

const btnCard = document.getElementById("copyResultCard");
if (btnCard) {
    btnCard.addEventListener("click", async () => {
        // 1. CEK DATA DASAR
        if (!window.lastAnalysis) return showToast("Analyze an idol first!");
        
        const d = window.lastAnalysis;
       

        // 3. AMBIL BADGE TEXT DARI UI (JANGAN DARI DATA MENTAH AGAR LEBIH AKURAT)
        // Pastikan ID elemen ini sesuai dengan HTML-mu
        const vBadge = document.getElementById("vocalBadge")?.textContent || "N/A";
        const dBadge = document.getElementById("danceBadge")?.textContent || "N/A";
        const rBadge = document.getElementById("rapBadge")?.textContent || "N/A";
        const sBadge = document.getElementById("spBadge")?.textContent || "N/A";
        const cBadge = document.getElementById("creditBadge")?.textContent || "N/A";
        const visBadge = document.getElementById("visualBadge")?.textContent || "N/A";

        // 4. HITUNG DISTRIBUTION & GAP
        let sortedDist = [];
        if (window.currentStatsList && window.currentStatsList.length > 0) {
            sortedDist = window.currentStatsList.map(stat => ({
                name: stat.name,
                value: Math.min(stat.val, 100) 
            })).sort((a, b) => b.value - a.value);
        } else {
            // Fallback manual
            sortedDist = [
    { name: "SP", value: Math.min(d.spPoint || 0, 100) },
    { name: "Dance", value: Math.min(d.dancePoint || 0, 100) },
    { name: "Vocal", value: Math.min(d.vocalPoint || 0, 100) },
    { name: "Rap", value: Math.min(d.rapPoint || 0, 100) },
    { name: "Credit", value: Math.min(d.creditPoint || 0, 100) },
    { name: "Visual", value: Math.min(d.visualPoint || 0, 100) }
].sort((a, b) => b.value - a.value);
}

        const highest = sortedDist[0] || {name: "N/A", value: 0};
        const lowest = sortedDist[sortedDist.length - 1] || {name: "N/A", value: 0};
        const gap = Math.abs(highest.value - lowest.value).toFixed(1);
        
        let specLabel = "Balanced Profile";
        if (gap >= 70) specLabel = "Extreme specialization detected";
        else if (gap >= 40) specLabel = "Strong specialization";
        else if (gap >= 20) specLabel = "Mild specialization";

        const distLines = sortedDist.map(item => `• ${item.name}: ${Math.round(item.value)}%`).join("\n");


const finalGrade = currentFinalGrade;
const comment = currentComment;
        
        // Ambil data achievement premium
        const achIcon = document.querySelector(".badge-icon")?.textContent || "";
        const achTitle = document.querySelector(".badge-title")?.textContent || "";
        let achLine = "";
        if (achTitle) {
            achLine = `\n🏆 Achievement: ${achIcon} ${achTitle}`;
        }

        // 6. SUSUN TEKS FINAL
        const text = `
NEXORA TALENT ANALYSIS

${d.name}

• Vocal: ${d.vocal} | +${d.vocalPoint} (${vBadge})

• Dance: ${d.dance} | +${d.dancePoint} (${dBadge})

• Rap: ${d.rap} | +${d.rapPoint} (${rBadge})

• SP: ${d.sp} | +${d.spPoint} (${sBadge})

• Credit: ${d.credit} | +${d.creditPoint} (${cBadge})

• Visual: ${d.visual} | +${d.visualPoint} (${visBadge})

━━━━━━━━━━━━━━━━━━━━━━━
Status: ${d.status} (${d.bonus > 0 ? '+' + d.bonus : 'No Bonus'})

Score: ${d.score.toFixed(2)} (${d.tier})

━━━━━━━━━━━━━━━━━━━━━━━
INSIGHT

Grade • ${currentFinalGrade} •
"${currentComment}"

Talent Distribution
${distLines}

Skill Gap:
${highest.name} (Gap: ${gap}) ${lowest.name}
${specLabel}
`.trim();

        // 7. COPY KE CLIPBOARD
        try {
            await navigator.clipboard.writeText(text);
            showToast("✅ Full Result Copied to Clipboard!");
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast("❌ Failed to copy text.");
        }
    });
}

const exportBtn = document.getElementById("exportImage");

if (exportBtn) {

    exportBtn.addEventListener("click", () => {

        const card = document.getElementById("resultCard");

        html2canvas(card, {
            scale: 3,
            backgroundColor: "#0b1020",
            useCORS: true
        }).then(canvas => {

            const link = document.createElement("a");
            link.download = `NEXORA-${document.getElementById("names").value || "Unknown"}.png`;

            link.href = canvas.toDataURL("image/png");

            link.click();

            showToast("Image exported! 📷");

        });

    });

}

// =========================
// NEXORA TOAST SYSTEM
// =========================
function showNexoraToast(message) {
    const toast = document.getElementById('nexoraToast');
    const msgSpan = document.getElementById('toastMessage');
    
    if (!toast || !msgSpan) {
        console.error("Toast element not found!"); 
        return;
    }
    
    msgSpan.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Tampil selama 3 detik
}

// =========================
// NEXORA TIER TEXT SYSTEM
// =========================
function getTierText(score) {
    score = parseFloat(score);
    if (score >= 10) return "Perfect Idol";
    if (score >= 9) return "Top Idol";
    if (score >= 8) return "Great Idol";
    if (score >= 7) return "Good Idol";
    if (score >= 6) return "Above A. Idol";
    if (score >= 5) return "Average Idol";
    return "Dozen Idol";
}

// =========================
// NEXORA COMPARE SYSTEM (FIXED FOR YOUR HTML IDs)
// =========================
let compareList = [];
let compareHistory = JSON.parse(localStorage.getItem('nexoraCompareHistory')) || [];

// --- HELPER: AMBIL NILAI POIN ---
function getPointValue(id) {
    const el = document.getElementById(id);
    if (!el) return "0";
    let val = el.textContent.trim().replace(/\s/g, '');
    if (val === "" || val === "-") return "0";
    if (!val.startsWith("-") && !val.startsWith("+") && val !== "0") return "+" + val;
    return val;
}

// =========================
// EDIT IDOL FROM COMPARE LIST (FINAL INTEGRATED VERSION)
// =========================
window.editIdolFromList = function(index) {
    const idolData = compareList[index];
    if (!idolData) return;

    console.log("✏️ Editing Idol:", idolData.name);

    // 1. ISI NAMA
    document.getElementById("names").value = idolData.name || "";
    
    // 2. RESET SEMUA ELEMEN KE STATE AWAL TERLEBIH DAHULU
    ["vocal", "rap", "sp"].forEach(id => {
        const select = document.getElementById(id);
        if (select) select.selectedIndex = 0; // Kembalikan ke "Choose..."
    });
    ["dance", "visual", "credit"].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = ""; // Pastikan kosong agar placeholder muncul
    });

    // 3. ISI NILAI HANYA JIKA DATA VALID
    const isOptionValid = (selectId, val) => {
        const select = document.getElementById(selectId);
        if (!select || !val) return false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === String(val)) return true;
        }
        return false;
    };

    if (idolData.vocal && idolData.vocal !== "-" && isOptionValid("vocal", idolData.vocal)) {
        document.getElementById("vocal").value = idolData.vocal;
    }
    if (idolData.rap && idolData.rap !== "-" && isOptionValid("rap", idolData.rap)) {
        document.getElementById("rap").value = idolData.rap;
    }
    if (idolData.sp && idolData.sp !== "-" && isOptionValid("sp", idolData.sp)) {
        document.getElementById("sp").value = idolData.sp;
    }
    if (idolData.dance && idolData.dance !== "-") {
        document.getElementById("dance").value = String(idolData.dance).replace(/[^0-9.]/g, '');
    }
    if (idolData.visual && idolData.visual !== "-") {
        document.getElementById("visual").value = String(idolData.visual).replace(/[^0-9.%]/g, '');
    }
    if (idolData.credit && idolData.credit !== "-" && idolData.credit !== "–") {
        document.getElementById("credit").value = String(idolData.credit).replace(/[^0-9]/g, '');
    }

    // 4. HAPUS DARI LIST COMPARE & SCROLL KE ATAS
    compareList.splice(index, 1);
    updateCompareUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // 5. TRIGGER AUTO-REANALYZE (PENTING!)
    // Kita beri jeda sedikit agar UI inputan selesai terisi dulu
    setTimeout(() => {
        // Panggil fungsi analisis instan yang sudah kita buat sebelumnya
        if (typeof performInstantAnalysis === 'function') {
            performInstantAnalysis(); 
        } else {
            // Fallback jika fungsi instant belum ada, panggil generateAISummary manual
            generateAISummary();
            updateSkillGapIndicator();
            renderTalentDistribution();
            // Update Chart Manual jika perlu
            const ctx = document.getElementById("talentRadar");
            if (ctx && window.talentChart) {
                // Ambil poin terbaru dari box
                const v = parseFloat(getPointFromBox("vocalPoint")) || 0;
                const d = parseFloat(getPointFromBox("dancePoint")) || 0;
                const r = parseFloat(getPointFromBox("rapPoint")) || 0;
                const s = parseFloat(getPointFromBox("spPoint")) || 0;
                const c = parseFloat(getPointFromBox("creditPoint")) || 0;
                const vis = parseFloat(getPointFromBox("visualPoint")) || 0;

                window.talentChart.data.datasets[0].data = [
                    Math.min(v * 1.5, 100),
                    Math.min(d - 15.5, 100),
                    Math.min(r * 1.8, 100),
                    Math.min(s - 15, 100),
                    Math.min(c * 5, 100),
                    Math.min(vis * 5.5, 100)
                ];
                window.talentChart.update();
            }
        }

        // 6. UPDATE DROPDOWN DATABASE
        // Simpan data yang sedang diedit ke database global agar tersimpan di dropdown
        if (window.lastAnalysis) {
            saveIdolToDatabase(window.lastAnalysis);
        }
        
        showToast(`✏️ Editing "${idolData.name}"... Data Loaded!`);
    }, 300);
};



// --- FUNGSI UPDATE TAMPILAN LIST (UPDATED) ---
function updateCompareUI() {
    const startBtn = document.getElementById("startCompare");
    const card = document.getElementById("compareCard");
    const list = document.getElementById("compareListDisplay");
    const totalEl = document.getElementById("compareTotal");
    
    if (!card || !list) return;

    if (totalEl) totalEl.textContent = `Total : ${compareList.length} / 20`;

    if (compareList.length === 0) {
        list.innerHTML = `<p class="empty-msg">No idols saved yet.</p>`;
        if (startBtn) startBtn.style.display = "none";
    } else {
        list.innerHTML = "";
        compareList.forEach((idol, index) => {
            // TAMBAHKAN TOMBOL EDIT DI SINI
            list.innerHTML += `
                <div class="idol-item">
                    <span class="idol-name">${index + 1}. ${idol.name}</span>
                    <div class="idol-actions">
                        <button class="btn-edit-idol" onclick="editIdolFromList    (${index})">✎</button>
                        <span class="idol-status">SAVED</span>
                    </div>
                </div>
            `;
        });

        if (compareList.length === 1) {
            list.innerHTML += `
                <div style="margin-top:15px; padding:13px; background:rgba(250,204,21,0.1); border:1px solid #facc15; border-radius:8px; color:#facc15; font-size:12px; text-align:center;">
                    ⚠️ Add at least 1 more idol to start!
                </div>
            `;
            if (startBtn) startBtn.style.display = "none";
        } else {
            if (startBtn) startBtn.style.display = "block";
        }
    }
    renderHistoryUI();
}


// --- FUNGSI RENDER HISTORY ---
function renderHistoryUI() {
    const historyContainer = document.getElementById("historyListDisplay");
    if (!historyContainer) return;

    if (compareHistory.length === 0) {
        historyContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#555; font-style:italic;"><p>No history found.</p></div>`;
        return;
    }

    historyContainer.innerHTML = `<div class="history-title">📜 Nexora Archives</div>`;
    
    [...compareHistory].reverse().forEach((session, idx) => {
        const realIndex = compareHistory.length - 1 - idx;
        const names = session.idols.map(i => i.name).join(", ");
        const winner = session.idols[0].name; 
        const dateStr = new Date(session.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        
        historyContainer.innerHTML += `
            <div class="history-item">
                <div class="history-info">
                    <h4>👑 ${winner}</h4>
                    <p>${dateStr} • ${names}</p>
                </div>
                <div class="history-actions">
                    <button class="btn-load-history" onclick="loadHistory(${realIndex})">Load</button>
                    <button class="btn-delete-history" onclick="deleteHistory(${realIndex})">🗑</button>
                </div>
            </div>
        `;
    });
}

// =========================
// MEMBER / GROUP TAB
// =========================
const memberTab = document.getElementById("memberTab");
const groupTab = document.getElementById("groupTab");

const memberPanel = document.getElementById("memberPanel");
const groupPanel = document.getElementById("groupPanel");

if (memberTab && groupTab) {

    memberTab.addEventListener("click", () => {
        memberTab.classList.add("active");
        groupTab.classList.remove("active");

        memberPanel.style.display = "block";
        groupPanel.style.display = "none";
    });

    groupTab.addEventListener("click", () => {
        groupTab.classList.add("active");
        memberTab.classList.remove("active");

        memberPanel.style.display = "none";
        groupPanel.style.display = "block";

        generateGroupAnalysis();
    });

}

function getVocalTier(point) {

    point = Number(point);

    // Cari tier yang paling mendekati
    let closest = vocalData[0];

    vocalData.forEach(item => {
        if (Math.abs(item.point - point) < Math.abs(closest.point - point)) {
            closest = item;
        }
    });

    return closest.name;
}

// =========================
// GROUP ANALYSIS
// =========================
function generateGroupAnalysis() {

    if (compareList.length < 2) return;

let totalVocal = 0;
let totalDance = 0;
let totalRap = 0;
let totalSP = 0;
let totalCredit = 0;
let totalVisual = 0;
let totalScore = 0;

compareList.forEach(idol => {
    totalVocal += Number(idol.vocalPoint) || 0;
totalDance += Number(idol.dancePoint) || 0;
totalRap += Number(idol.rapPoint) || 0;
totalSP += Number(idol.spPoint) || 0;
totalCredit += Number(idol.creditPoint) || 0;
totalVisual += Number(idol.visualPoint) || 0;
totalScore += Number(idol.score) || 0;
});

const member = compareList.length;

const avgVocal = totalVocal / member;
const avgDance = totalDance / member;
const avgRap = totalRap / member;
const avgSP = totalSP / member;
const avgCredit = totalCredit / member;
const avgVisual = totalVisual / member;
const avgScore = totalScore / member;

document.getElementById("groupScore").textContent = avgScore.toFixed(2);
document.getElementById("groupTier").textContent = getTierText(avgScore);

document.getElementById("avgVocal").textContent = getVocalTier(avgVocal);
document.getElementById("avgDance").textContent = roundDance(avgDance).toFixed(2);
document.getElementById("avgRap").textContent = roundRap(avgRap).toFixed(2);
document.getElementById("avgSP").textContent = Math.round(avgSP) + "/20";
document.getElementById("avgCredit").textContent = Math.round(avgCredit);
document.getElementById("avgVisual").textContent = Math.round(avgVisual);
}

function roundDance(val){
    return Math.round(val / 0.05) * 0.05;
}

function roundRap(val){
    return Math.round(val / 0.25) * 0.25;
}

// =========================
// SCORE COUNT UP
// =========================
function animateScore(element, target) {

    let current = 0;

    const duration = 1200;
    const fps = 60;

    const increment = target / (duration / (1000 / fps));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

element.style.animation = "scorePop .35s";

setTimeout(() => {
    element.style.animation = "";
}, 350);

        element.textContent = current.toFixed(2);

    }, 1000 / fps);

}

// =========================
// HISTORY ACTIONS (ENGLISH VERSION)
// =========================

// 1. Saat Menghapus Satu History
window.deleteHistory = function(index) {
    // TAHAP 1: Jika belum ada target, simpan index dan tampilkan pesan pertama
    if (deleteTargetIndex === null) {
        deleteTargetIndex = index;
        showToast("⚠️ Click '🗑' again to confirm!");
        return; // Hentikan fungsi di sini, jangan hapus dulu
        }
 // TAHAP 2: Jika user klik lagi dan indexnya sama, baru hapus
    if (deleteTargetIndex === index) {
        compareHistory.splice(index, 1); // Hapus data
        localStorage.setItem('nexoraCompareHistory', JSON.stringify(compareHistory));
        
        renderHistoryUI(); // Refresh tampilan
        
        showToast("🗑️ Archive deleted successfully!");
        
        // Reset target setelah berhasil dihapus
        deleteTargetIndex = null; 
    } else {
        // Jika user klik tombol hapus lain di tengah-tengah, ganti targetnya
        deleteTargetIndex = index;
        showToast("⚠️ Click 'Delete' again to confirm!");
    }
};


// 2. Saat Me4muat History
window.loadHistory = function(index) {
    const session = compareHistory[index];
    if (session) {
        compareList = [...session.idols];
        updateCompareUI();
        showToast("✨ Archive loaded successfully!");
        document.getElementById("compareCard").scrollIntoView({ behavior: 'smooth' });
    }
};

// 3. Saat Menghapus Semua History (Clear All)
function clearHistory() {
    if (confirm("Delete all archives permanently?")) {
        compareHistory = [];
        localStorage.removeItem('nexoraCompareHistory');
        renderHistoryUI();
        showToast("🧹 All archives cleared!");
    }
}

// 4. Saat Menyimpan Idol Baru
// (Cari bagian saveBtn.addEventListener di kodemu, lalu ubah pesannya)
// Contoh:
// showNexoraToast(`${name} has been added to the list!`);

function saveCurrentSession() {
    if (compareList.length < 2) return;
    let sortedSession = [...compareList].sort((a, b) => b.overall - a.overall);
    const newSession = { date: new Date().toISOString(), idols: sortedSession };
    compareHistory.push(newSession);
    localStorage.setItem('nexoraCompareHistory', JSON.stringify(compareHistory));
    renderHistoryUI();
}

// --- EVENT LISTENER: SAVE BUTTON (FIXED ID: 'names') ---
const saveBtn = document.getElementById("saveCompare");
if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        // PERHATIAN: ID di HTML kamu adalah 'names', bukan 'resultName'
        const name = document.getElementById("names")?.value.trim(); 
        const overall = parseFloat(document.getElementById("finalScore")?.textContent);

        // 1. Ambil Poin Angka
        const vocal = getPointValue("vocalPoint");
        const dance = getPointValue("dancePoint");
        const rap = getPointValue("rapPoint");
        const sp = getPointValue("spPoint");
        
        // 2. AMBIL TEKS TIER DARI BADGE
        const vocalTier = document.getElementById("vocalBadge")?.textContent || "-";
        const danceTier = document.getElementById("danceBadge")?.textContent || "-";
        const rapTier = document.getElementById("rapBadge")?.textContent || "-";
        const spTier = document.getElementById("spBadge")?.textContent || "-";

        let credit = getPointValue("creditPoint");
        if (credit === "0" || credit === "+0") {
            const inputVal = document.getElementById("credit")?.value;
            credit = inputVal ? "+" + inputVal : "–";
        }
        
        let visual = getPointValue("visualPoint");
        if (visual === "0" || visual === "+0") {
            const inputVal = document.getElementById("visual")?.value;
            visual = inputVal ? inputVal + "%" : "–";
        }

        if (!name || isNaN(overall)) { showToast("Analyze first!"); return; }
        if (compareList.some(i => i.name === name)) { showToast("Already added!"); return; }
        if (compareList.length >= 20) { showToast("Maximum 20 idols!"); return; }

        // 3. Simpan dengan Format Lengkap
       compareList.push({

    name,

    overall,

    score: window.lastAnalysis.score,

    vocal,
    vocalTier,
    vocalPoint: window.lastAnalysis.vocalPoint,

    dance,
    danceTier,
    dancePoint: window.lastAnalysis.dancePoint,

    rap,
    rapTier,
    rapPoint: window.lastAnalysis.rapPoint,

    sp,
    spTier,
    spPoint: window.lastAnalysis.spPoint,

    credit,
    creditPoint: window.lastAnalysis.creditPoint,

    visual,
    visualPoint: window.lastAnalysis.visualPoint

});

updateCompareUI();
showToast(`${name} added!`);
});
}
// 2. START COMPARE (WITH TIE DETECTION LOGIC)
const startBtnGlobal = document.getElementById("startCompare");
if (startBtnGlobal) {
    startBtnGlobal.addEventListener("click", () => {
        if (compareList.length < 2) return;
        saveCurrentSession();

        const overlay = document.getElementById("rankingOverlay");
        const rankingList = document.getElementById("rankingList");
        
        if (overlay && rankingList) {
            rankingList.innerHTML = ""; 
            
            // A. OVERALL RANKING
            let sortedOverall = [...compareList].sort((a, b) => b.overall - a.overall);
            let overallHtml = `<div class="overlay-ranking-header">🏆 OVERALL RANKING</div>`;
            
            sortedOverall.forEach((idol, index) => {
                let medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index+1}.`;
                
                // LOGIKA TIE UNTUK OVERALL
                let tieLabel = '';
                if (index > 0 && idol.overall === sortedOverall[index-1].overall) {
                    tieLabel = '<span style="color:#ffd700; font-size:11px; margin-left:5px;">( Tie! 🤝 )</span>';
                }

                overallHtml += `
                    <div class="overlay-ranking-item" style="background:rgba(162,89,255,0.1); border:1px solid rgba(162,89,255,0.3); padding:10px; border-radius:8px; margin-bottom:5px; display:flex; justify-content:space-between;">
                        <span style="font-weight:bold; min-width: 100px;">${medal} ${idol.name}${tieLabel}</span>
                        <span class="overlay-ranking-score">${idol.overall.toFixed(2)} (${getTierText(idol.overall)})</span>
                    </div>
                `;
            });
            rankingList.innerHTML += overallHtml;

            // B. DETAIL KATEGORI (FULL INLINE STYLE + TIE DETECTION)
            function renderSection(title, key) {
                let sorted = [...compareList].sort((a, b) => {
                    let valA = parseFloat(String(a[key]).replace(/[^\d.-]/g, '')) || 0;
                    let valB = parseFloat(String(b[key]).replace(/[^\d.-]/g, '')) || 0;
                    return valB - valA;
                });
                
                // CARD UTAMA KATEGORI
                let html = `
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(162,89,255,0.2); border-radius:16px; padding:15px; margin-top:15px;">
                        <div style="font-size:12px; color:#a259ff; font-weight:800; letter-spacing:2px; text-transform:uppercase; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid rgba(162,89,255,0.15);">${title}</div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                `;
                
                sorted.forEach((idol, index) => {
                    let medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index+1}.`;
                    
                    // LOGIKA TIE UNTUK KATEGORI
                    let tieLabel = '';
                    let currentVal = parseFloat(String(idol[key]).replace(/[^\d.-]/g, '')) || 0;
                    let prevVal = index > 0 ? (parseFloat(String(sorted[index-1][key]).replace(/[^\d.-]/g, '')) || 0) : null;
                    
                    if (index > 0 && currentVal === prevVal) {
                        tieLabel = '<span style="color:#ffd700; font-size:11px; margin-left:5px;">( Tie! 🤝 )</span>';
                    }

                    // BACKGROUND BERBEDA UNTUK JUARA 1, 2, 3
                    let bgStyle = "background:rgba(0,0,0,0.2);";
                    let borderLeft = "";
                    
                    if (index === 0) {
                        bgStyle = "background:rgba(162,89,255,0.15);";
                        borderLeft = "border-left:3px solid #ffd700;";
                    } else if (index === 1) {
                        bgStyle = "background:rgba(162,89,255,0.1);";
                        borderLeft = "border-left:3px solid #c0c0c0;";
                    } else if (index === 2) {
                        bgStyle = "background:rgba(162,89,255,0.08);";
                        borderLeft = "border-left:3px solid #cd7f32;";
                    }

                    html += `
                        <div style="${bgStyle} ${borderLeft} display:flex; justify-content:space-between; align-items:center; padding:8px 10px; border-radius:8px; font-size:13px; color:#fff;">
                            <span style="font-weight:600;">${medal} ${idol.name}${tieLabel}</span>
                            <span style="font-family:'Courier New',monospace; font-weight:bold; color:#a259ff;">${idol[key]}</span>
                        </div>
                    `;
                });
                
                html += `</div></div>`; 
                rankingList.innerHTML += html;
            }

            renderSection("Vocal", "vocal");
            renderSection("Dance", "dance");
            renderSection("Rap", "rap");
            renderSection("Stage Presence", "sp");
            renderSection("Credit Songs", "credit");
            renderSection("Visual", "visual");

            // C. SUMMARY DI BAWAH
            rankingList.innerHTML += `
                <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px; text-align: center;">
                    <div style="font-size: 12px; color: #888;">TOTAL IDOLS COMPARED</div>
                    <div style="font-size: 20px; font-weight: bold; color: #a259ff;">${compareList.length} IDOLS</div>
                </div>
            `;

            overlay.style.display = "flex";
            void overlay.offsetWidth; 
            overlay.classList.add('show');
        }
    });
}

// --- CLOSE & RESET ---
const closeRankingBtn = document.getElementById("closeRanking");
if (closeRankingBtn) {
    closeRankingBtn.addEventListener("click", () => {
        const overlay = document.getElementById("rankingOverlay");
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => { overlay.style.display = "none"; }, 300);
        }
    });
}

const resetBtn = document.getElementById("resetCompare");
if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        compareList = [];
        updateCompareUI();
        showToast("List cleared! ");
    });
}

const openBtn = document.getElementById("openCompare");
if (openBtn) {
    openBtn.addEventListener("click", () => {
        const card = document.getElementById("compareCard");
        if (card) {
            updateCompareUI();
            card.style.display = card.style.display === "none" ? "block" : "none";
        }
    });
}

// --- NEXORA AI SUMMARY (FIXED ORIGINAL VERSION) ---
function generateAISummary() {
    console.log("🤖 Nexora AI Summary started...");

    // 1. AMBIL DATA DARI INPUTAN
    const nameInput = document.getElementById('names');
    const name = nameInput ? nameInput.value.trim() : "This Idol";
    
    const v = parseFloat(getPointFromBox("vocalPoint")) || 0;
    const d = parseFloat(getPointFromBox("dancePoint")) || 0;
    const r = parseFloat(getPointFromBox("rapPoint")) || 0;
    const s = parseFloat(getPointFromBox("spPoint")) || 0;
    const b = parseFloat(getPointFromBox("arBonus")) || 0;
    const credit = parseFloat(getPointFromBox("creditPoint")) || 0; 
    const visual = parseFloat(getPointFromBox("visualPoint")) || 0;

    const coreTotal = v + d + r + s + credit + visual + b;
    const coreAvg = coreTotal / 4; 

    // =======================
    // CALCULATE ALL 6 SKILLS & TOTAL SCORES
    // =======================
    const vVal = Math.max(v * 1.5, 0);
    const dVal = Math.max(d / 1.25, 0); 
    const rVal = Math.max(r * 1.35, 0);
    const sVal = Math.max(s - 15, 0);
    const cVal = Math.max(credit * 15, 0);   
    const viVal = Math.max(visual * 5.5, 0);  

    let statsList = [
        { name: "Vocal", val: vVal, point: v },
        { name: "Dance", val: dVal, point: d },
        { name: "Rap", val: rVal, point: r },
        { name: "SP", val: sVal, point: s },
        { name: "Credit", val: cVal, point: credit },
        { name: "Visual", val: viVal, point: visual }
    ];

    // ✅ SORTING ANTI-TIE
    window.currentStatsList = statsList.map(stat => ({
        ...stat,
        totalScore: stat.val + b 
    })).sort((a, x) => { 
        if (x.totalScore !== a.totalScore) return x.totalScore - a.totalScore;
        return x.val - a.val; 
    });

    // =======================
    // ACE DETECTION & BEST/WORST LOGIC
    // =======================
    const bestObj = window.currentStatsList[0];
    
    const potentialWorstSkills = window.currentStatsList.filter(stat => {
        if (stat.name === "Vocal" && stat.point > 85) return false;
        if (stat.name === "Dance" && stat.point > 90) return false;
        if (stat.name === "Rap" && stat.point > 85) return false;
        if (stat.name === "SP" && stat.point >= 100) return false;
        if (stat.name === "Credit" && stat.point >= 10) return false;
        if (stat.name === "Visual" && stat.point >= 8) return false;
        return true; 
    });

    let worstObj;
    let isAce = false;

    if (potentialWorstSkills.length === 0) {
        isAce = true;
        worstObj = null;
    } else {
        worstObj = potentialWorstSkills[potentialWorstSkills.length - 1];
    }

    // Validasi Kosong & Definisi Variabel BEST/WORST
    const allZero = window.currentStatsList.every(stat => stat.point === 0);
    let bestSkillText = "-";
    let worstSkillText = "-";

    if (!allZero) {
        const bestSkills = window.currentStatsList.filter(item => item.totalScore === bestObj.totalScore).map(i => i.name);
        bestSkillText = bestSkills.join(" & ");

        if (isAce) {
            worstSkillText = "★ ACE ★";
        } else {
            const worstSkills = potentialWorstSkills.filter(item => item.totalScore === worstObj.totalScore).map(i => i.name);
            worstSkillText = worstSkills.join(" & ");
        }
    }

    // ✅ UPDATE UI STAT BOXES
    const statVals = document.querySelectorAll('.stat-val');
    const statNames = document.querySelectorAll('.stat-name');
    if (statVals.length >= 3 && statNames.length >= 3) {
        statVals[0].textContent = coreAvg.toFixed(2); statNames[0].textContent = "CORE AVG";
        
        statVals[1].innerHTML = bestSkillText.replace(/&/g, "<br>&"); 
        statNames[1].textContent = "BEST SKILL";
        
        statVals[2].innerHTML = worstSkillText;
        statNames[2].textContent = isAce ? "STATUS" : "WORST SKILL";
        
        if (isAce) {
            statVals[2].style.color = "#ffd700";
            statVals[2].style.textShadow = "0 0 10px rgba(255, 215, 0, 0.5)";
        } else {
            statVals[2].style.color = "";
            statVals[2].style.textShadow = "";
        }
    }

    // =======================
    // GRADE & COMMENT GENERATION (MANUAL)
    // =======================
    let grade = "F- (Rookie)";
    let gradeBg = "linear-gradient(135deg, #576574, #34495e)"; 

    if (coreAvg >= 100) { grade = "SS (Insanse)"; gradeBg = "linear-gradient(135deg, #ffd700, #ffaa00)"; } 
    else if (coreAvg >= 95) { grade = "S+ (Immortal)"; gradeBg = "linear-gradient(135deg, #ff4d4d, #cc0000)"; } 
    else if (coreAvg >= 90) { grade = "S (Legend)"; gradeBg = "linear-gradient(135deg, #ff6b6b, #ee5a5a)"; } 
    else if (coreAvg >= 85) { grade = "S- (Elite)"; gradeBg = "linear-gradient(135deg, #ff9f43, #ff7f00)"; } 
    else if (coreAvg >= 80) { grade = "A+ (Expert)"; gradeBg = "linear-gradient(135deg, #feca57, #ffb800)"; } 
    else if (coreAvg >= 75) { grade = "A (Main)"; gradeBg = "linear-gradient(135deg, #ffcd3c, #ffc107)"; } 
    else if (coreAvg >= 70) { grade = "A- (Epic)"; gradeBg = "linear-gradient(135deg, #48dbfb, #0abde3)"; } 
    else if (coreAvg >= 65) { grade = "B+ (Star)"; gradeBg = "linear-gradient(135deg, #0abde3, #0097e6)"; } 
    else if (coreAvg >= 60) { grade = "B (Performer)"; gradeBg = "linear-gradient(135deg, #00d2d3, #01a3a4)"; }   
    else if (coreAvg >= 55) { grade = "B- (Rising)"; gradeBg = "linear-gradient(135deg, #1dd1a1, #10ac84)"; } 
    else if (coreAvg >= 50) { grade = "C+ (Promising)"; gradeBg = "linear-gradient(135deg, #10ac84, #0d8a6a)"; } 
    else if (coreAvg >= 45) { grade = "C (Steady)"; gradeBg = "linear-gradient(135deg, #c8d6e5, #8395a7)"; } 
    else if (coreAvg >= 40) { grade = "C- (Developing)"; gradeBg = "linear-gradient(135deg, #8395a7, #576574)"; } 
    else if (coreAvg >= 35) { grade = "D+ (Emerging)"; gradeBg = "linear-gradient(135deg, #576574, #222f3e)"; } 
    else if (coreAvg >= 30) { grade = "D (Trainee)"; gradeBg = "linear-gradient(135deg, #222f3e, #1a252f)"; } 
    else if (coreAvg >= 25) { grade = "D- (Pre-debut)"; gradeBg = "linear-gradient(135deg, #5f27cd, #341f97)"; } 
    else if (coreAvg >= 20) { grade = "E+ (Aspiring)"; gradeBg = "linear-gradient(135deg, #341f97, #24146a)"; } 
    else if (coreAvg >= 15) { grade = "E (Novice)"; gradeBg = "linear-gradient(135deg, #101010, #000000)"; } 
    else if (coreAvg >= 10) { grade = "E- (Beginner)"; gradeBg = "linear-gradient(135deg, #2c3e50, #1a252f)"; } 
    else if (coreAvg >= 5) { grade = "F+ (Entry)"; gradeBg = "linear-gradient(135deg, #34495e, #2c3e50)"; } 
    else if (coreAvg >= 1) { grade = "F (Weak)"; gradeBg = "linear-gradient(135deg, #687338, #6e6520)"; }

    // GENERATE KOMENTAR AI
    const bSkill = isAce ? "All Skills" : bestSkillText; 
    const wSkill = isAce ? "Perfection" : worstSkillText;
    let comment = "";

        if (coreAvg >= 90) {
        const godlikeComments = [
            `${name} is not human. This is what we call an ${grade.split(' ')[1]} performance. With ${bSkill} reaching divine levels, even the slightest gap in ${wSkill} is unnoticeable to the naked eye.`,
            `Absolutely legendary. ${name} redefines the standards of perfection. The sheer dominance in ${bSkill} combined with a solid foundation in ${wSkill} creates a flawless aura on stage.`,
            `A true masterpiece. ${name}'s talent transcends all expectations. While ${bSkill} steals the show, the consistent effort in ${wSkill} proves this is no accident.`,
            `Unbelievable consistency. ${name} operates on an entirely different level. It is rare to see someone master ${bSkill} while keeping ${wSkill} so polished and refined.`,
            `The definition of excellence. ${name} sets the bar impossibly high. Every movement in ${bSkill} is precise, and even the areas of ${wSkill} are executed with professional grace.`,
            `Pure artistry in motion. ${name} commands every moment effortlessly. The spotlight naturally gravitates toward their ${bSkill}, yet they never neglect the nuances of ${wSkill}.`,
            `A once-in-a-generation talent. ${name} leaves everyone speechless. To possess such explosive power in ${bSkill} while maintaining stability in ${wSkill} is a miracle of training.`,
            `Flawless execution from start to finish. ${name} is simply unmatched. They have turned their greatest strength, ${bSkill}, into a weapon, while their ${wSkill} remains a reliable shield.`
        ];
        comment = godlikeComments[Math.floor(Math.random() * godlikeComments.length)];
        
    } else if (coreAvg >= 75) {
        const eliteComments = [
            `Incredible presence. ${name} dominates the stage with their exceptional ${bSkill}. If they can refine their ${wSkill} just a bit more, they will truly be untouchable in the industry.`,
            `Top-tier artistry. ${name} delivers with precision and passion. Their command over ${bSkill} is evident, though focusing on ${wSkill} will unlock their full potential as an all-rounder.`,
            `Elite-level execution. ${name} proves why they belong at the top. The contrast between their powerful ${bSkill} and their developing ${wSkill} shows a clear path for future growth.`,
            `Stunning charisma. ${name} captivates without even trying. While ${bSkill} is their main card, putting extra hours into ${wSkill} will make their performance completely balanced.`,
            `Masterful control. ${name} balances power and elegance perfectly. They lean heavily on their ${bSkill} to carry the team, but improving ${wSkill} will make them a true leader.`,
            `Outstanding dedication. ${name}'s hard work shines through brilliantly. Their ${bSkill} is already at a professional level, and polishing ${wSkill} is the final step to greatness.`,
            `Remarkable versatility. ${name} adapts seamlessly to any concept. They use their ${bSkill} as a strong anchor, while steadily working to close the gap in their ${wSkill}.`,
            `Consistent excellence. ${name} never disappoints when it matters. Their strength in ${bSkill} is undeniable, and with time, their ${wSkill} will catch up to match that same intensity.`
        ];
        comment = eliteComments[Math.floor(Math.random() * eliteComments.length)];
        
    } else if (coreAvg >= 60) {
        const solidComments = [
            `A true Main performer. ${name} shows incredible consistency in ${bSkill}. To reach the next tier, they must stop ignoring ${wSkill} and start treating it with the same respect.`,
            `Very reliable talent. ${name} delivers quality every single time. Their ${bSkill} is their biggest asset, but shoring up their ${wSkill} will prevent any future stagnation.`,
            `Strong foundation. ${name} has the skills to go even further. Currently, they rely heavily on ${bSkill}, but a dedicated focus on ${wSkill} will create a much stronger idol profile.`,
            `Impressive growth. ${name} keeps raising their own standards. The jump in their ${bSkill} is commendable, and now is the perfect time to address the weaknesses in ${wSkill}.`,
            `Solid artistry. ${name} knows exactly how to connect with the audience. They use their ${bSkill} to engage fans, but improving ${wSkill} will add more depth to their character.`,
            `Great stage sense. ${name} understands the rhythm of performance. While their ${bSkill} is sharp, smoothing out the rough edges in ${wSkill} will make them look more professional.`,
            `Consistent excellence. ${name} never disappoints when it matters. They have mastered the basics of ${bSkill}, and now they need to apply that same discipline to their ${wSkill}.`,
            `Well-rounded talent. ${name} brings balance and depth to every stage. Their ${bSkill} is the highlight, but don't underestimate the steady progress they are making in ${wSkill}.`
        ];
        comment = solidComments[Math.floor(Math.random() * solidComments.length)];
        
    } else if (coreAvg >= 45) {
        const developingComments = [
            `Not bad for perform. ${name} has great potential to reach the next level. Their spark in ${bSkill} is visible, but they must urgently address the gaps in their ${wSkill}.`,
            `Promising talent. ${name} shows flashes of brilliance worth watching. They should leverage their natural ability in ${bSkill} while seeking mentorship to improve their ${wSkill}.`,
            `Good instincts. ${name} knows where to focus for maximum impact. Right now, their ${bSkill} is carrying the score, but neglecting ${wSkill} will limit their ceiling.`,
            `Steady progress. ${name} is building something truly special. The improvement in ${bSkill} is clear, and applying that same energy to ${wSkill} will yield amazing results.`,
            `Encouraging results. ${name} is on the right path to greatness. They have found their footing in ${bSkill}, but need to build a stronger base in ${wSkill} to support it.`,
            `Notable improvement. ${name}'s dedication is clearly paying off. Their ${bSkill} is becoming a signature trait, and fixing their ${wSkill} will make them a complete package.`,
            `Hidden gem energy. ${name} has unique qualities that stand out. Their approach to ${bSkill} is fresh, but they need to standardize their technique in ${wSkill} to compete.`,
            `Worth the investment. ${name} will surprise everyone soon enough. Once they bridge the gap between their strong ${bSkill} and weak ${wSkill}, they will skyrocket.`
        ];
        comment = developingComments[Math.floor(Math.random() * developingComments.length)];
        
    } else {
        const beginnerComments = [
            `${name} is still developing. Focus on improving ${wSkill} to climb the ranks, while using their small advantage in ${bSkill} as a confidence booster.`,
            `Every legend starts somewhere. ${name} has the raw material to grow. They should cherish their slight edge in ${bSkill} but prioritize fixing the fundamentals of ${wSkill}.`,
            `Potential waiting to bloom. ${name} needs patience and consistent practice. Their interest in ${bSkill} is good, but ignoring ${wSkill} will hold them back significantly.`,
            `The journey begins now. ${name} should embrace every learning opportunity. Start by mastering the basics of ${bSkill} and slowly introduce training for ${wSkill}.`,
            `Rough diamond energy. ${name} just needs polishing to truly shine. Their natural feel for ${bSkill} is there, but the technical side of ${wSkill} needs serious work.`,
            `Don't rush the process. ${name}'s foundation matters more than speed. Build a strong routine for ${bSkill} and dedicate at least 30% of practice time to ${wSkill}.`,
            `Small steps lead to big leaps. ${name} should celebrate every milestone. Even a small improvement in ${wSkill} will make their existing ${bSkill} look even better.`,
            `The fire is there. ${name} just needs to channel it into focused training. Let their passion for ${bSkill} drive them to overcome the challenges they face in ${wSkill}.`
        ];
        comment = beginnerComments[Math.floor(Math.random() * beginnerComments.length)];
    }

currentFinalGrade = grade;
currentComment = comment;

    // =======================
    // UPDATE UI (FINAL FIX)
    // =======================
    
    // 1. Update Grade Badge
    const gradeBadge = document.getElementById("gradeBadge");
    if (gradeBadge) {
        gradeBadge.textContent = grade;       
        gradeBadge.style.background = gradeBg; 
        gradeBadge.style.display = "inline-block";
    }

    // 2. Update Insight Text
    const insightText = document.getElementById("insightText");
    if (insightText) {
        insightText.style.opacity = "0";
        setTimeout(() => {
            insightText.textContent = comment; 
            insightText.style.transition = "opacity 0.6s ease";
            insightText.style.opacity = "1";
        }, 100);
    }

    // 3. Hitung Gap untuk Insight Tambahan
    const gap = isAce ? 0 : Math.abs(bestObj.totalScore - worstObj.totalScore);
    const insightEl = document.getElementById('gapInsight');
    if (insightEl) {
        if (gap < 10) {
            insightEl.textContent = "✨ Perfectly Balanced";
            insightEl.style.color = "#00d2d3";
        } else if (gap < 25) {
            insightEl.textContent = " Well Rounded with Minor Gaps";
            insightEl.style.color = "#feca57";
        } else if (gap < 40) {
            insightEl.textContent = "⚠️ Noticeable Skill Imbalance";
            insightEl.style.color = "#ff9f43";
        } else {
            insightEl.textContent = "🔥 Extreme Specialization Detected";
            insightEl.style.color = "#ff6b6b";
        }
    }

    // Panggil fitur visual lainnya
    renderTalentDistribution();
    updateSkillGapIndicator();
} // <--- KURUNG PENUTUP FUNGSI GENERATE AISUMMARY
});

// ✅ TARUH FUNGSI INI DI SINI (SETELAH RENDER TALENT)
function updateSkillGapIndicator() {
    const gapContainer = document.querySelector('.skill-gap-container'); 
    
    // ✅ VALIDASI AWAL: Sembunyikan jika data belum ada atau masih kosong
    if (!window.currentStatsList || window.currentStatsList.length === 0) {
        if (gapContainer) gapContainer.style.display = 'none';
        return;
    }

    // Cek apakah semua nilai masih 0 (belum diinput)
    const allZero = window.currentStatsList.every(stat => stat.val === 0 && stat.point === 0);
    if (allZero) {
        if (gapContainer) gapContainer.style.display = 'none';
        return;
    }

    // Jika valid, tampilkan kembali
    if (gapContainer) gapContainer.style.display = 'block';

    const best = window.currentStatsList[0];
    const worst = window.currentStatsList[window.currentStatsList.length - 1];
    
    // Hitung Gap berdasarkan Total Score agar konsisten dengan Ranking Overlay
    const gap = Math.abs(best.totalScore - worst.totalScore);
    
    // Update Label Skill (VOC, DAN, dll)
    const bestLabelEl = document.getElementById('gapBestLabel');
    const worstLabelEl = document.getElementById('gapWorstLabel');
    if(bestLabelEl) bestLabelEl.textContent = best.name.substring(0, 3).toUpperCase();
    if(worstLabelEl) worstLabelEl.textContent = worst.name.substring(0, 3).toUpperCase();
    
    // Update Angka Gap
    const distEl = document.getElementById('gapDistanceText');
    if(distEl) distEl.textContent = `Gap: ${gap.toFixed(1)}`;
    
    // Update Posisi Bar Visual
    const barFill = document.getElementById('gapBarFill');
    const markerBest = document.getElementById('gapMarkerBest');
    const markerWorst = document.getElementById('gapMarkerWorst');
    
    if (barFill && markerBest && markerWorst) {
        const bestPos = Math.min(Math.max((best.totalScore / 100) * 100, 0), 100);
        const worstPos = Math.min(Math.max((worst.totalScore / 100) * 100, 0), 100);
        
        barFill.style.width = `${Math.abs(bestPos - worstPos)}%`;
        barFill.style.left = `${Math.min(bestPos, worstPos)}%`;
        markerBest.style.left = `${bestPos}%`;
        markerWorst.style.left = `${worstPos}%`;
    }
    
    // Update Teks Insight (STATIS/TETAP)
    const insightEl = document.getElementById('gapInsight');
    if (insightEl) {
        let text = "Balanced Talent"; // Default
        
        if (gap < 10) text = "✨ Perfectly Balanced";
        else if (gap < 25) text = "⚖️ Harmonious Blend";
        else if (gap < 40) text = "📉 Noticeable Imbalance";
        else text = "🚀 Extreme Specialization";
        
        insightEl.textContent = text;
        
        // Warna teks menyesuaikan tingkat gap
        insightEl.style.color = gap < 10 ? "#00d2d3" : gap < 25 ? "#feca57" : gap < 40 ? "#ff9f43" : "#ff6b6b";
    }
}



// --- TALENT DISTRIBUTION RENDERER (DI LUAR FUNGSI UTAMA) ---
function renderTalentDistribution() {
    const container = document.getElementById('talentBars');
    if (!container || !window.currentStatsList) return;

    const skillMeta = {
        "Vocal": { icon: "Vocal", color: "linear-gradient(90deg, #d4ff6b, #bdee5a)" },
        "Dance": { icon: "Dance", color: "linear-gradient(90deg, #489cfb, #0a7fe3)" },
        "Rap":   { icon: "Rap", color: "linear-gradient(90deg, #ff6530, #ff5203)" },
        "SP":    { icon: "SP", color: "linear-gradient(90deg, 0 0 10px rgba(162, 89, 255, 0.3); #ffc636, #ffaa00)" },
        "Credit":{ icon: "Credit Songs", color: "linear-gradient(90deg, #7af1b5, #8eeaeb)" },
        "Visual":{ icon: "Visual", color: "linear-gradient(90deg, #d979bd, #a6ccf1)" }
    };

    let html = '';
    window.currentStatsList.forEach(stat => {
        const meta = skillMeta[stat.name] || { icon: "⭐", color: "linear-gradient(90deg, #a259ff, #b78cff)" };
        const pct = Math.min(Math.max(stat.val, 0), 100);
        
         html += `
            <div class="talent-bar-row">
                <span class="bar-icon">${meta.icon}</span>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${pct}%;background:${meta.color}"></div>
                </div>
                <span class="bar-value">${Math.round(pct)}%</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

// --- RESET ALL (EVENT DELEGATION VERSION - FINAL FIX WARNA) ---
document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "resetAllDataBtn") {
        console.log("Tombol Reset diklik!"); 

        // 1. Reset Input Name
        const nameInput = document.getElementById("names");
        if (nameInput) nameInput.value = "";
        
        // 2. Reset Dropdown ke Opsi Pertama ("Choose...")
        ["vocal", "rap", "sp"].forEach(id => {
            const select = document.getElementById(id);
            if (select) select.selectedIndex = 0;
        });

        // 3. Reset Input Number & Aktifkan Placeholder
        ["dance", "visual", "credit"].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = "";
        });

        // 4. Reset Point Box: Teks "0" + Hapus Warna Inline Sesuai applyColorToStat
        ["vocalPoint", "dancePoint", "rapPoint", "spPoint", "creditPoint", "visualPoint"]
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = "0";
                    // Hapus properti yang pernah di-set oleh applyColorToStat
                    el.style.color = ""; 
                    el.style.fontWeight = "";
                    // Safety: pastikan tidak ada background/clip tersisa
                    el.style.background = "";
                    el.style.webkitBackgroundClip = "";
                    el.style.backgroundClip = "";
                    el.style.webkitTextFillColor = "";
                }
            });

// 5. HARD RESET BADGE: Hapus Nama Tier & Warna Gradient Total
["vocalBadge", "danceBadge", "rapBadge", "spBadge", "creditBadge", "visualBadge"]
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // 1. Reset teks ke default
            el.textContent = "-";
            
            // 2. NUKLIR RESET CLASS: Timpa seluruh className dengan class dasar saja
            // Ini menjamin semua class tier (.tier-dozen, .tier-good, dll) hilang total
            el.className = "badge-box"; 
            
            // 3. PAKSA REFLOW: Agar browser benar-benar membuang cache visual gradient
            void el.offsetWidth; 
            
            // 4. Bersihkan style inline sebagai safety net terakhir
            el.style.cssText = ""; 
        }
    });


        
        // 6. Sembunyikan Card & Tombol Compare
        document.getElementById("resultCard").style.display = "none";
        document.getElementById("compareCard").style.display = "none";
        
        const saveBtn = document.getElementById("saveCompare");
        const openBtn = document.getElementById("openCompare");
        if (saveBtn) saveBtn.style.display = "none";
        if (openBtn) openBtn.style.display = "none";
        
        // 7. Hancurkan Chart
        if (window.talentChart) {
            window.talentChart.destroy();
            window.talentChart = null;
        }
        
        // 8. Reset Global Var
        window.lastAnalysis = null;
        
        // 9. Scroll ke atas
        window.scrollTo({ top: 0, behavior: "smooth" });
        
    }
    
});

function updatePremiumAchievement(data) {
    const badge = document.getElementById("achievementBadge");
    const iconSpan = badge.querySelector(".badge-icon");
    const titleSpan = badge.querySelector(".badge-title");
    
    if (!data || !badge) return;

    // Reset kelas warna dan sembunyikan dulu (Default: Ruang Kosong)
    badge.className = "premium-badge hidden";
    
    let bestTitle = "";
    let bestIcon = "";
    let tierClass = "";

    // --- LOGIKA PRIORITAS TERTINGGI ---
    
    // 1. CEK VISUAL (Diamond Tier)
    if (parseFloat(data.visualPoint) >= 9.5) {
        bestTitle = "Perfect Visual";
        bestIcon = "💎";
        tierClass = "badge-diamond";
    } 
    // 2. CEK STAGE PRESENCE (Gold Tier)
    else if (parseFloat(data.spPoint) >= 100) {
        bestTitle = "Ace Stage";
        bestIcon = "✨";
        tierClass = "badge-gold";
    }
    // 3. CEK VOCAL (Gold/Silver Tier)
    else if (parseFloat(data.vocalPoint) >= 100) {
        bestTitle = "Perfect Vocalist";
        bestIcon = "🎤";
        tierClass = "badge-gold";
    } else if (parseFloat(data.vocalPoint) >= 90) {
        bestTitle = "Amazing Vocalist";
        bestIcon = "🌟";
        tierClass = "badge-silver";
    }
    // 4. CEK DANCE (Gold/Silver Tier)
    else if (parseFloat(data.dancePoint) >= 99) {
        bestTitle = "Master Dancer";
        bestIcon = "💃";
        tierClass = "badge-silver";
    } else if (parseFloat(data.dancePoint) >= 100) {
        bestTitle = "Insanse Dancer";
        bestIcon = "💃";
        tierClass = "badge-gold";
    }
    // 5. CEK RAP (Bronze/Silver Tier)
    else if (parseFloat(data.rapPoint) >= 95) {
        bestTitle = "Rap God";
        bestIcon = "🔥";
        tierClass = "badge-bronze";
    }
    // 6. CEK CREDIT (Special Tier)
    else if (parseFloat(data.credit) >= 50) {
        bestTitle = "Insane Songwriter";
        bestIcon = "✍️";
        tierClass = "badge-gold";
  } else if (parseFloat(data.credit) >= 25) {
        bestTitle = "Amazing Songwriter";
        bestIcon = "📝";
        tierClass = "badge-silver";
    }  
    // --- EKSEKUSI: BUKA ATAU TUTUP RUANG ---
    if (bestTitle) {
        // Jika ada achievement: Hapus 'hidden', tambahkan warna, isi teks
        badge.classList.remove("hidden");
        badge.classList.add(tierClass);
        iconSpan.textContent = bestIcon;
        titleSpan.textContent = bestTitle;
    } 
    // Jika tidak ada achievement: Biarkan kelas 'hidden' aktif (Ruang tetap kosong)
}


function triggerConfetti() {
    // 1. Buat elemen canvas baru khusus untuk sesi ini
    const myCanvas = document.createElement('canvas');
    myCanvas.style.position = 'fixed';
    myCanvas.style.top = '0';
    myCanvas.style.left = '0';
    myCanvas.style.width = '100%';
    myCanvas.style.height = '100%';
    myCanvas.style.pointerEvents = 'none';
    myCanvas.style.zIndex = '9999';
    myCanvas.style.transition = 'opacity 1.5s ease-out'; // KUNCI FADE OUT
    document.body.appendChild(myCanvas);

    // 2. Jalankan confetti di canvas khusus ini
    const myConfetti = confetti.create(myCanvas, { resize: true });
    
    var duration = 1.5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        myConfetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#280047', '#b77eff', '#003fff'],
            gravity: 1.5, // Lebih berat biar cepat jatuh
            ticks: 150 // Umur partikel lebih pendek
        });
        myConfetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#280047', '#003fff', '#6fbecc'],
            gravity: 1.5,
            ticks: 150
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 3. Proses Fade Out (Hilang Perlahan)
    setTimeout(() => {
        // Mulai turunkan opacity canvas-nya
        myCanvas.style.opacity = '0';
        
        // Hapus elemen canvas dari HTML setelah transisi selesai
        setTimeout(() => {
            if (myCanvas.parentNode) {
                myCanvas.parentNode.removeChild(myCanvas);
            }
        }, 1500); // Waktu ini harus sama dengan durasi transition di CSS
    }, 3000); // Mulai memudar setelah 3 detik
}

// --- FUNGSI UNTUK MEMUNCULKAN TOMBOL COMPARE ---
window.showCompareButtons = function() {
    const saveBtn = document.getElementById("saveCompare");
    const openBtn = document.getElementById("openCompare");
    
    if (saveBtn && openBtn) {
        // Gunakan flex agar sesuai dengan wrapper div-nya
        saveBtn.style.display = "flex"; 
        openBtn.style.display = "flex";
        
        // Animasi fade-in halus
        [saveBtn, openBtn].forEach(btn => {
            btn.style.opacity = "0";
            btn.style.transform = "translateY(10px)";
            
            setTimeout(() => {
                btn.style.transition = "all 0.4s ease";
                btn.style.opacity = "1";
                btn.style.transform = "translateY(0)";
            }, 50);
        });
    }
};

// Fungsi playSound yang Aman
function playSound(soundName) {
    try {
        // Cek dulu apakah elemen audio ada dan src-nya valid
        const audio = document.getElementById(soundName);
        if (audio && audio.src) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                // Diamkan error jika user belum interaksi dengan halaman
                console.warn(`Audio "${soundName}" blocked or missing.`);
            });
        }
    } catch (error) {
        // Cegah error NotSupportedError muncul di console
        console.warn(`Sound system error: ${error.message}`);
    }
}

const idolDatabase = {
    gen3: [
        // ================= BLACKPINK =================
        {
            name: "Jisoo", 
            group: "BLACKPINK",
            rank: "Top 4/4 in Blackpink",
            talent: `• Vocal: High W (E+) | +35 (Complete)\n• Dance: 5.65 | +56.5 (Average)\n• Rap: High.Nr | +20 (Complete)\n• SP: 15/20 | +75 (Upper)\n• Credit Songs: 29+ | +2.9 (Great)\n• Visual: 95% | +9.5 (Visualist)`,
            status: "☆ Almost All-Rounder ☆ (+0.01)", 
            score: "6.98 – Above A. Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Jennie", 
            group: "BLACKPINK",
            rank: "Top 1/4 in Blackpink",
            talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 7.15 | +71.5 (Intermediate)\n• Rap: 27.25 | +75 (Ace)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 45+ | +4.5 (Ace)\n• Visual: 68% | +6.8 (High)`,
            status: "★ All-Rounder ★ (+0.05)", 
            score: "9.37 – Top Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Rosé", 
            group: "BLACKPINK",
            rank: "Top 3/4 in Blackpink",
            talent: `• Vocal: Low A (C-) | +55 (Good)\n• Dance: 7.00 | +70 (Intermediate)\n• Rap: Mid.Nr | +10 (Dozen)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 42+ | +4.2 (Ace)\n• Visual: 88% | +8.8 (Graceful)`,
            status: "☆ Almost All-Rounder ☆ (+0.01)", 
            score: "7.83 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Lisa", 
            group: "BLACKPINK",
            rank: "Top 2/4 in Blackpink",
            talent: `• Vocal: U-W (E-) | +15 (Dozen)\n• Dance: 9.35 | +93.5 (Proficient)\n• Rap: 25.50 | +70 (Ace)\n• SP: 20/20 | +100 (Virtuoso)\n• Credit Songs: 33+ | +3.3 (Ace)\n• Visual: 75% | +7.5 (Great)`,
            status: "♡ Almost Ace ♡ (+0.10)", 
            score: "9.33 – Top Idol"
        },// <--- ITEM TERAKHIR SEBELUM TWICE
   
                {
            name: "Nayeon", group: "TWICE",
            talent: `• Vocal: High W-A (D+) | +50 (Good)\n• Dance: 7.75 | +77.5 (Intermediate)\n• Rap: 8.25 | +25 (Complete)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 21+ | +2.1 (Great)\n• Visual: 83% | +8.3 (Graceful)`,
            rank: "Top 3/9 in TWICE",
            status: "★ All-Rounder ★ (+0.05)", score: "8.37 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Jeongyeon", group: "TWICE",
            talent: `• Vocal: Mid A (C) | +60 (Good)\n• Dance: 6.75 | +67.5 (Intermediate)\n• Rap: Upper.Nr | +15 (Complete)\n• SP: 16/20 | +80 (Upper)\n• Credit Songs: 9+ | +0.9 (Complete)\n• Visual: 76% | +7.6 (Great)`,
            rank: "Top 7/9 in TWICE",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "7.78 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Momo", group: "TWICE",
            talent: `• Vocal: U (F+) | +10 (Dozen)\n• Dance: 9.90 | +99 (Ace Dancer)\n• Rap: 13.50 | +35 (Good)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 8+ | +0.8 (Complete)\n• Visual: 76% | +7.6 (Great)`,
            rank: "Top 4/9 in TWICE",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "8.07 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Sana", group: "TWICE",
            talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 8.10 | +81 (Advanced)\n• Rap: Upper.Nr | +15 (Complete)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 12+ | +1.2 (Good)\n• Visual: 88% | +8.8 (Graceful)`,
            rank: "Top 5/9 in TWICE",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "8.03 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Jihyo", group: "TWICE",
            talent: `• Vocal: Low A-AA (C+) | +70 (Great)\n• Dance: 9.10 | +91 (Proficient)\n• Rap: 7.75 | +25 (Complete)\n• SP: 20/20 | +100 (Virtuoso)\n• Credit Songs: 32+ | +3.2 (Ace)\n• Visual: 71% | +7.1 (Great)`,
            rank: "Top 1/9 in TWICE",
            status: "♡ Almost Ace ♡ (+0.10)", score: "9.50 – Top Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Mina", group: "TWICE",
            talent: `• Vocal: Mid W-A (D) | +45 (Complete)\n• Dance: 8.85 | +88.5 (Advanced)\n• Rap: High.Nr | +20 (Complete)\n• SP: 14/20 | +70 (Upper)\n• Credit Songs: 7+ | +0.7 (Complete)\n• Visual: 86% | +8.6 (Graceful)`,
            rank: "Top 6/9 in TWICE",
            status: "★ All-Rounder ★ (+0.05)", score: "7.87 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Dahyun", group: "TWICE",
            talent: `• Vocal: U-W (E) | +20 (Complete)\n• Dance: 7.15 | +71.5 (Intermediate)\n• Rap: 14.75 | +35 (Good)\n• SP: 15/20 | +75 (Upper)\n• Credit Songs: 30+ | +3 (Ace)\n• Visual: 79% | +7.9 (Great)`,
            rank: "Top 9/9 in TWICE",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "7.32 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Chaeyoung", group: "TWICE",
            talent: `• Vocal: High W (E+) | +35 (Complete)\n• Dance: 7.35 | +73.5 (Intermediate)\n• Rap: 21.75 | +60 (Ace)\n• SP: 16/20 | +80 (Upper)\n• Credit Songs: 46+ | +4.6 (Ace)\n• Visual: 78% | +7.8 (Great)`,
            rank: "Top 2/9 in TWICE",
            status: "★ All-Rounder ★ (+0.05)", score: "8.57 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Tzuyu", group: "TWICE",
            talent: `• Vocal: Mid W-A (D) | +45 (Complete)\n• Dance: 7.45 | +74.5 (Intermediate)\n• Rap: Upper.Nr | +15 (Complete)\n• SP: 14/20 | +70 (Upper)\n• Credit Songs: 5+ | +0.5 (Complete)\n• Visual: 93% | +9.3 (Visualist)`,
            rank: "Top 8/9 in TWICE",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "7.36 – Good Idol"
        }, // <--- KOMA PENTING DI SINI (Sebelum pindah ke RV)

        // ================= RED VELVET =================
        {
            name: "Irene", group: "Red Velvet",
            talent: `• Vocal: Mid W (E+) | +30 (Complete)\n• Dance: 7.40 | +74 (Intermediate)\n• Rap: 16.00 | +40 (Great)\n• SP: 15/20 | +75 (Upper)\n• Credit Songs: 4+ | +0.4 (Complete)\n• Visual: 97% | +9.7 (Visualist)`,
            rank: "Top 3/5 in Red Velvet",
            status: "★ All-Rounder ★ (+0.05)", score: "7.77 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Seulgi", group: "Red Velvet",
            talent: `• Vocal: High A (C) | +65 (Good)\n• Dance: 9.25 | +92.5 (Proficient)\n• Rap: Mid.Nr | +10 (Dozen)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 3+ | +0.3 (Complete)\n• Visual: 66% | +6.6 (High)`,
            rank: "Top 1/5 in Red Velvet",
            status: "♡ Almost Ace ♡ (+0.10)", score: "8.71 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Wendy", group: "Red Velvet",
            talent: `• Vocal: Mid A-AA (C+) | +75 (Great)\n• Dance: 7.65 | +76.5 (Intermediate)\n• Rap: High.Nr | +20 (Complete)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 6+ | +0.6 (Complete)\n• Visual: 81% | +8.1 (Graceful)`,
            rank: "Top 2/5 in Red Velvet",
            status: "★ All-Rounder ★ (+0.05)", score: "8.68 – Great Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Joy", group: "Red Velvet",
            talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 5.90 | +59 (Average)\n• Rap: 6.25 | +25 (Complete)\n• SP: 14/20 | +70 (Upper)\n• Credit Songs: 4+ | +0.4 (Complete)\n• Visual: 80% | +8 (Graceful)`,
            rank: "Top 4/5 in Red Velvet",
            status: "☆ Almost All-Rounder ☆ (+0.01)", score: "7.07 – Good Idol"
        }, // <--- KOMA PENTING DI SINI
        {
            name: "Yeri", group: "Red Velvet",
            talent: `• Vocal: U-W (E) | +20 (Complete)\n• Dance: 5.60 | +56 (Average)\n• Rap: 14.75 | +35 (Good)\n• SP: 12/20 | +60 (Mid)\n• Credit Songs: 6+ | +0.6 (Complete)\n• Visual: 79% | +7.9 (Great)`,
            rank: "Top 5/5 in Red Velvet",
            status: "● balanced ● (+0.00)", score: "6.48 – Above A. Idol"
        } // <--- INI ITEM TERAKHIR, TIDAK PERLU KOMA
    ], // <--- PENUTUP ARRAY GEN3

    gen4: [
    {
        name: "Karina",
        group: "aespa",
        rank: "Top 1/4 in aespa", // ✅ FOTG & Leader = Rank 1
        talent: `• Vocal: Low A (C-) | +55 (Good)\n• Dance: 8.70 | +87 (Advanced)\n• Rap: 17.25 | +45 (Great)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 4+ | +0.4 (Complete)\n• Visual: 97% | +9.7 (Visualist)`,
        status: "♡ Almost Ace ♡ (+0.10)",
        score: "9.27 – Top Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Giselle",
        group: "aespa",
        rank: "Top 4/4 in aespa",
        talent: `• Vocal: High W-A (D+) | +50 (Good)\n• Dance: 6.95 | +69.5 (Intermediate)\n• Rap: 21.00 | +55 (Ace)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 15+ | +1.5 (Good)\n• Visual: 75% | +7.5 (Great)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.76 – Great Idol"
    },
    {
        name: "Winter",
        group: "aespa",
        rank: "Top 3/4 in aespa",
        talent: `• Vocal: Low A-AA (C+) | +70 (Great)\n• Dance: 8.10 | +81 (Advanced)\n• Rap: 7.75 | +25 (Complete)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 2+ | +0.2 (Complete)\n• Visual: 94% | +9.4 (Visualist)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.81 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Ningning",
        group: "aespa",
        rank: "Top 2/4 in aespa",
        talent: `• Vocal: High A (C) | +65 (Good)\n• Dance: 8.25 | +82.5 (Advanced)\n• Rap: 8.50 | +25 (Complete)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 9+ | +0.9 (Complete)\n• Visual: 68% | +6.8 (High)`,
        status: "♡ Almost Ace ♡ (+0.10)",
        score: "8.85 – Great Idol"
    }, // <--- KOMA PENTING DI SINI

    // Le Sserafim
    
    {
        name: "Sakura",
        group: "LE SSERAFIM",
        rank: "Top 4/5 in LE SSERAFIM",
        talent: `• Vocal: Low W (E+) | +25 (Complete)\n• Dance: 8.00 | +80 (Advanced)\n• Rap: Upper.Nr | +15 (Complete)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 128+ | +12.8 (Perfect)\n• Visual: 91% | +9.1 (Visualist)`,
        status: "☆ Almost All-Rounder ☆ (+0.01)",
        score: "7.93 – Good Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Chaewon",
        group: "LE SSERAFIM",
        rank: "Top 2/5 in LE SSERAFIM",
        talent: `• Vocal: High W-A (D+) | +50 (Good)\n• Dance: 8.95 | +89.5 (Advanced)\n• Rap: High.Nr | +20 (Complete)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 14+ | +1.4 (Good)\n• Visual: 68% | +6.8 (High)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.61 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Yunjin",
        group: "LE SSERAFIM",
        rank: "Top 1/5 in LE SSERAFIM",
        talent: `• Vocal: Low A (C-) | +55 (Good)\n• Dance: 8.45 | +84.5 (Advanced)\n• Rap: 10.25 | +30 (Good)\n• SP: 20/20 | +100 (Virtuoso)\n• Credit Songs: 88+ | +8.8 (Producer)\n• Visual: 90% | +9 (Visualist)`,
        status: "♡ Almost Ace ♡ (+0.10)",
        score: "9.28 – Top Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Kazuha",
        group: "LE SSERAFIM",
        rank: "Top 3/5 in LE SSERAFIM",
        talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 9.25 | +92.5 (Proficient)\n• Rap: 8.00 | +25 (Complete)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 7+ | +0.7 (Complete)\n• Visual: 94% | +9.4 (Visualist)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.61 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Eunchae",
        group: "LE SSERAFIM",
        rank: "Top 5/5 in LE SSERAFIM",
        talent: `• Vocal: Mid W (E+) | +30 (Complete)\n• Dance: 8.35 | +83.5 (Advanced)\n• Rap: High.Nr | +20 (Complete)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 5+ | +0.5 (Complete)\n• Visual: 78% | +7.8 (Great)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "7.67 – Good Idol"
    },
    
    {
        name: "Gaeul",
        group: "IVE",
        rank: "Top 3/6 in IVE",
        talent: `• Vocal: Low W (E+) | +25 (Complete)\n• Dance: 7.95 | +79.5 (Intermediate)\n• Rap: 15.00 | +40 (Great)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 1+ | +0.1 (Complete)\n• Visual: 90% | +9 (Visualist)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.01 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Yujin",
        group: "IVE",
        rank: "Top 1/6 in IVE",
        talent: `• Vocal: High A (C) | +65 (Good)\n• Dance: 8.15 | +81.5 (Advanced)\n• Rap: High.Nr | +20 (Complete)\n• SP: 20/20 | +100 (Virtuoso)\n• Credit Songs: 7+ | +0.7 (Complete)\n• Visual: 77% | +7.7 (Great)`,
        status: "♡ Almost Ace ♡ (+0.10)",
        score: "8.97 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Rei",
        group: "IVE",
        rank: "Top 2/6 in IVE",
        talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 6.30 | +63 (Intermediate)\n• Rap: 21.75 | +60 (Ace)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 9+ | +0.9 (Complete)\n• Visual: 68% | +6.8 (High)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "8.44 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Wonyoung",
        group: "IVE",
        rank: "Top 5/6 in IVE",
        talent: `• Vocal: Low W (E+) | +25 (Complete)\n• Dance: 6.75 | +67.5 (Intermediate)\n• Rap: High.Nr | +20 (Complete)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 12+ | +1.2 (Good)\n• Visual: 99% | +9.9 (Visualist)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "7.39 – Good Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Liz",
        group: "IVE",
        rank: "Top 6/6 in IVE",
        talent: `• Vocal: Low A (C-) | +55 (Good)\n• Dance: 6.50 | +65 (Intermediate)\n• Rap: Mid.Nr | +10 (Dozen)\n• SP: 15/20 | +75 (Upper)\n• Credit Songs: 3+ | +0.3 (Complete)\n• Visual: 88% | +8.8 (Graceful)`,
        status: "☆ Almost All-Rounder ☆ (+0.01)",
        score: "7.36 – Good Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Leeseo",
        group: "IVE",
        rank: "Top 4/6 in IVE",
        talent: `• Vocal: Mid W (E+) | +30 (Complete)\n• Dance: 7.75 | +77.5 (Intermediate)\n• Rap: 9.50 | +30 (Good)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 1+ | +0.1 (Complete)\n• Visual: 93% | +9.3 (Visualist)`,
        status: "★ All-Rounder ★ (+0.05)",
        score: "7.84 – Good Idol"
    } // <--- ITEM TERAKHIR IVE

    
], 
            gen5: [
    {
        name: "Ruka", 
        group: "BABYMONSTER",
        rank: "Top 3/7 in BABYMONSTER",
        talent: `• Vocal: U-W (E-) | +15 (Dozen)\n• Dance: 8.65 | +86.5 (Advanced)\n• Rap: 24.00 | +65 (Ace)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 2+ | +0.2 (Complete)\n• Visual: 72% | +7.2 (Great)`,
        status: "♡ Almost Ace ♡ (+0.10)", 
        score: "8.69 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Pharita", 
        group: "BABYMONSTER",
        rank: "Top 7/7 in BABYMONSTER",
        talent: `• Vocal: Low W-A (D-) | +40 (Complete)\n• Dance: 6.85 | +68.5 (Intermediate)\n• Rap: Upper.Nr | +15 (Complete)\n• SP: 15/20 | +75 (Upper)\n• Credit Songs: 0+ | +0 (Dozen)\n• Visual: 92% | +9.2 (Visualist)`,
        status: "☆ Almost All-Rounder ☆ (+0.01)", 
        score: "7.19 – Good Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Asa", 
        group: "BABYMONSTER",
        rank: "Top 1/7 in BABYMONSTER",
        talent: `• Vocal: Low W (E+) | +25 (Complete)\n• Dance: 8.15 | +81.5 (Advanced)\n• Rap: 27.00 | +75 (Ace)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 12+ | +1.2 (Good)\n• Visual: 76% | +7.6 (Great)`,
        status: "♡ Almost Ace ♡ (+0.10)", 
        score: "9.23 – Top Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Ahyeon", 
        group: "BABYMONSTER",
        rank: "Top 4/7 in BABYMONSTER",
        talent: `• Vocal: Mid W-A (D) | +45 (Complete)\n• Dance: 7.45 | +74.5 (Intermediate)\n• Rap: 16.75 | +40 (Great)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 3+ | +0.3 (Complete)\n• Visual: 84% | +8.4 (Graceful)`,
        status: "★ All-Rounder ★ (+0.05)", 
        score: "8.38 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Rami", 
        group: "BABYMONSTER",
        rank: "Top 5/7 in BABYMONSTER",
        talent: `• Vocal: Low A (C-) | +55 (Good)\n• Dance: 7.85 | +78.5 (Intermediate)\n• Rap: 6.25 | +25 (Complete)\n• SP: 17/20 | +85 (High)\n• Credit Songs: 5+ | +0.5 (Complete)\n• Visual: 88% | +8.8 (Graceful)`,
        status: "★ All-Rounder ★ (+0.05)", 
        score: "8.37 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Rora", 
        group: "BABYMONSTER",
        rank: "Top 6/7 in BABYMONSTER",
        talent: `• Vocal: Mid A (C) | +60 (Good)\n• Dance: 7.15 | +71.5 (Intermediate)\n• Rap: Mid.Nr | +10 (Dozen)\n• SP: 18/20 | +90 (High)\n• Credit Songs: 1+ | +0.1 (Complete)\n• Visual: 96% | +9.6 (Visualist)`,
        status: "☆ Almost All-Rounder ☆ (+0.01)", 
        score: "8.04 – Great Idol"
    }, // <--- KOMA PENTING DI SINI
    {
        name: "Chiquita", 
        group: "BABYMONSTER",
        rank: "Top 2/7 in BABYMONSTER",
        talent: `• Vocal: High W-A (D+) | +50 (Good)\n• Dance: 8.00 | +80 (Advanced)\n• Rap: 8.00 | +25 (Complete)\n• SP: 19/20 | +95 (Virtuoso)\n• Credit Songs: 0+ | +0 (Dozen)\n• Visual: 68% | +6.8 (High)`,
        status: "★ All-Rounder ★ (+0.05)", 
        score: "8.47 – Great Idol"
    } // <--- ITEM TERAKHIR GEN5
],


 
    gen2: [] 
};

let currentGen = 'gen3';

// ✅ FUNGSI RENDER UTAMA (SUDAH DIGABUNG & DIPERBAIKI)
function renderIdolChart(searchText = "") {
    const listContainer = document.getElementById("idolChartList");
    if (!listContainer) return; 
    
    listContainer.innerHTML = "";
    let data = idolDatabase[currentGen] || [];

    // Filter berdasarkan search keyword
    if (searchText) {
        data = data.filter(idol =>
            idol.name.toLowerCase().includes(searchText.toLowerCase()) ||
            idol.group.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    if (data.length === 0) {
        listContainer.innerHTML = "<p style='text-align:center; color:#888;'>No idol found.</p>";
        return;
    }
    
    data.forEach(idol => {
        let borderColor = "#e196ff"; 
        if (idol.group === "BLACKPINK") borderColor = "#424242";
        if (idol.group === "TWICE") borderColor = "#d97f62"; 
        if (idol.group === "Red Velvet") borderColor = "#8dc0ff"; 
        if (idol.group === "BABYMONSTER") borderColor = "#8e0000"; 
        if (idol.group === "aespa") borderColor = "#dfff48";
        if (idol.group === "LE SSERAFIM") borderColor = "#ff751f";
        if (idol.group === "IVE") borderColor = "#002892";
        
        // ✅ PERBAIKAN LOGIKA RENDER TALENT (VARIABEL PROCESSEDLINE DIDEFINISIKAN)
        const processedTalent = idol.talent.split('\n').map(line => {
            let type = 'default';
            if (line.includes('Vocal')) type = 'vocal';
            else if (line.includes('Dance')) type = 'dance';
            else if (line.includes('Rap')) type = 'rap';
            else if (line.includes('SP')) type = 'sp';
            else if (line.includes('Credit')) type = 'credit';
            else if (line.includes('Visual')) type = 'visual';

            function getColor(val) {
                if (type === 'vocal') {
                    if (val <= 10) return "#ff4d4d"; if (val <= 20) return "#feca57";
                    if (val <= 50) return "#5bff1b"; if (val <= 95) return "#a29bfe";
                    return "#6c5ce7";
                } 
                else if (type === 'dance') {
                    if (val < 40) return "#ff4d4d"; if (val < 60) return "#feca57";
                    if (val < 80) return "#5bff1b"; if (val < 100) return "#a29bfe";
                    return "#6c5ce7";
                }
                else if (type === 'rap') {
                    if (val <= 10) return "#ff4d4d"; if (val <= 15) return "#feca57";
                    if (val <= 50) return "#5bff1b"; if (val <= 95) return "#a29bfe";
                    return "#6c5ce7";
                }
                else if (type === 'sp') {
                    if (val <= 50) return "#ff4d4d"; 
                    if (val <= 65) return "#feca57"; 
                    if (val <= 85) return "#5bff1b"; 
                    if (val <= 95) return "#a29bfe"; 
                    return "#6c5ce7"; 
                }
                else if (type === 'credit') {
                    if (val === 0) return "#ff4d4d"; if (val <= 0.9) return "#feca57";
                    if (val <= 2.9) return "#5bff1b"; if (val <= 3.9) return "#a29bfe";
                    return "#6c5ce7";
                }
                else if (type === 'visual') {
                    if (val <= 2.9) return "#ff4d4d"; if (val <= 4.9) return "#feca57";
                    if (val <= 6.9) return "#5bff1b"; if (val <= 7.9) return "#a29bfe";
                    return "#6c5ce7";
                }
                return "#fff";
            }

            // Ganti angka setelah tanda + dengan warna glow
            let processedLine = line.replace(/(?<=\+\s*)\d+\.?\d*/g, (match) => {
                const val = parseFloat(match);
                const color = getColor(val);
                return `<span style="color: ${color}; font-weight: 800; text-shadow: 0 0 6px ${color}, 0 0 9px ${color}, 0 0 11px ${color}40;">${match}</span>`;
            });

            // Kecilkan teks di dalam kurung
            processedLine = processedLine.replace(/$([^)]+)$/g, '<span style="display: inline-block; font-size: 8px !important; line-height: 1 !important; opacity: 0.6;">($1)</span>');

            return processedLine;
        }).join('<br>');
        
        listContainer.innerHTML += `
            <div class="idol-card" style="border-color: ${borderColor}; padding: 15px; margin-bottom: 10px;">
                <h3 style="margin:0; color: ${borderColor};">${idol.name} <span style="font-size:12px; color:#ccc;">(${idol.group})</span></h3>
                
                <p style="font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.6; color: #e0e0e0; white-space: pre-line; margin-top: 8px; font-weight: 700; text-shadow: 1px 1px 2px rgba(68,31,99,0.8);">
                    ${processedTalent}
                </p>

                <div style="color: #c8c0ff; font-weight:bold; text-shadow: 0 0 10px rgba(181,169,255,0.4); text-align:center; margin-top: 15px; font-size: 13px;">${idol.rank}</div>
                <div style="color: #b5a9ff; font-weight:bold; text-shadow: 0 0 10px rgba(242,215,255,0.8); text-align:center; margin-top: 10px;">${idol.status}</div>
                <div style="color: #ffffff; font-weight: 900; text-align: center; font-size: 20px; text-shadow: 0 0 15px rgba(215,130,255,0.8), 0 0 30px rgba(223,156,255,0.8); margin-top: 10px;">${idol.score}</div>
            </div>
        `;
    });
}

// ✅ EVENT LISTENER
document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openIdolChartBtn");
    const closeBtn = document.getElementById("closeIdolChartBtn");
    const modal = document.getElementById("idolChartModal");

    if (openBtn && modal) {
        openBtn.onclick = function() {
            renderIdolChart();
            modal.style.display = "flex";
        };
    }

    if (closeBtn && modal) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };
    }
});

// ✅ FUNGSI SEARCH (DI LUAR FUNGSI LAIN)
window.searchIdol = function() {
    const keyword = document.getElementById("idolSearch").value;
    renderIdolChart(keyword);
}

// ✅ FUNGSI FILTER GEN (DUPLOKASI DIHAPUS)
window.filterByGen = function(genKey) {
    currentGen = genKey;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(genKey)) {
            btn.classList.add('active');
        }
    });
    
    const keyword = document.getElementById("idolSearch")?.value || "";
    renderIdolChart(keyword); // Hanya panggil sekali saja
}

openCreateDatabase.onclick = () => {
    createDatabaseOverlay.classList.add("show");
}

closeCreateDatabase.onclick = () => {
    createDatabaseOverlay.classList.remove("show");
}