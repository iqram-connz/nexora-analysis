const vocalData = [
  // 🔴
  { name:"U (F)", point:5, badge:"Dozen", color:"red" },
  { name:"U (F+)", point:10, badge:"Dozen", color:"red" },
  { name:"U-W (E-)", point:15, badge:"Dozen", color:"red" },

  // 🟠
  { name:"U-W (E)", point:20, badge:"Complete", color:"orange" },
  { name:"Low W (E+)", point:25, badge:"Complete", color:"orange" },
  { name:"Mid W (E+)", point:30, badge:"Complete", color:"orange" },
  { name:"High W (E+)", point:35, badge:"Complete", color:"orange" },
  { name:"Low W-A (D-)", point:40, badge:"Complete", color:"orange" },
  { name:"Mid W-A (D)", point:45, badge:"Complete", color:"orange" },

  // 🟢
  { name:"High W-A (D+)", point:50, badge:"Good", color:"green" },
  { name:"Low A (C-)", point:55, badge:"Good", color:"green" },
  { name:"Mid A (C)", point:60, badge:"Good", color:"green" },
  { name:"High A (C)", point:65, badge:"Good", color:"green" },

  // 🔵
  { name:"Low A-AA (C+)", point:70, badge:"Great", color:"blue" },
  { name:"Mid A-AA (C+)", point:75, badge:"Great", color:"blue" },
  { name:"High A-AA (C+)", point:80, badge:"Great", color:"blue" },

  // 🟣
  { name:"Low AA (B-)", point:85, badge:"Ace", color:"purple" },
  { name:"Mid AA (B-)", point:90, badge:"Ace", color:"purple" },
  { name:"High AA (B-)", point:95, badge:"Ace", color:"purple" },

  { name:"Low AA-P (B)", point:100, badge:"Ace", color:"purple" },
  { name:"Mid AA-P (B)", point:100, badge:"Ace", color:"purple" },
  { name:"High AA-P (B)", point:100, badge:"Ace", color:"purple" },

  // ⚫
  { name:"Low P (B+)", point:100, badge:"Master", color:"black" },
  { name:"Mid P (B+)", point:100, badge:"Master", color:"black" },
  { name:"High P (B+)", point:100, badge:"Master", color:"black" },

  { name:"Low P-G (A-)", point:100, badge:"Master", color:"black" },
  { name:"Mid P-G (A)", point:100, badge:"Master", color:"black" },
  { name:"High P-G (A+)", point:100, badge:"Master", color:"black" },

  // 🟤
  { name:"Low G (S)", point:100, badge:"Perfect", color:"brown" },
  { name:"Mid G (S)", point:100, badge:"Perfect", color:"brown" },
  { name:"High G (S)", point:100, badge:"Perfect", color:"brown" }
];

const danceData = [
    { label: "Choose Dances...", value: "", poin: 0, tier: "-", color: "grey" },
    // Non-Dancer (1.00 - 3.95)
    { label: "1.00", value: 1.00, poin: 10, tier: "Non-Dancer", color: "red" },
    { label: "1.50", value: 1.50, poin: 15, tier: "Non-Dancer", color: "red" },
    { label: "2.00", value: 2.00, poin: 20, tier: "Non-Dancer", color: "red" },
    { label: "2.50", value: 2.50, poin: 25, tier: "Non-Dancer", color: "red" },
    { label: "3.00", value: 3.00, poin: 30, tier: "Non-Dancer", color: "red" },
    { label: "3.50", value: 3.50, poin: 35, tier: "Non-Dancer", color: "red" },
    // Basic (4.00 - 5.95)
    { label: "4.00", value: 4.00, poin: 40, tier: "Average", color: "orange" },
    { label: "4.50", value: 4.50, poin: 45, tier: "Average", color: "orange" },
    { label: "5.00", value: 5.00, poin: 50, tier: "Average", color: "orange" },
    { label: "5.50", value: 5.50, poin: 55, tier: "Average", color: "orange" },
    // Intermediate (6.00 - 7.95)
    { label: "6.00", value: 6.00, poin: 60, tier: "Intermediate", color: "green" },
    { label: "6.50", value: 6.50, poin: 65, tier: "Intermediate", color: "green" },
    { label: "7.00", value: 7.00, poin: 70, tier: "Intermediate", color: "green" },
    { label: "7.50", value: 7.50, poin: 75, tier: "Intermediate", color: "green" },
    // Advanced (8.00 - 8.95)
    { label: "8.00", value: 8.00, poin: 80, tier: "Advanced", color: "blue" },
    { label: "8.50", value: 8.50, poin: 85, tier: "Advanced", color: "blue" },
    // Proficient (9.00 - 9.85)
    { label: "9.00", value: 9.00, poin: 90, tier: "Proficient", color: "purple" },
    { label: "9.50", value: 9.50, poin: 95, tier: "Proficient", color: "purple" },
    // Ace Dancer (9.90 - 10.00)
    { label: "9.90", value: 9.90, poin: 99, tier: "Ace Dancer", color: "black" },
    { label: "10.00", value: 10.00, poin: 100, tier: "Ace Dancer", color: "black" }
];

const rapData = [
    // --- NAMA TIER ---
    { name: "Low.Nr", point: 5, badge: "Dozen", color: "red", subTier: "Low T7" },
    { name: "Mid.Nr", point: 10, badge: "Dozen", color: "red", subTier: "Mid T7" },
    { name: "Upper.Nr", point: 15, badge: "Complete", color: "orange", subTier: "Upper T7" },
    { name: "High.Nr", point: 20, badge: "Complete", color: "orange", subTier: "High T7" },

    // --- RANGE ANGKA ---
    { min: 6.25, max: 8.75, point: 25, badge: "Complete", color: "orange", subTier: "Low T6" },
    
    { min: 9.00, max: 11.75, point: 30, badge: "Good", color: "green", subTier: "Mid T6" },
    { min: 12.00, max: 14.75, point: 35, badge: "Good", color: "green", subTier: "High T6" },
    
    { min: 15.00, max: 17.00, point: 40, badge: "Great", color: "blue", subTier: "Low T5" },
    { min: 17.25, max: 18.25, point: 45, badge: "Great", color: "blue", subTier: "Mid T5" },
    { min: 18.50, max: 20.00, point: 50, badge: "Great", color: "blue", subTier: "High T5" },
    
    { min: 20.25, max: 21.25, point: 55, badge: "Ace", color: "purple", subTier: "Low T4" },
    { min: 21.50, max: 23.00, point: 60, badge: "Ace", color: "purple", subTier: "Mid T4" },
    { min: 23.25, max: 24.25, point: 65, badge: "Ace", color: "purple", subTier: "High T4" },
    
    { min: 24.50, max: 26.00, point: 70, badge: "Ace", color: "purple", subTier: "Low T3" },
    { min: 26.25, max: 28.00, point: 75, badge: "Ace", color: "purple", subTier: "Mid T3" },
    
    { min: 28.25, max: 31.00, point: 80, badge: "Master", color: "black", subTier: "High T3" },
    { min: 31.25, max: 34.00, point: 85, badge: "Master", color: "black", subTier: "Low T2" },
    { min: 34.25, max: 36.00, point: 90, badge: "Master", color: "black", subTier: "Mid T2" },
    
    { min: 36.25, max: 40.00, point: 95, badge: "Perfect", color: "brown", subTier: "High T2" },
    { min: 40.25, max: 44.25, point: 100, badge: "Perfect", color: "brown", subTier: "Low T1" },
    { min: 44.50, max: 46.00, point: 100, badge: "Perfect", color: "brown", subTier: "Mid T1" },
    { min: 46.25, max: 50.00, point: 100, badge: "Perfect", color: "brown", subTier: "High T1" }
];


const spData = [  { label: "Choose Stage Presences...", value: "", poin: 0, tier: "-", color: "grey" },
  
  // 🔴 Dozen
  { name: "1/20", point: 5, badge: "Low", color: "red", bonus: 0 },
  { name: "2/20", point: 10, badge: "Low", color: "red", bonus: 0 },
  { name: "3/20", point: 15, badge: "Low", color: "red", bonus: 0 },
  
  // 🟠 Basic
  { name: "4/20", point: 20, badge: "Low", color: "red", bonus: 0 },
  { name: "5/20", point: 25, badge: "Low", color: "red", bonus: 0 },
  { name: "6/20", point: 30, badge: "Low", color: "red", bonus: 0 },
  { name: "7/20", point: 35, badge: "Low", color: "red", bonus: 0 },
  { name: "8/20", point: 40, badge: "Low", color: "red", bonus: 0 },
  { name: "9/20", point: 45, badge: "Low", color: "red", bonus: 0 },
  
  // 🟢 Good
  { name: "10/20", point: 50, badge: "Mid", color: "orange", bonus: 0 },
  { name: "11/20", point: 55, badge: "Mid", color: "orange", bonus: 0 },
  { name: "12/20", point: 60, badge: "Mid", color: "orange", bonus: 0 },
  { name: "13/20", point: 65, badge: "Mid", color: "orange", bonus: 0 },
  { name: "14/20", point: 70, badge: "Upper", color: "green", bonus: 0 },
  { name: "15/20", point: 75, badge: "Upper", color: "green", bonus: 0 },
  
  // 🔵 Great
  { name: "16/20", point: 80, badge: "Upper", color: "green", bonus: 0 },
  { name: "17/20", point: 85, badge: "High", color: "blue", bonus: 0 },
  { name: "18/20", point: 90, badge: "High", color: "blue", bonus: 0 },
  
  // 🟣 Virtuoso
  { name: "19/20", point: 95, badge: "Virtuoso", color: "purple", bonus: 0 },
  { name: "20/20", point: 100, badge: "Virtuoso", color: "purple", bonus: 0 },

];

const creditData = [];

const visualData = [];

