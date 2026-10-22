import { FoundItem, LostReport } from '../types';

export function calculateMatchScore(report: Partial<LostReport>, item: FoundItem): number {
  let score = 0;

  // 1. Kategori (Bobot 30%)
  if (report.category && item.category.toLowerCase().includes(report.category.toLowerCase())) {
    score += 30;
  }

  // 2. Kampus (Bobot 25%)
  if (report.campus && report.campus === item.campus) {
    score += 25;
  }

  // 3. Tanggal (Bobot 20% jika selisih <= 3 hari)
  if (report.lostDate && item.foundDate) {
    const reportTime = new Date(report.lostDate).getTime();
    const itemTime = new Date(item.foundDate.split(' ')[0]).getTime();
    const diffDays = Math.abs(reportTime - itemTime) / (1000 * 60 * 60 * 24);
    if (diffDays <= 1) {
      score += 20;
    } else if (diffDays <= 3) {
      score += 12;
    }
  }

  // 4. Kesamaan Kata Kunci Nama & Warna (Bobot 25%)
  if (report.itemName && item.itemName) {
    const reportWords = report.itemName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const itemText = (item.itemName + ' ' + item.publicDescription).toLowerCase();
    
    let matchedWords = 0;
    reportWords.forEach(word => {
      if (itemText.includes(word)) {
        matchedWords++;
      }
    });

    if (reportWords.length > 0) {
      const ratio = matchedWords / reportWords.length;
      score += Math.round(ratio * 25);
    }
  }

  return Math.min(score, 100);
}
