// Katalog soal Hard — bagian dari AlgoMentor v2.
// Isi soal SAMA PERSIS dengan v1 (judul, deskripsi, contoh, batasan, hints,
// solusi 5 bahasa, kompleksitas, edge case, kuis, test case) — hanya dipindah
// dari backend/src/problems.js ke file per tingkat kesulitan ini.
// Urutan soal di dalam tiap tingkat sama seperti v1.
module.exports = [
  {
    "id": "median-dua-array-terurut",
    "title": "Median Dua Array Terurut",
    "difficulty": "Hard",
    "pattern": "Binary Search",
    "description": "Diberikan dua array yang masing-masing sudah terurut menaik. Temukan median dari gabungan kedua array — nilai tengah jika digabung, atau rata-rata dua nilai tengah jika jumlah totalnya genap. Targetkan solusi yang lebih cepat dari sekadar menggabungkan lalu mengurutkan.",
    "examples": [
      {
        "input": "nums1 = [1, 3], nums2 = [2]",
        "output": "2",
        "explanation": "Gabungan [1, 2, 3], nilai tengahnya 2."
      },
      {
        "input": "nums1 = [1, 2], nums2 = [3, 4]",
        "output": "2.5",
        "explanation": "Gabungan [1, 2, 3, 4], dua nilai tengah 2 dan 3, rata-ratanya 2.5."
      }
    ],
    "constraints": [
      "Kedua array sudah terurut.",
      "Minimal satu array tidak kosong."
    ],
    "functionName": "findMedianSortedArrays",
    "jsSignature": "function findMedianSortedArrays(nums1, nums2) {",
    "tests": [
      {
        "args": [
          [
            1,
            3
          ],
          [
            2
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ],
        "expected": 2.5
      },
      {
        "args": [
          [],
          [
            1
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            2
          ],
          []
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Bayangkan memotong kedua array menjadi dua paruh: semua angka di paruh kiri <= semua angka di paruh kanan. Median ada di batas potongan itu.",
      "Lakukan binary search pada array yang LEBIH PENDEK untuk menemukan posisi potong yang tepat: max kiri <= min kanan di kedua sisi.",
      "Pseudocode: pastikan nums1 adalah array pendek; binary search i di nums1, j = (m+n+1)/2 - i; cek nums1[i-1] <= nums2[j] dan nums2[j-1] <= nums1[i]; median dari max kiri dan min kanan."
    ],
    "solutions": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];\n  const m = nums1.length, n = nums2.length;\n  let lo = 0, hi = m;\n  while (lo <= hi) {\n    const i = Math.floor((lo + hi) / 2);\n    const j = Math.floor((m + n + 1) / 2) - i;\n    const maxL1 = i === 0 ? -Infinity : nums1[i - 1];\n    const minR1 = i === m ? Infinity : nums1[i];\n    const maxL2 = j === 0 ? -Infinity : nums2[j - 1];\n    const minR2 = j === n ? Infinity : nums2[j];\n    if (maxL1 <= minR2 && maxL2 <= minR1) {\n      if ((m + n) % 2 === 1) return Math.max(maxL1, maxL2);\n      return (Math.max(maxL1, maxL2) + Math.min(minR1, minR2)) / 2;\n    } else if (maxL1 > minR2) hi = i - 1; else lo = i + 1;\n  }\n}",
      "python": "def find_median_sorted_arrays(nums1, nums2):\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n    m, n = len(nums1), len(nums2)\n    lo, hi = 0, m\n    while lo <= hi:\n        i = (lo + hi) // 2\n        j = (m + n + 1) // 2 - i\n        max_l1 = float(\"-inf\") if i == 0 else nums1[i - 1]\n        min_r1 = float(\"inf\") if i == m else nums1[i]\n        max_l2 = float(\"-inf\") if j == 0 else nums2[j - 1]\n        min_r2 = float(\"inf\") if j == n else nums2[j]\n        if max_l1 <= min_r2 and max_l2 <= min_r1:\n            if (m + n) % 2 == 1:\n                return max(max_l1, max_l2)\n            return (max(max_l1, max_l2) + min(min_r1, min_r2)) / 2\n        elif max_l1 > min_r2:\n            hi = i - 1\n        else:\n            lo = i + 1",
      "java": "public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    int m = nums1.length, n = nums2.length;\n    int lo = 0, hi = m;\n    while (lo <= hi) {\n        int i = (lo + hi) / 2, j = (m + n + 1) / 2 - i;\n        int maxL1 = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];\n        int minR1 = i == m ? Integer.MAX_VALUE : nums1[i];\n        int maxL2 = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];\n        int minR2 = j == n ? Integer.MAX_VALUE : nums2[j];\n        if (maxL1 <= minR2 && maxL2 <= minR1) {\n            if ((m + n) % 2 == 1) return Math.max(maxL1, maxL2);\n            return (Math.max(maxL1, maxL2) + Math.min(minR1, minR2)) / 2.0;\n        } else if (maxL1 > minR2) hi = i - 1; else lo = i + 1;\n    }\n    return 0;\n}",
      "go": "func findMedianSortedArrays(nums1, nums2 []int) float64 {\n    if len(nums1) > len(nums2) { return findMedianSortedArrays(nums2, nums1) }\n    m, n := len(nums1), len(nums2)\n    lo, hi := 0, m\n    for lo <= hi {\n        i := (lo + hi) / 2\n        j := (m+n+1)/2 - i\n        maxL1, minR1, maxL2, minR2 := -1<<62, 1<<62, -1<<62, 1<<62\n        if i > 0 { maxL1 = nums1[i-1] }; if i < m { minR1 = nums1[i] }\n        if j > 0 { maxL2 = nums2[j-1] }; if j < n { minR2 = nums2[j] }\n        if maxL1 <= minR2 && maxL2 <= minR1 {\n            if (m+n)%2 == 1 { if maxL1 > maxL2 { return float64(maxL1) }; return float64(maxL2) }\n            left := maxL1; if maxL2 > left { left = maxL2 }\n            right := minR1; if minR2 < right { right = minR2 }\n            return float64(left+right) / 2\n        } else if maxL1 > minR2 { hi = i - 1 } else { lo = i + 1 }\n    }\n    return 0\n}",
      "cpp": "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n    int m = nums1.size(), n = nums2.size(), lo = 0, hi = m;\n    while (lo <= hi) {\n        int i = (lo + hi) / 2, j = (m + n + 1) / 2 - i;\n        int maxL1 = i == 0 ? INT_MIN : nums1[i - 1];\n        int minR1 = i == m ? INT_MAX : nums1[i];\n        int maxL2 = j == 0 ? INT_MIN : nums2[j - 1];\n        int minR2 = j == n ? INT_MAX : nums2[j];\n        if (maxL1 <= minR2 && maxL2 <= minR1) {\n            if ((m + n) % 2 == 1) return max(maxL1, maxL2);\n            return (max(maxL1, maxL2) + min(minR1, minR2)) / 2.0;\n        } else if (maxL1 > minR2) hi = i - 1; else lo = i + 1;\n    }\n    return 0;\n}"
    },
    "complexity": "Waktu O(log(min(m, n))) dengan binary search di array pendek. Memori O(1).",
    "edgeCases": [
      "Salah satu array kosong.",
      "Total genap -> rata-rata dua nilai tengah.",
      "Semua angka di satu array lebih kecil dari array lain."
    ],
    "quiz": {
      "question": "Kenapa binary search dilakukan pada array yang lebih pendek?",
      "options": [
        "Supaya kodenya pendek",
        "Supaya kompleksitasnya O(log(min(m,n))) dan potongan j selalu valid",
        "Supaya array panjang tidak dipakai",
        "Supaya mediannya di array pendek"
      ],
      "answer": 1,
      "explanation": "Mencari di array pendek menjaga j = (m+n+1)/2 - i tetap dalam batas array panjang dan memberi kompleksitas logaritmik terhadap ukuran yang lebih kecil."
    }
  },
  {
    "id": "jebakan-air-hujan",
    "title": "Menampung Air Hujan",
    "difficulty": "Hard",
    "pattern": "Two Pointers",
    "description": "Diberikan array tinggi batang vertikal (lebar tiap batang 1). Setelah hujan, air akan tertampung di cekungan di antara batang yang lebih tinggi. Hitung total unit air yang tertampung.",
    "examples": [
      {
        "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "output": "6",
        "explanation": "Air tertampung di cekungan-cekungan di antara batang tinggi, total 6 unit."
      },
      {
        "input": "height = [4, 2, 0, 3, 2, 5]",
        "output": "9",
        "explanation": "Cekungan besar di tengah menampung 9 unit."
      }
    ],
    "constraints": [
      "Tinggi batang tidak negatif.",
      "Air di ujung array tidak tertampung karena mengalir keluar."
    ],
    "functionName": "trap",
    "jsSignature": "function trap(height) {",
    "tests": [
      {
        "args": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "expected": 6
      },
      {
        "args": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "expected": 9
      },
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          [
            3,
            0,
            3
          ]
        ],
        "expected": 3
      }
    ],
    "hints": [
      "Air di atas posisi i dibatasi oleh batang tertinggi di KIRI i dan batang tertinggi di KANAN i — tingginya adalah yang lebih pendek dari keduanya, dikurangi tinggi batang i sendiri.",
      "Kamu tidak perlu menghitung kiri dan kanan untuk semua posisi dulu. Dua penunjuk dari ujung bisa melacak max kiri dan max kanan sambil berjalan ke tengah.",
      "Pseudocode: l = 0, r = akhir, maxL = 0, maxR = 0, air = 0; selama l < r: jika height[l] < height[r]: air += max(0, maxL - height[l]); maxL = max(maxL, height[l]); l++; jika tidak, lakukan hal simetris dari kanan."
    ],
    "solutions": {
      "javascript": "function trap(height) {\n  let l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;\n  while (l < r) {\n    if (height[l] < height[r]) { water += Math.max(0, maxL - height[l]); maxL = Math.max(maxL, height[l]); l++; }\n    else { water += Math.max(0, maxR - height[r]); maxR = Math.max(maxR, height[r]); r--; }\n  }\n  return water;\n}",
      "python": "def trap(height):\n    l, r = 0, len(height) - 1\n    max_l, max_r, water = 0, 0, 0\n    while l < r:\n        if height[l] < height[r]:\n            water += max(0, max_l - height[l]); max_l = max(max_l, height[l]); l += 1\n        else:\n            water += max(0, max_r - height[r]); max_r = max(max_r, height[r]); r -= 1\n    return water",
      "java": "public int trap(int[] height) {\n    int l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;\n    while (l < r) {\n        if (height[l] < height[r]) { water += Math.max(0, maxL - height[l]); maxL = Math.max(maxL, height[l]); l++; }\n        else { water += Math.max(0, maxR - height[r]); maxR = Math.max(maxR, height[r]); r--; }\n    }\n    return water;\n}",
      "go": "func trap(height []int) int {\n    l, r, maxL, maxR, water := 0, len(height)-1, 0, 0, 0\n    for l < r {\n        if height[l] < height[r] {\n            if maxL-height[l] > 0 { water += maxL - height[l] }\n            if height[l] > maxL { maxL = height[l] }\n            l++\n        } else {\n            if maxR-height[r] > 0 { water += maxR - height[r] }\n            if height[r] > maxR { maxR = height[r] }\n            r--\n        }\n    }\n    return water\n}",
      "cpp": "int trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxL = 0, maxR = 0, water = 0;\n    while (l < r) {\n        if (height[l] < height[r]) { water += max(0, maxL - height[l]); maxL = max(maxL, height[l]); l++; }\n        else { water += max(0, maxR - height[r]); maxR = max(maxR, height[r]); r--; }\n    }\n    return water;\n}"
    },
    "complexity": "Waktu O(n) sekali jalan. Memori O(1).",
    "edgeCases": [
      "Dua batang saja -> 0.",
      "Batang menaik terus -> 0.",
      "Cekungan di tengah dengan dinding tinggi di kedua sisi."
    ],
    "quiz": {
      "question": "Kenapa sisi yang digeser adalah sisi yang batangnya lebih pendek?",
      "options": [
        "Karena sisi pendek lebih mudah",
        "Karena air di sisi itu sudah ditentukan oleh max di sisi tersebut; sisi tinggi masih bisa menjadi pembatas yang lebih tinggi",
        "Karena lebarnya berkurang",
        "Karena max di sisi tinggi tidak penting"
      ],
      "answer": 1,
      "explanation": "Saat height[l] < height[r], air di l sudah pasti dibatasi maxL (karena ada pembatas kanan yang lebih tinggi), jadi l aman diproses sekarang."
    }
  }
];
