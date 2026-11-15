// Katalog soal Medium — bagian dari AlgoMentor v2.
// Isi soal SAMA PERSIS dengan v1 (judul, deskripsi, contoh, batasan, hints,
// solusi 5 bahasa, kompleksitas, edge case, kuis, test case) — hanya dipindah
// dari backend/src/problems.js ke file per tingkat kesulitan ini.
// Urutan soal di dalam tiap tingkat sama seperti v1.
module.exports = [
  {
    "id": "jumlah-tiga-angka",
    "title": "Jumlah Tiga Angka Nol",
    "difficulty": "Medium",
    "pattern": "Two Pointers",
    "description": "Diberikan array angka. Temukan semua tripel (tiga angka) yang berbeda dan jumlahnya 0. Tripel yang sama (angka yang sama walau urutan berbeda) hanya dihitung sekali. Kembalikan daftar semua tripel itu.",
    "examples": [
      {
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]",
        "explanation": "Dua tripel berbeda yang jumlahnya 0."
      },
      {
        "input": "nums = [0, 1, 1]",
        "output": "[]",
        "explanation": "Tidak ada tripel yang jumlahnya 0."
      },
      {
        "input": "nums = [0, 0, 0]",
        "output": "[[0, 0, 0]]",
        "explanation": "Satu-satunya tripel, dihitung sekali."
      }
    ],
    "constraints": [
      "Tripel duplikat hanya dihitung sekali.",
      "Urutan tripel di hasil tidak penting."
    ],
    "functionName": "threeSum",
    "jsSignature": "function threeSum(nums) {",
    "tests": [
      {
        "args": [
          [
            -1,
            0,
            1,
            2,
            -1,
            -4
          ]
        ],
        "expected": [
          [
            -1,
            -1,
            2
          ],
          [
            -1,
            0,
            1
          ]
        ]
      },
      {
        "args": [
          [
            0,
            1,
            1
          ]
        ],
        "expected": []
      },
      {
        "args": [
          [
            0,
            0,
            0
          ]
        ],
        "expected": [
          [
            0,
            0,
            0
          ]
        ]
      }
    ],
    "hints": [
      "Urutkan dulu arraynya. Setelah terurut, untuk tiap angka pertama, dua angka sisanya bisa dicari dengan dua penunjuk dari ujung kiri dan kanan.",
      "Jika jumlah ketiga angka < 0, geser penunjuk kiri ke kanan (butuh angka lebih besar). Jika > 0, geser penunjuk kanan ke kiri.",
      "Pseudocode: urutkan nums; untuk i di tiap posisi: lewati i yang sama dengan sebelumnya; l = i+1, r = akhir; selama l < r, hitung jumlah; jika 0 simpan tripel lalu lewati nilai duplikat di l dan r."
    ],
    "solutions": {
      "javascript": "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const out = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const s = nums[i] + nums[l] + nums[r];\n      if (s === 0) { out.push([nums[i], nums[l], nums[r]]); l++; r--; while (l < r && nums[l] === nums[l - 1]) l++; while (l < r && nums[r] === nums[r + 1]) r--; }\n      else if (s < 0) l++; else r--;\n    }\n  }\n  return out;\n}",
      "python": "def three_sum(nums):\n    nums.sort()\n    out = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                out.append([nums[i], nums[l], nums[r]]); l += 1; r -= 1\n                while l < r and nums[l] == nums[l - 1]: l += 1\n                while l < r and nums[r] == nums[r + 1]: r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return out",
      "java": "public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> out = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s == 0) { out.add(List.of(nums[i], nums[l], nums[r])); l++; r--; while (l < r && nums[l] == nums[l - 1]) l++; while (l < r && nums[r] == nums[r + 1]) r--; }\n            else if (s < 0) l++; else r--;\n        }\n    }\n    return out;\n}",
      "go": "func threeSum(nums []int) [][]int {\n    sort.Ints(nums)\n    out := [][]int{}\n    for i := 0; i < len(nums)-2; i++ {\n        if i > 0 && nums[i] == nums[i-1] { continue }\n        l, r := i+1, len(nums)-1\n        for l < r {\n            s := nums[i] + nums[l] + nums[r]\n            if s == 0 { out = append(out, []int{nums[i], nums[l], nums[r]}); l++; r--; for l < r && nums[l] == nums[l-1] { l++ }; for l < r && nums[r] == nums[r+1] { r-- } } else if s < 0 { l++ } else { r-- }\n        }\n    }\n    return out\n}",
      "cpp": "vector<vector<int>> threeSum(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> out;\n    for (int i = 0; i + 2 < (int)nums.size(); i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.size() - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s == 0) { out.push_back({nums[i], nums[l], nums[r]}); l++; r--; while (l < r && nums[l] == nums[l - 1]) l++; while (l < r && nums[r] == nums[r + 1]) r--; }\n            else if (s < 0) l++; else r--;\n        }\n    }\n    return out;\n}"
    },
    "complexity": "Waktu O(n^2) setelah sorting O(n log n). Memori O(1) di luar hasil.",
    "edgeCases": [
      "Semua nol -> satu tripel [0,0,0].",
      "Tidak ada tripel -> daftar kosong.",
      "Duplikat di angka pertama harus dilewati."
    ],
    "quiz": {
      "question": "Kenapa array diurutkan dulu?",
      "options": [
        "Supaya hasilnya rapi",
        "Supaya two pointers bisa memutuskan arah geser dari tanda jumlahnya",
        "Supaya duplikat hilang",
        "Supaya angkanya positif"
      ],
      "answer": 1,
      "explanation": "Dengan array terurut, jumlah < 0 berarti butuh angka lebih besar (geser kiri), jumlah > 0 berarti butuh angka lebih kecil (geser kanan)."
    }
  },
  {
    "id": "wadah-air-terbanyak",
    "title": "Wadah Air Terbanyak",
    "difficulty": "Medium",
    "pattern": "Two Pointers",
    "description": "Diberikan array tinggi garis vertikal. Dua garis bersama sumbu-x membentuk sebuah wadah. Luas wadah = jarak kedua garis x tinggi garis yang lebih pendek. Temukan dua garis yang menghasilkan luas wadah terbesar.",
    "examples": [
      {
        "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "output": "49",
        "explanation": "Garis 8 (indeks 1) dan 7 (indeks 8): jarak 7 x tinggi 7 = 49."
      },
      {
        "input": "height = [1, 1]",
        "output": "1",
        "explanation": "Jarak 1 x tinggi 1 = 1."
      }
    ],
    "constraints": [
      "Minimal ada dua garis.",
      "Tinggi garis tidak negatif."
    ],
    "functionName": "maxArea",
    "jsSignature": "function maxArea(height) {",
    "tests": [
      {
        "args": [
          [
            1,
            8,
            6,
            2,
            5,
            4,
            8,
            3,
            7
          ]
        ],
        "expected": 49
      },
      {
        "args": [
          [
            1,
            1
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            4,
            3,
            2,
            1,
            4
          ]
        ],
        "expected": 16
      },
      {
        "args": [
          [
            1,
            2,
            1
          ]
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Luas dibatasi oleh garis yang LEBIH PENDEK. Jadi garis pendek adalah yang membatasi, bukan garis tinggi.",
      "Mulai dari dua ujung (lebar maksimum). Lalu geser penunjuk di sisi garis yang lebih pendek ke dalam — menggeser sisi yang tinggi tidak akan pernah menambah luas karena tingginya tetap dibatasi sisi pendek.",
      "Pseudocode: l = 0, r = akhir, best = 0; selama l < r: best = max(best, (r-l) * min(height[l], height[r])); geser penunjuk di sisi yang lebih pendek."
    ],
    "solutions": {
      "javascript": "function maxArea(height) {\n  let l = 0, r = height.length - 1, best = 0;\n  while (l < r) {\n    best = Math.max(best, (r - l) * Math.min(height[l], height[r]));\n    if (height[l] < height[r]) l++; else r--;\n  }\n  return best;\n}",
      "python": "def max_area(height):\n    l, r, best = 0, len(height) - 1, 0\n    while l < r:\n        best = max(best, (r - l) * min(height[l], height[r]))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return best",
      "java": "public int maxArea(int[] height) {\n    int l = 0, r = height.length - 1, best = 0;\n    while (l < r) {\n        best = Math.max(best, (r - l) * Math.min(height[l], height[r]));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return best;\n}",
      "go": "func maxArea(height []int) int {\n    l, r, best := 0, len(height)-1, 0\n    for l < r {\n        h := height[l]; if height[r] < h { h = height[r] }\n        if (r-l)*h > best { best = (r - l) * h }\n        if height[l] < height[r] { l++ } else { r-- }\n    }\n    return best\n}",
      "cpp": "int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, best = 0;\n    while (l < r) {\n        best = max(best, (r - l) * min(height[l], height[r]));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return best;\n}"
    },
    "complexity": "Waktu O(n) sekali jalan. Memori O(1).",
    "edgeCases": [
      "Dua garis saja.",
      "Garis tertinggi ada di tengah — tetap bisa terlewat kalau sisi pendeknya membatasi.",
      "Semua tinggi sama."
    ],
    "quiz": {
      "question": "Kenapa yang digeser adalah penunjuk di sisi garis yang lebih pendek?",
      "options": [
        "Karena sisi pendek lebih mudah digeser",
        "Karena luas dibatasi sisi pendek; menggeser sisi tinggi tidak bisa menambah tinggi pembatas",
        "Karena sisi tinggi sudah pasti jawaban",
        "Karena lebarnya berkurang"
      ],
      "answer": 1,
      "explanation": "Tinggi wadah = min(kedua sisi). Menggeser sisi tinggi hanya memperkecil lebar tanpa menaikkan tinggi pembatas, jadi tidak pernah lebih baik."
    }
  },
  {
    "id": "substring-tanpa-ulang-terpanjang",
    "title": "Substring Tanpa Huruf Berulang Terpanjang",
    "difficulty": "Medium",
    "pattern": "Sliding Window",
    "description": "Diberikan sebuah string. Temukan panjang substring terpanjang yang tidak mengandung huruf yang berulang. Substring harus berurutan (contiguous), bukan sekadar kumpulan huruf.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "Substring \"abc\" panjangnya 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "Hanya \"b\" yang bisa diambil tanpa pengulangan."
      },
      {
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "Substring \"wke\" panjangnya 3."
      }
    ],
    "constraints": [
      "String bisa kosong -> jawabannya 0.",
      "Substring harus berurutan."
    ],
    "functionName": "lengthOfLongestSubstring",
    "jsSignature": "function lengthOfLongestSubstring(s) {",
    "tests": [
      {
        "args": [
          "abcabcbb"
        ],
        "expected": 3
      },
      {
        "args": [
          "bbbbb"
        ],
        "expected": 1
      },
      {
        "args": [
          "pwwkew"
        ],
        "expected": 3
      },
      {
        "args": [
          ""
        ],
        "expected": 0
      },
      {
        "args": [
          "au"
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Pikirkan jendela (window) yang ujung kirinya hanya maju, tidak pernah mundur. Ujung kanan maju satu huruf demi satu huruf.",
      "Saat huruf di ujung kanan sudah ada di dalam jendela, geser ujung kiri melewati kemunculan huruf itu sebelumnya.",
      "Pseudocode: simpan posisi terakhir tiap huruf di peta; left = 0, best = 0; untuk right, ch: jika ch pernah terlihat di posisi >= left, left = posisi itu + 1; simpan posisi ch; best = max(best, right - left + 1)."
    ],
    "solutions": {
      "javascript": "function lengthOfLongestSubstring(s) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    const ch = s[right];\n    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n    last.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}",
      "python": "def length_of_longest_substring(s):\n    last, left, best = {}, 0, 0\n    for right, ch in enumerate(s):\n        if ch in last and last[ch] >= left:\n            left = last[ch] + 1\n        last[ch] = right\n        best = max(best, right - left + 1)\n    return best",
      "java": "public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>();\n    int left = 0, best = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char ch = s.charAt(right);\n        if (last.containsKey(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n        last.put(ch, right);\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}",
      "go": "func lengthOfLongestSubstring(s string) int {\n    last := map[byte]int{}\n    left, best := 0, 0\n    for right := 0; right < len(s); right++ {\n        ch := s[right]\n        if pos, ok := last[ch]; ok && pos >= left { left = pos + 1 }\n        last[ch] = right\n        if right-left+1 > best { best = right - left + 1 }\n    }\n    return best\n}",
      "cpp": "int lengthOfLongestSubstring(string s) {\n    unordered_map<char, int> last;\n    int left = 0, best = 0;\n    for (int right = 0; right < (int)s.size(); right++) {\n        char ch = s[right];\n        if (last.count(ch) && last[ch] >= left) left = last[ch] + 1;\n        last[ch] = right;\n        best = max(best, right - left + 1);\n    }\n    return best;\n}"
    },
    "complexity": "Waktu O(n), tiap huruf dikunjungi sekali. Memori O(k) untuk huruf berbeda di jendela.",
    "edgeCases": [
      "String kosong -> 0.",
      "Semua huruf sama -> 1.",
      "Huruf berulang tapi kemunculan sebelumnya sudah di luar jendela."
    ],
    "quiz": {
      "question": "Kenapa ujung kiri jendela tidak pernah mundur?",
      "options": [
        "Karena kiri selalu 0",
        "Karena sekali huruf keluar dari jendela, ia tidak akan jadi penghalang lagi untuk jendela yang sedang berjalan",
        "Karena string sudah terurut",
        "Karena kiri tidak penting"
      ],
      "answer": 1,
      "explanation": "Jendela hanya membesar ke kanan; huruf yang sudah ditinggalkan tidak bisa berulang di dalam jendela saat ini, jadi left cukup maju."
    }
  },
  {
    "id": "grup-anagram",
    "title": "Kelompok Anagram",
    "difficulty": "Medium",
    "pattern": "Hash Map",
    "description": "Diberikan sekumpulan kata. Kelompokkan kata-kata yang merupakan anagram satu sama lain — yaitu kata yang huruf-hurufnya sama, hanya urutannya berbeda. Kembalikan daftar kelompoknya.",
    "examples": [
      {
        "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
        "output": "[[\"eat\", \"tea\", \"ate\"], [\"tan\", \"nat\"], [\"bat\"]]",
        "explanation": "\"eat\", \"tea\", \"ate\" satu kelompok; \"tan\", \"nat\" satu kelompok; \"bat\" sendiri."
      },
      {
        "input": "strs = [\"\"]",
        "output": "[[\"\"]]",
        "explanation": "Satu kata kosong membentuk satu kelompok."
      }
    ],
    "constraints": [
      "Kata bisa kosong.",
      "Urutan kelompok dan urutan kata di dalam kelompok tidak penting untuk penilaian di sini — test membandingkan setelah diurutkan."
    ],
    "functionName": "groupAnagrams",
    "jsSignature": "function groupAnagrams(strs) {",
    "tests": [
      {
        "args": [
          [
            "eat",
            "tea",
            "tan",
            "ate",
            "nat",
            "bat"
          ]
        ],
        "expected": [
          [
            "bat"
          ],
          [
            "eat",
            "tea",
            "ate"
          ],
          [
            "tan",
            "nat"
          ]
        ]
      },
      {
        "args": [
          [
            ""
          ]
        ],
        "expected": [
          [
            ""
          ]
        ]
      },
      {
        "args": [
          [
            "a"
          ]
        ],
        "expected": [
          [
            "a"
          ]
        ]
      }
    ],
    "hints": [
      "Dua kata adalah anagram jika huruf-hurufnya sama. Jadi keduanya butuh satu \"tanda pengenal\" yang sama.",
      "Tanda pengenal itu bisa berupa kata itu sendiri setelah hurufnya diurutkan: \"eat\" dan \"tea\" sama-sama menjadi \"aet\".",
      "Pseudocode: buat peta kunci -> daftar kata; untuk tiap kata, kunci = huruf kata yang diurutkan; masukkan kata ke daftar kunci itu; kembalikan semua daftar di peta."
    ],
    "solutions": {
      "javascript": "function groupAnagrams(strs) {\n  const groups = new Map();\n  for (const s of strs) {\n    const key = [...s].sort().join(\"\");\n    if (!groups.has(key)) groups.set(key, []);\n    groups.get(key).push(s);\n  }\n  return [...groups.values()];\n}",
      "python": "def group_anagrams(strs):\n    groups = {}\n    for s in strs:\n        key = \"\".join(sorted(s))\n        groups.setdefault(key, []).append(s)\n    return list(groups.values())",
      "java": "public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String s : strs) {\n        char[] c = s.toCharArray(); Arrays.sort(c);\n        String key = new String(c);\n        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(groups.values());\n}",
      "go": "func groupAnagrams(strs []string) [][]string {\n    groups := map[string][]string{}\n    for _, s := range strs {\n        b := []byte(s); sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })\n        key := string(b)\n        groups[key] = append(groups[key], s)\n    }\n    out := [][]string{}\n    for _, v := range groups { out = append(out, v) }\n    return out\n}",
      "cpp": "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    unordered_map<string, vector<string>> groups;\n    for (string s : strs) {\n        string key = s; sort(key.begin(), key.end());\n        groups[key].push_back(s);\n    }\n    vector<vector<string>> out;\n    for (auto& kv : groups) out.push_back(kv.second);\n    return out;\n}"
    },
    "complexity": "Waktu O(n * k log k) dengan k panjang kata terpanjang (untuk mengurutkan huruf). Memori O(n * k).",
    "edgeCases": [
      "Kata kosong.",
      "Satu huruf.",
      "Semua kata adalah anagram satu sama lain."
    ],
    "quiz": {
      "question": "Apa kunci pengelompokan yang dipakai di solusi ini?",
      "options": [
        "Panjang kata",
        "Huruf kata setelah diurutkan",
        "Huruf pertama kata",
        "Jumlah vokal"
      ],
      "answer": 1,
      "explanation": "Anagram punya multiset huruf yang sama, jadi setelah diurutkan keduanya menghasilkan string kunci yang identik."
    }
  },
  {
    "id": "produk-kecuali-diri-sendiri",
    "title": "Produk Array Kecuali Diri Sendiri",
    "difficulty": "Medium",
    "pattern": "Array",
    "description": "Diberikan array angka. Untuk tiap posisi, hitung produk (perkalian) semua angka lain di array kecuali angka di posisi itu sendiri. Kembalikan array hasil dengan panjang yang sama. Jangan memakai pembagian.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]",
        "explanation": "Posisi 0: 2*3*4=24; posisi 1: 1*3*4=12; posisi 2: 1*2*4=8; posisi 3: 1*2*3=6."
      },
      {
        "input": "nums = [-1, 1, 0, -3, 3]",
        "output": "[0, 0, 9, 0, 0]",
        "explanation": "Hanya posisi yang bernilai 0 yang hasilnya bukan 0."
      }
    ],
    "constraints": [
      "Dilarang memakai pembagian.",
      "Hasil dijamin muat dalam integer 32-bit."
    ],
    "functionName": "productExceptSelf",
    "jsSignature": "function productExceptSelf(nums) {",
    "tests": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          24,
          12,
          8,
          6
        ]
      },
      {
        "args": [
          [
            -1,
            1,
            0,
            -3,
            3
          ]
        ],
        "expected": [
          0,
          0,
          9,
          0,
          0
        ]
      },
      {
        "args": [
          [
            2,
            3
          ]
        ],
        "expected": [
          3,
          2
        ]
      }
    ],
    "hints": [
      "Produk semua angka kecuali posisi i bisa dipecah jadi dua bagian: produk semua angka di KIRI i, dikali produk semua angka di KANAN i.",
      "Produk kiri bisa dihitung sekali jalan dari kiri ke kanan; produk kanan sekali jalan dari kanan ke kiri. Dua jalan itu cukup.",
      "Pseudocode: out[i] = produk kiri sejauh ini, lalu kalikan dengan produk kanan yang berjalan dari kanan; perbarui produk kiri/kanan di tiap langkah."
    ],
    "solutions": {
      "javascript": "function productExceptSelf(nums) {\n  const n = nums.length, out = new Array(n).fill(1);\n  let left = 1;\n  for (let i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }\n  let right = 1;\n  for (let i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }\n  return out;\n}",
      "python": "def product_except_self(nums):\n    n = len(nums)\n    out = [1] * n\n    left = 1\n    for i in range(n):\n        out[i] = left; left *= nums[i]\n    right = 1\n    for i in range(n - 1, -1, -1):\n        out[i] *= right; right *= nums[i]\n    return out",
      "java": "public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] out = new int[n];\n    int left = 1;\n    for (int i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }\n    int right = 1;\n    for (int i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }\n    return out;\n}",
      "go": "func productExceptSelf(nums []int) []int {\n    n := len(nums)\n    out := make([]int, n)\n    left := 1\n    for i := 0; i < n; i++ { out[i] = left; left *= nums[i] }\n    right := 1\n    for i := n - 1; i >= 0; i-- { out[i] *= right; right *= nums[i] }\n    return out\n}",
      "cpp": "vector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> out(n, 1);\n    int left = 1;\n    for (int i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }\n    int right = 1;\n    for (int i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }\n    return out;\n}"
    },
    "complexity": "Waktu O(n) dua kali jalan. Memori O(1) di luar array hasil.",
    "edgeCases": [
      "Ada satu angka 0 -> hanya posisi 0 itu yang hasilnya bukan 0.",
      "Ada dua angka 0 -> semua hasil 0.",
      "Array dua elemen."
    ],
    "quiz": {
      "question": "Kenapa solusi ini tidak memakai pembagian?",
      "options": [
        "Karena pembagian lambat",
        "Karena ada angka 0 yang membuat pembagian tidak berlaku",
        "Karena angkanya besar",
        "Karena pembagian dilarang di semua bahasa"
      ],
      "answer": 1,
      "explanation": "Total produk dibagi nums[i] gagal saat nums[i] = 0 (pembagian oleh nol) dan saat ada nol lain di array."
    }
  },
  {
    "id": "jumlah-subarray-sama-dengan-k",
    "title": "Jumlah Subarray yang Jumlahnya K",
    "difficulty": "Medium",
    "pattern": "Hash Map",
    "description": "Diberikan array angka (boleh negatif) dan target k. Hitung berapa banyak subarray yang berurutan (contiguous) yang jumlah elemennya tepat sama dengan k.",
    "examples": [
      {
        "input": "nums = [1, 1, 1], k = 2",
        "output": "2",
        "explanation": "Subarray [1,1] di posisi 0-1 dan di posisi 1-2."
      },
      {
        "input": "nums = [1, 2, 3], k = 3",
        "output": "2",
        "explanation": "Subarray [1,2] dan [3]."
      }
    ],
    "constraints": [
      "Angka boleh negatif, jadi sliding window biasa tidak berlaku.",
      "Subarray harus berurutan."
    ],
    "functionName": "subarraySum",
    "jsSignature": "function subarraySum(nums, k) {",
    "tests": [
      {
        "args": [
          [
            1,
            1,
            1
          ],
          2
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          3
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            -1,
            0
          ],
          0
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1
          ],
          0
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Gunakan jumlah kumulatif (prefix sum). Jumlah subarray dari posisi i sampai j = prefix[j] - prefix[i-1].",
      "Subarray itu berjumlah k jika prefix[j] - prefix[i-1] = k, alias prefix[i-1] = prefix[j] - k. Jadi yang dicari adalah: berapa kali nilai prefix[j] - k sudah pernah muncul.",
      "Pseudocode: peta frekuensi prefix, mulai {0: 1}; prefix = 0, count = 0; untuk tiap x: prefix += x; count += peta[prefix - k] (atau 0); peta[prefix]++. Kembalikan count."
    ],
    "solutions": {
      "javascript": "function subarraySum(nums, k) {\n  const freq = new Map([[0, 1]]);\n  let prefix = 0, count = 0;\n  for (const x of nums) {\n    prefix += x;\n    count += freq.get(prefix - k) || 0;\n    freq.set(prefix, (freq.get(prefix) || 0) + 1);\n  }\n  return count;\n}",
      "python": "def subarray_sum(nums, k):\n    from collections import Counter\n    freq = Counter({0: 1})\n    prefix, count = 0, 0\n    for x in nums:\n        prefix += x\n        count += freq[prefix - k]\n        freq[prefix] += 1\n    return count",
      "java": "public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    int prefix = 0, count = 0;\n    for (int x : nums) {\n        prefix += x;\n        count += freq.getOrDefault(prefix - k, 0);\n        freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n}",
      "go": "func subarraySum(nums []int, k int) int {\n    freq := map[int]int{0: 1}\n    prefix, count := 0, 0\n    for _, x := range nums {\n        prefix += x\n        count += freq[prefix-k]\n        freq[prefix]++\n    }\n    return count\n}",
      "cpp": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> freq{{0, 1}};\n    int prefix = 0, count = 0;\n    for (int x : nums) {\n        prefix += x;\n        count += freq[prefix - k];\n        freq[prefix]++;\n    }\n    return count;\n}"
    },
    "complexity": "Waktu O(n) sekali jalan. Memori O(n) untuk peta frekuensi prefix.",
    "edgeCases": [
      "Angka negatif membuat sliding window gagal, prefix sum tetap benar.",
      "k = 0 dan ada subarray yang jumlahnya 0.",
      "Prefix awal 0 harus dihitung 1 kali agar subarray dari awal terhitung."
    ],
    "quiz": {
      "question": "Kenapa peta frekuensi dimulai dengan {0: 1}?",
      "options": [
        "Supaya peta tidak kosong",
        "Supaya subarray yang mulai dari indeks 0 ikut terhitung",
        "Supaya k selalu ditemukan",
        "Supaya angkanya genap"
      ],
      "answer": 1,
      "explanation": "Subarray dari awal berarti prefix[i-1] = 0; tanpa entri awal itu, subarray yang dimulai di indeks 0 tidak akan terhitung."
    }
  },
  {
    "id": "jumlah-pulau",
    "title": "Jumlah Pulau",
    "difficulty": "Medium",
    "pattern": "DFS / BFS",
    "description": "Diberikan peta grid berisi \"1\" (darat) dan \"0\" (air). Sebuah pulau adalah kelompok sel darat yang terhubung secara horizontal atau vertikal (bukan diagonal), dikelilingi air. Hitung jumlah pulau di peta itu.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "output": "2",
        "explanation": "Pulau pertama di kiri atas (3 sel), pulau kedua satu sel di kanan bawah."
      },
      {
        "input": "grid = [[\"1\",\"1\"],[\"1\",\"1\"]]",
        "output": "1",
        "explanation": "Semua darat terhubung jadi satu pulau."
      }
    ],
    "constraints": [
      "Koneksi hanya horizontal/vertikal, bukan diagonal.",
      "Grid bisa kosong."
    ],
    "functionName": "numIslands",
    "jsSignature": "function numIslands(grid) {",
    "tests": [
      {
        "args": [
          [
            [
              "1",
              "1",
              "0"
            ],
            [
              "1",
              "0",
              "0"
            ],
            [
              "0",
              "0",
              "1"
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              "1",
              "1"
            ],
            [
              "1",
              "1"
            ]
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            [
              "0",
              "0"
            ],
            [
              "0",
              "0"
            ]
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          [
            [
              "1"
            ]
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Setiap kali menemukan sel \"1\" yang belum dikunjungi, itu adalah satu pulau baru. Tugas berikutnya: tandai seluruh pulau itu supaya tidak dihitung dua kali.",
      "Tandai pulau dengan menjelajah (DFS/BFS) dari sel itu ke semua tetangga darat, dan ubah sel yang sudah dikunjungi menjadi \"0\" atau tandai di set terpisah.",
      "Pseudocode: count = 0; untuk tiap sel: jika grid[i][j] === \"1\": count++; jalankan DFS yang mengubah sel itu dan tetangga daratnya jadi \"0\". Kembalikan count."
    ],
    "solutions": {
      "javascript": "function numIslands(grid) {\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== \"1\") return;\n    grid[r][c] = \"0\";\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[0].length; c++) if (grid[r][c] === \"1\") { count++; dfs(r, c); }\n  return count;\n}",
      "python": "def num_islands(grid):\n    if not grid:\n        return 0\n    count = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]) or grid[r][c] != \"1\":\n            return\n        grid[r][c] = \"0\"\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c] == \"1\":\n                count += 1; dfs(r, c)\n    return count",
      "java": "public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n    return count;\n}\nprivate void dfs(char[][] g, int r, int c) {\n    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;\n    g[r][c] = '0'; dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);\n}",
      "go": "func numIslands(grid [][]byte) int {\n    count := 0\n    var dfs func(r, c int)\n    dfs = func(r, c int) {\n        if r < 0 || c < 0 || r >= len(grid) || c >= len(grid[0]) || grid[r][c] != '1' { return }\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    }\n    for r := range grid { for c := range grid[r] { if grid[r][c] == '1' { count++; dfs(r, c) } } }\n    return count\n}",
      "cpp": "int numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    function<void(int, int)> dfs = [&](int r, int c) {\n        if (r < 0 || c < 0 || r >= (int)grid.size() || c >= (int)grid[0].size() || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    };\n    for (int r = 0; r < (int)grid.size(); r++) for (int c = 0; c < (int)grid[0].size(); c++) if (grid[r][c] == '1') { count++; dfs(r, c); }\n    return count;\n}"
    },
    "complexity": "Waktu O(m*n), tiap sel dikunjungi sekali. Memori O(m*n) untuk tumpukan rekursi pada kasus terburuk.",
    "edgeCases": [
      "Grid kosong -> 0.",
      "Semua air -> 0.",
      "Darat yang hanya bersentuhan diagonal adalah dua pulau berbeda."
    ],
    "quiz": {
      "question": "Kenapa sel yang sudah dikunjungi harus ditandai?",
      "options": [
        "Supaya gridnya rapi",
        "Supaya satu pulau tidak dihitung berkali-kali",
        "Supaya airnya hilang",
        "Supaya DFS lebih cepat saja"
      ],
      "answer": 1,
      "explanation": "Tanpa penanda, loop utama akan menemukan lagi sel darat dari pulau yang sama dan menghitungnya sebagai pulau baru."
    }
  },
  {
    "id": "jadwal-kursus",
    "title": "Bisakah Semua Kursus Diambil?",
    "difficulty": "Medium",
    "pattern": "Graph",
    "description": "Ada sejumlah kursus bernomor 0 sampai n-1. Beberapa kursus punya prasyarat: pasangan [a, b] berarti kursus b harus diambil sebelum kursus a. Tentukan apakah semua kursus bisa diambil — yaitu, apakah tidak ada lingkaran prasyarat (siklus).",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1, 0]]",
        "output": "true",
        "explanation": "Ambil kursus 0 dulu, lalu kursus 1."
      },
      {
        "input": "numCourses = 2, prerequisites = [[1, 0], [0, 1]]",
        "output": "false",
        "explanation": "Kursus 0 butuh 1, kursus 1 butuh 0 — lingkaran, tidak bisa selesai."
      }
    ],
    "constraints": [
      "Prasyarat bisa kosong.",
      "Tidak ada pasangan prasyarat duplikat yang mengubah jawaban."
    ],
    "functionName": "canFinish",
    "jsSignature": "function canFinish(numCourses, prerequisites) {",
    "tests": [
      {
        "args": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": true
      },
      {
        "args": [
          2,
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": false
      },
      {
        "args": [
          3,
          []
        ],
        "expected": true
      },
      {
        "args": [
          3,
          [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              0
            ]
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Ini soal deteksi siklus di graf berarah. Kursus = simpul, prasyarat = sisi dari prasyarat ke kursus yang membutuhkannya.",
      "Coba susun urutan pengambilan (topological sort): kursus yang prasyaratnya sudah terpenuhi bisa diambil, lalu ia membuka kursus berikutnya. Kalau di akhir ada kursus yang tidak pernah terbuka, berarti ada siklus.",
      "Pseudocode: hitung in-degree tiap kursus; antre kursus dengan in-degree 0; ambil satu, kurangi in-degree tetangganya, antre yang jadi 0; kembalikan true jika jumlah yang diambil == numCourses."
    ],
    "solutions": {
      "javascript": "function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({ length: numCourses }, () => []);\n  const indeg = new Array(numCourses).fill(0);\n  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }\n  const q = [];\n  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);\n  let taken = 0;\n  while (q.length) { const u = q.shift(); taken++; for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); }\n  return taken === numCourses;\n}",
      "python": "def can_finish(num_courses, prerequisites):\n    from collections import deque\n    adj = [[] for _ in range(num_courses)]\n    indeg = [0] * num_courses\n    for a, b in prerequisites:\n        adj[b].append(a); indeg[a] += 1\n    q = deque([i for i in range(num_courses) if indeg[i] == 0])\n    taken = 0\n    while q:\n        u = q.popleft(); taken += 1\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0: q.append(v)\n    return taken == num_courses",
      "java": "public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> adj = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n    int[] indeg = new int[numCourses];\n    for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indeg[p[0]]++; }\n    Queue<Integer> q = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);\n    int taken = 0;\n    while (!q.isEmpty()) { int u = q.remove(); taken++; for (int v : adj.get(u)) if (--indeg[v] == 0) q.add(v); }\n    return taken == numCourses;\n}",
      "go": "func canFinish(numCourses int, prerequisites [][]int) bool {\n    adj := make([][]int, numCourses)\n    indeg := make([]int, numCourses)\n    for _, p := range prerequisites { adj[p[1]] = append(adj[p[1]], p[0]); indeg[p[0]]++ }\n    q := []int{}\n    for i := 0; i < numCourses; i++ { if indeg[i] == 0 { q = append(q, i) } }\n    taken := 0\n    for len(q) > 0 { u := q[0]; q = q[1:]; taken++; for _, v := range adj[u] { indeg[v]--; if indeg[v] == 0 { q = append(q, v) } } }\n    return taken == numCourses\n}",
      "cpp": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> adj(numCourses);\n    vector<int> indeg(numCourses, 0);\n    for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); indeg[p[0]]++; }\n    queue<int> q;\n    for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.push(i);\n    int taken = 0;\n    while (!q.empty()) { int u = q.front(); q.pop(); taken++; for (int v : adj[u]) if (--indeg[v] == 0) q.push(v); }\n    return taken == numCourses;\n}"
    },
    "complexity": "Waktu O(V + E) untuk simpul dan sisi prasyarat. Memori O(V + E).",
    "edgeCases": [
      "Tidak ada prasyarat -> true.",
      "Siklus dengan 2 kursus.",
      "Siklus tersembunyi di tengah graf yang besar."
    ],
    "quiz": {
      "question": "Apa arti \"in-degree 0\" untuk sebuah kursus?",
      "options": [
        "Kursus itu tidak penting",
        "Kursus itu tidak punya prasyarat yang belum terpenuhi, jadi bisa diambil sekarang",
        "Kursus itu tidak punya tetangga",
        "Kursus itu yang terakhir diambil"
      ],
      "answer": 1,
      "explanation": "In-degree menghitung prasyarat yang belum selesai. Nol berarti semua prasyaratnya sudah terpenuhi (atau memang tidak ada)."
    }
  },
  {
    "id": "kombinasi-jumlah-target",
    "title": "Kombinasi yang Jumlahnya Target",
    "difficulty": "Medium",
    "pattern": "Backtracking",
    "description": "Diberikan sekumpulan angka berbeda (candidates) dan sebuah target. Temukan semua kombinasi angka yang jumlahnya tepat sama dengan target. Satu angka boleh dipakai berulang kali. Dua kombinasi dianggap sama jika angka-angkanya sama, tanpa peduli urutan.",
    "examples": [
      {
        "input": "candidates = [2, 3, 6, 7], target = 7",
        "output": "[[2, 2, 3], [7]]",
        "explanation": "2+2+3 = 7 dan 7 = 7."
      },
      {
        "input": "candidates = [2, 3, 5], target = 8",
        "output": "[[2, 2, 2, 2], [2, 3, 3], [3, 5]]",
        "explanation": "Tiga kombinasi berbeda yang jumlahnya 8."
      }
    ],
    "constraints": [
      "Satu angka boleh dipakai berulang kali.",
      "Kombinasi yang sama (urutan berbeda) hanya dihitung sekali."
    ],
    "functionName": "combinationSum",
    "jsSignature": "function combinationSum(candidates, target) {",
    "tests": [
      {
        "args": [
          [
            2,
            3,
            6,
            7
          ],
          7
        ],
        "expected": [
          [
            2,
            2,
            3
          ],
          [
            7
          ]
        ]
      },
      {
        "args": [
          [
            2,
            3,
            5
          ],
          8
        ],
        "expected": [
          [
            2,
            2,
            2,
            2
          ],
          [
            2,
            3,
            3
          ],
          [
            3,
            5
          ]
        ]
      },
      {
        "args": [
          [
            2
          ],
          1
        ],
        "expected": []
      }
    ],
    "hints": [
      "Ini soal pencarian semua kemungkinan (backtracking). Bangun kombinasi selangkah demi selangkah, dan berhenti di satu cabang begitu jumlahnya sudah melebihi target.",
      "Supaya tidak menghasilkan kombinasi duplikat, tetapkan aturan: di tiap langkah, kamu hanya boleh memakai angka dari posisi saat ini ke kanan — tidak boleh kembali ke angka sebelumnya.",
      "Pseudocode: fungsi cari(mulai, sisa, kombinasi): jika sisa == 0 simpan salinan kombinasi; jika sisa < 0 kembali; untuk i dari mulai sampai akhir: tambahkan candidates[i], cari(i, sisa - candidates[i]), lalu hapus lagi."
    ],
    "solutions": {
      "javascript": "function combinationSum(candidates, target) {\n  const out = [];\n  function backtrack(start, remain, cur) {\n    if (remain === 0) { out.push([...cur]); return; }\n    if (remain < 0) return;\n    for (let i = start; i < candidates.length; i++) {\n      cur.push(candidates[i]);\n      backtrack(i, remain - candidates[i], cur);\n      cur.pop();\n    }\n  }\n  backtrack(0, target, []);\n  return out;\n}",
      "python": "def combination_sum(candidates, target):\n    out = []\n    def backtrack(start, remain, cur):\n        if remain == 0:\n            out.append(list(cur)); return\n        if remain < 0:\n            return\n        for i in range(start, len(candidates)):\n            cur.append(candidates[i])\n            backtrack(i, remain - candidates[i], cur)\n            cur.pop()\n    backtrack(0, target, [])\n    return out",
      "java": "public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> out = new ArrayList<>();\n    backtrack(candidates, target, 0, new ArrayList<>(), out);\n    return out;\n}\nprivate void backtrack(int[] c, int remain, int start, List<Integer> cur, List<List<Integer>> out) {\n    if (remain == 0) { out.add(new ArrayList<>(cur)); return; }\n    if (remain < 0) return;\n    for (int i = start; i < c.length; i++) { cur.add(c[i]); backtrack(c, remain - c[i], i, cur, out); cur.remove(cur.size() - 1); }\n}",
      "go": "func combinationSum(candidates []int, target int) [][]int {\n    out := [][]int{}\n    var backtrack func(start, remain int, cur []int)\n    backtrack = func(start, remain int, cur []int) {\n        if remain == 0 { cp := append([]int{}, cur...); out = append(out, cp); return }\n        if remain < 0 { return }\n        for i := start; i < len(candidates); i++ {\n            backtrack(i, remain-candidates[i], append(cur, candidates[i]))\n        }\n    }\n    backtrack(0, target, []int{})\n    return out\n}",
      "cpp": "vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    vector<vector<int>> out;\n    vector<int> cur;\n    function<void(int, int)> bt = [&](int start, int remain) {\n        if (remain == 0) { out.push_back(cur); return; }\n        if (remain < 0) return;\n        for (int i = start; i < (int)candidates.size(); i++) {\n            cur.push_back(candidates[i]);\n            bt(i, remain - candidates[i]);\n            cur.pop_back();\n        }\n    };\n    bt(0, target);\n    return out;\n}"
    },
    "complexity": "Waktu eksponensial terhadap target dan jumlah kandidat pada kasus terburuk. Memori sebanding kedalaman rekursi dan jumlah kombinasi.",
    "edgeCases": [
      "Target tidak bisa dicapai -> daftar kosong.",
      "Kandidat tunggal yang sama dengan target.",
      "Kombinasi dengan satu angka dipakai berkali-kali."
    ],
    "quiz": {
      "question": "Kenapa rekursi berikutnya dimulai dari indeks i yang sama, bukan i+1?",
      "options": [
        "Karena angkanya boleh dipakai berulang kali",
        "Karena indeksnya salah",
        "Supaya lebih cepat",
        "Karena targetnya besar"
      ],
      "answer": 0,
      "explanation": "Memulai dari i yang sama mengizinkan angka yang sama dipakai lagi; memulai dari i+1 akan melarang pengulangan."
    }
  }
];
