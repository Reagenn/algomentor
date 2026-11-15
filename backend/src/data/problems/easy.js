// Katalog soal Easy — bagian dari AlgoMentor v2.
// Isi soal SAMA PERSIS dengan v1 (judul, deskripsi, contoh, batasan, hints,
// solusi 5 bahasa, kompleksitas, edge case, kuis, test case) — hanya dipindah
// dari backend/src/problems.js ke file per tingkat kesulitan ini.
// Urutan soal di dalam tiap tingkat sama seperti v1.
module.exports = [
  {
    "id": "jumlah-dua-angka",
    "title": "Jumlah Dua Angka",
    "difficulty": "Easy",
    "pattern": "Hash Map",
    "description": "Diberikan sebuah array angka dan sebuah target. Temukan dua angka berbeda di dalam array yang jumlahnya sama dengan target, lalu kembalikan indeks keduanya. Dijamin tepat ada satu pasangan jawaban, dan satu elemen tidak boleh dipakai dua kali.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9."
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]",
        "explanation": "nums[1] + nums[2] = 2 + 4 = 6."
      },
      {
        "input": "nums = [3, 3], target = 6",
        "output": "[0, 1]",
        "explanation": "Dua angka yang sama nilainya, tapi indeksnya berbeda."
      }
    ],
    "constraints": [
      "Panjang array minimal 2.",
      "Tepat ada satu pasangan jawaban.",
      "Satu elemen tidak boleh dipakai dua kali."
    ],
    "functionName": "twoSum",
    "jsSignature": "function twoSum(nums, target) {",
    "tests": [
      {
        "args": [
          [
            2,
            7,
            11,
            15
          ],
          9
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "args": [
          [
            3,
            2,
            4
          ],
          6
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "args": [
          [
            3,
            3
          ],
          6
        ],
        "expected": [
          0,
          1
        ]
      }
    ],
    "hints": [
      "Untuk tiap angka, angka pasangan yang dibutuhkan sudah ditentukan: pasangan = target - angka saat ini. Jadi pertanyaannya berubah menjadi: apakah pasangan itu sudah pernah terlihat?",
      "Simpan angka yang sudah dilewati di sebuah peta (angka -> indeks). Saat memeriksa angka baru, cek dulu apakah pasangannya ada di peta sebelum menyimpan angka ini.",
      "Pseudocode: buat peta kosong; untuk i, x in nums: jika (target - x) ada di peta, kembalikan [peta[target - x], i]; jika tidak, simpan peta[x] = i."
    ],
    "solutions": {
      "javascript": "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}",
      "python": "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i",
      "java": "public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int need = target - nums[i];\n        if (seen.containsKey(need)) return new int[]{seen.get(need), i};\n        seen.put(nums[i], i);\n    }\n    return new int[]{};\n}",
      "go": "func twoSum(nums []int, target int) []int {\n    seen := map[int]int{}\n    for i, x := range nums {\n        if j, ok := seen[target-x]; ok { return []int{j, i} }\n        seen[x] = i\n    }\n    return nil\n}",
      "cpp": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < (int)nums.size(); i++) {\n        int need = target - nums[i];\n        if (seen.count(need)) return {seen[need], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}"
    },
    "complexity": "Waktu O(n) karena tiap elemen dicek sekali di peta. Memori O(n) untuk peta.",
    "edgeCases": [
      "Dua angka yang sama nilainya (mis. [3, 3]) — cek pasangan sebelum menyimpan angka saat ini.",
      "Jawaban bisa melibatkan elemen pertama dan terakhir.",
      "Angka negatif tetap berlaku karena rumusnya hanya target - x."
    ],
    "quiz": {
      "question": "Kenapa kita mengecek pasangan di peta SEBELUM menyimpan angka saat ini?",
      "options": [
        "Supaya kodenya lebih pendek",
        "Supaya satu elemen tidak dipakai dua kali sebagai pasangannya sendiri",
        "Supaya peta tidak penuh",
        "Supaya urutan indeks terbalik"
      ],
      "answer": 1,
      "explanation": "Kalau angka disimpan dulu, target = 2*x bisa salah menemukan dirinya sendiri (mis. nums = [3], target = 6)."
    }
  },
  {
    "id": "angka-palindrom",
    "title": "Angka Palindrom",
    "difficulty": "Easy",
    "pattern": "Matematika",
    "description": "Diberikan sebuah bilangan bulat. Tentukan apakah bilangan itu palindrom, yaitu dibaca dari depan dan dari belakang sama. Bilangan negatif bukan palindrom karena ada tanda minus di depan.",
    "examples": [
      {
        "input": "x = 121",
        "output": "true",
        "explanation": "Dibaca dari belakang tetap 121."
      },
      {
        "input": "x = -121",
        "output": "false",
        "explanation": "Dibaca dari belakang menjadi 121-."
      },
      {
        "input": "x = 10",
        "output": "false",
        "explanation": "Dibaca dari belakang menjadi 01, yaitu 1."
      }
    ],
    "constraints": [
      "Bilangan negatif selalu bukan palindrom.",
      "Bilangan yang berakhiran 0 (kecuali 0 sendiri) bukan palindrom."
    ],
    "functionName": "isPalindrome",
    "jsSignature": "function isPalindrome(x) {",
    "tests": [
      {
        "args": [
          121
        ],
        "expected": true
      },
      {
        "args": [
          -121
        ],
        "expected": false
      },
      {
        "args": [
          10
        ],
        "expected": false
      },
      {
        "args": [
          0
        ],
        "expected": true
      }
    ],
    "hints": [
      "Bilangan negatif langsung gugur. Begitu juga bilangan yang berakhiran 0 tapi bukan 0.",
      "Kamu tidak perlu membalik seluruh bilangan. Cukup balik setengah bagian belakangnya, lalu bandingkan dengan setengah bagian depan.",
      "Pseudocode: jika x < 0 atau (x % 10 === 0 dan x !== 0) kembalikan false; balik angka dari belakang sambil membagi x dengan 10 sampai angka yang dibalik >= sisa x; lalu cek apakah x === balik atau x === floor(balik / 10)."
    ],
    "solutions": {
      "javascript": "function isPalindrome(x) {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n  let rev = 0;\n  while (x > rev) { rev = rev * 10 + (x % 10); x = Math.floor(x / 10); }\n  return x === rev || x === Math.floor(rev / 10);\n}",
      "python": "def is_palindrome(x):\n    if x < 0 or (x % 10 == 0 and x != 0):\n        return False\n    rev = 0\n    while x > rev:\n        rev = rev * 10 + x % 10\n        x //= 10\n    return x == rev or x == rev // 10",
      "java": "public boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int rev = 0;\n    while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }\n    return x == rev || x == rev / 10;\n}",
      "go": "func isPalindrome(x int) bool {\n    if x < 0 || (x%10 == 0 && x != 0) { return false }\n    rev := 0\n    for x > rev { rev = rev*10 + x%10; x /= 10 }\n    return x == rev || x == rev/10\n}",
      "cpp": "bool isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int rev = 0;\n    while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }\n    return x == rev || x == rev / 10;\n}"
    },
    "complexity": "Waktu O(log n) karena bilangan dibagi 10 tiap langkah. Memori O(1).",
    "edgeCases": [
      "x = 0 adalah palindrom.",
      "x = 10, 100, 1000 bukan palindrom.",
      "Bilangan negatif selalu false."
    ],
    "quiz": {
      "question": "Kenapa cukup membalik setengah bilangan saja, bukan seluruhnya?",
      "options": [
        "Supaya kodenya lebih pendek",
        "Supaya tidak melampaui batas integer dan cukup untuk membandingkan dua paruh",
        "Karena setengah bilangan selalu palindrom",
        "Karena bilangan genap tidak perlu dibalik"
      ],
      "answer": 1,
      "explanation": "Membalik seluruh bilangan bisa meluap di bahasa dengan integer 32-bit; membandingkan dua paruh sudah cukup membuktikan palindrom."
    }
  },
  {
    "id": "awalan-umum-terpanjang",
    "title": "Awalan Umum Terpanjang",
    "difficulty": "Easy",
    "pattern": "String",
    "description": "Diberikan sekumpulan kata. Temukan awalan (prefix) terpanjang yang sama untuk semua kata. Jika tidak ada awalan yang sama, kembalikan string kosong.",
    "examples": [
      {
        "input": "strs = [\"flower\", \"flow\", \"flight\"]",
        "output": "\"fl\"",
        "explanation": "\"fl\" adalah awalan yang dimiliki ketiga kata; \"flo\" hanya dimiliki dua kata pertama."
      },
      {
        "input": "strs = [\"dog\", \"racecar\", \"car\"]",
        "output": "\"\"",
        "explanation": "Tidak ada huruf pertama yang sama."
      },
      {
        "input": "strs = [\"satu\"]",
        "output": "\"satu\"",
        "explanation": "Hanya ada satu kata, jadi seluruh kata itu adalah awalan umumnya."
      }
    ],
    "constraints": [
      "Kumpulan kata bisa berisi satu kata atau lebih.",
      "Kata bisa berbeda panjang."
    ],
    "functionName": "longestCommonPrefix",
    "jsSignature": "function longestCommonPrefix(strs) {",
    "tests": [
      {
        "args": [
          [
            "flower",
            "flow",
            "flight"
          ]
        ],
        "expected": "fl"
      },
      {
        "args": [
          [
            "dog",
            "racecar",
            "car"
          ]
        ],
        "expected": ""
      },
      {
        "args": [
          [
            "satu"
          ]
        ],
        "expected": "satu"
      },
      {
        "args": [
          [
            "ab",
            "a"
          ]
        ],
        "expected": "a"
      }
    ],
    "hints": [
      "Awalan umum tidak mungkin lebih panjang dari kata terpendek. Jadi kata terpendek adalah batas atas jawaban.",
      "Bandingkan huruf per huruf pada posisi yang sama di semua kata. Berhenti di posisi pertama yang berbeda.",
      "Pseudocode: ambil kata pertama sebagai calon awalan; untuk tiap kata lain, potong calon awalan sampai kata itu dimulai dengan calon tersebut; kembalikan calon."
    ],
    "solutions": {
      "javascript": "function longestCommonPrefix(strs) {\n  if (!strs.length) return \"\";\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);\n    if (!prefix) return \"\";\n  }\n  return prefix;\n}",
      "python": "def longest_common_prefix(strs):\n    if not strs:\n        return \"\"\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n        if not prefix:\n            return \"\"\n    return prefix",
      "java": "public String longestCommonPrefix(String[] strs) {\n    if (strs.length == 0) return \"\";\n    String prefix = strs[0];\n    for (int i = 1; i < strs.length; i++) {\n        while (!strs[i].startsWith(prefix)) prefix = prefix.substring(0, prefix.length() - 1);\n        if (prefix.isEmpty()) return \"\";\n    }\n    return prefix;\n}",
      "go": "func longestCommonPrefix(strs []string) string {\n    if len(strs) == 0 { return \"\" }\n    prefix := strs[0]\n    for _, s := range strs[1:] {\n        for !strings.HasPrefix(s, prefix) { prefix = prefix[:len(prefix)-1] }\n        if prefix == \"\" { return \"\" }\n    }\n    return prefix\n}",
      "cpp": "string longestCommonPrefix(vector<string>& strs) {\n    if (strs.empty()) return \"\";\n    string prefix = strs[0];\n    for (size_t i = 1; i < strs.size(); i++) {\n        while (strs[i].find(prefix) != 0) prefix.pop_back();\n        if (prefix.empty()) return \"\";\n    }\n    return prefix;\n}"
    },
    "complexity": "Waktu O(S) dengan S total panjang semua kata. Memori O(1) di luar hasil.",
    "edgeCases": [
      "Tidak ada huruf pertama yang sama -> string kosong.",
      "Satu kata saja -> kata itu sendiri.",
      "Kata kosong di dalam kumpulan -> jawaban string kosong."
    ],
    "quiz": {
      "question": "Apa batas atas panjang awalan umum?",
      "options": [
        "Kata terpanjang",
        "Kata terpendek",
        "Jumlah kata",
        "Huruf pertama saja"
      ],
      "answer": 1,
      "explanation": "Awalan umum harus dimiliki semua kata, jadi tidak bisa lebih panjang dari kata terpendek."
    }
  },
  {
    "id": "kurung-valid",
    "title": "Kurung Valid",
    "difficulty": "Easy",
    "pattern": "Stack",
    "description": "Diberikan sebuah string yang hanya berisi karakter kurung (), [], dan {}. Tentukan apakah susunan kurungnya valid: setiap kurung buka harus ditutup oleh kurung tutup yang sejenis, dalam urutan yang benar, dan tidak ada kurung yang menggantung.",
    "examples": [
      {
        "input": "s = \"()\"",
        "output": "true",
        "explanation": "Satu pasang kurung yang cocok."
      },
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "Tiga pasang kurung yang masing-masing cocok."
      },
      {
        "input": "s = \"(]\"",
        "output": "false",
        "explanation": "Kurung ( ditutup oleh ], jenisnya berbeda."
      }
    ],
    "constraints": [
      "String hanya berisi karakter ( ) [ ] { }.",
      "String kosong dianggap valid."
    ],
    "functionName": "isValid",
    "jsSignature": "function isValid(s) {",
    "tests": [
      {
        "args": [
          "()"
        ],
        "expected": true
      },
      {
        "args": [
          "()[]{}"
        ],
        "expected": true
      },
      {
        "args": [
          "(]"
        ],
        "expected": false
      },
      {
        "args": [
          "([)]"
        ],
        "expected": false
      },
      {
        "args": [
          "{[]}"
        ],
        "expected": true
      }
    ],
    "hints": [
      "Kurung tutup harus cocok dengan kurung buka yang PALING BARU dibuka — bukan yang pertama. Struktur \"paling baru dulu\" adalah ciri stack.",
      "Dorong (push) setiap kurung buka ke stack. Saat bertemu kurung tutup, periksa puncak stack: harus pasangannya, kalau tidak langsung false.",
      "Pseudocode: buat stack kosong dan peta pasangan tutup->buka; untuk tiap karakter: jika buka, push; jika tutup, pop dan cek kecocokan; di akhir stack harus kosong."
    ],
    "solutions": {
      "javascript": "function isValid(s) {\n  const stack = [];\n  const pair = { \")\": \"(\", \"]\": \"[\", \"}\": \"{\" };\n  for (const ch of s) {\n    if (ch === \"(\" || ch === \"[\" || ch === \"{\") stack.push(ch);\n    else if (stack.pop() !== pair[ch]) return false;\n  }\n  return stack.length === 0;\n}",
      "python": "def is_valid(s):\n    stack = []\n    pair = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for ch in s:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif not stack or stack.pop() != pair[ch]:\n            return False\n    return not stack",
      "java": "public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char ch : s.toCharArray()) {\n        if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);\n        else if (stack.isEmpty()) return false;\n        else { char open = stack.pop(); if ((ch == ')' && open != '(') || (ch == ']' && open != '[') || (ch == '}' && open != '{')) return false; }\n    }\n    return stack.isEmpty();\n}",
      "go": "func isValid(s string) bool {\n    stack := []rune{}\n    pair := map[rune]rune{')': '(', ']': '[', '}': '{'}\n    for _, ch := range s {\n        if ch == '(' || ch == '[' || ch == '{' { stack = append(stack, ch); continue }\n        if len(stack) == 0 { return false }\n        top := stack[len(stack)-1]; stack = stack[:len(stack)-1]\n        if top != pair[ch] { return false }\n    }\n    return len(stack) == 0\n}",
      "cpp": "bool isValid(string s) {\n    vector<char> st;\n    for (char ch : s) {\n        if (ch == '(' || ch == '[' || ch == '{') st.push_back(ch);\n        else {\n            if (st.empty()) return false;\n            char open = st.back(); st.pop_back();\n            if ((ch == ')' && open != '(') || (ch == ']' && open != '[') || (ch == '}' && open != '{')) return false;\n        }\n    }\n    return st.empty();\n}"
    },
    "complexity": "Waktu O(n), memori O(n) untuk stack pada kasus terburuk.",
    "edgeCases": [
      "String kosong -> true.",
      "\"([)]\" false karena urutan tutupnya salah, walau jenisnya lengkap.",
      "Kurung tutup tanpa pasangan buka -> false."
    ],
    "quiz": {
      "question": "Kenapa soal ini cocok diselesaikan dengan stack?",
      "options": [
        "Karena stack cepat",
        "Karena kurung tutup harus cocok dengan kurung buka yang paling baru dibuka",
        "Karena stack menyimpan semua huruf",
        "Karena soal ini tentang tumpukan buku"
      ],
      "answer": 1,
      "explanation": "Aturan \"terakhir dibuka, pertama ditutup\" persis perilaku LIFO stack."
    }
  },
  {
    "id": "gabung-dua-list-terurut",
    "title": "Gabung Dua List Terurut",
    "difficulty": "Easy",
    "pattern": "Linked List",
    "description": "Diberikan dua linked list yang masing-masing sudah terurut menaik. Gabungkan keduanya menjadi satu linked list terurut menaik, lalu kembalikan kepala (head) list hasil gabungan. Di versi lokal ini, list direpresentasikan sebagai array untuk latihan logika gabungnya.",
    "examples": [
      {
        "input": "list1 = [1, 2, 4], list2 = [1, 3, 4]",
        "output": "[1, 1, 2, 3, 4, 4]",
        "explanation": "Ambil elemen terkecil dari kepala kedua list secara bergantian."
      },
      {
        "input": "list1 = [], list2 = []",
        "output": "[]",
        "explanation": "Kedua list kosong, hasilnya kosong."
      },
      {
        "input": "list1 = [], list2 = [0]",
        "output": "[0]",
        "explanation": "Satu list kosong, hasilnya adalah list yang satunya."
      }
    ],
    "constraints": [
      "Kedua list sudah terurut menaik.",
      "Salah satu atau kedua list boleh kosong."
    ],
    "functionName": "mergeTwoLists",
    "jsSignature": "function mergeTwoLists(list1, list2) {",
    "tests": [
      {
        "args": [
          [
            1,
            2,
            4
          ],
          [
            1,
            3,
            4
          ]
        ],
        "expected": [
          1,
          1,
          2,
          3,
          4,
          4
        ]
      },
      {
        "args": [
          [],
          []
        ],
        "expected": []
      },
      {
        "args": [
          [],
          [
            0
          ]
        ],
        "expected": [
          0
        ]
      },
      {
        "args": [
          [
            5
          ],
          [
            1,
            2
          ]
        ],
        "expected": [
          1,
          2,
          5
        ]
      }
    ],
    "hints": [
      "Karena kedua list sudah terurut, elemen terkecil yang tersisa selalu ada di kepala salah satu list. Tidak perlu mengurutkan ulang dari awal.",
      "Gunakan dua penunjuk (satu per list) dan bandingkan nilai di kedua penunjuk; ambil yang lebih kecil, lalu majukan penunjuk itu.",
      "Pseudocode: siapkan hasil kosong; selama kedua penunjuk belum habis, ambil nilai yang lebih kecil; setelah itu tambahkan sisa list yang belum habis."
    ],
    "solutions": {
      "javascript": "function mergeTwoLists(list1, list2) {\n  const out = [];\n  let i = 0, j = 0;\n  while (i < list1.length && j < list2.length) {\n    if (list1[i] <= list2[j]) out.push(list1[i++]);\n    else out.push(list2[j++]);\n  }\n  return out.concat(list1.slice(i), list2.slice(j));\n}",
      "python": "def merge_two_lists(list1, list2):\n    out, i, j = [], 0, 0\n    while i < len(list1) and j < len(list2):\n        if list1[i] <= list2[j]:\n            out.append(list1[i]); i += 1\n        else:\n            out.append(list2[j]); j += 1\n    return out + list1[i:] + list2[j:]",
      "java": "public int[] mergeTwoLists(int[] a, int[] b) {\n    int[] out = new int[a.length + b.length];\n    int i = 0, j = 0, k = 0;\n    while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];\n    while (i < a.length) out[k++] = a[i++];\n    while (j < b.length) out[k++] = b[j++];\n    return out;\n}",
      "go": "func mergeTwoLists(a, b []int) []int {\n    out := []int{}\n    i, j := 0, 0\n    for i < len(a) && j < len(b) {\n        if a[i] <= b[j] { out = append(out, a[i]); i++ } else { out = append(out, b[j]); j++ }\n    }\n    return append(append(out, a[i:]...), b[j:]...)\n}",
      "cpp": "vector<int> mergeTwoLists(vector<int> a, vector<int> b) {\n    vector<int> out;\n    size_t i = 0, j = 0;\n    while (i < a.size() && j < b.size()) out.push_back(a[i] <= b[j] ? a[i++] : b[j++]);\n    while (i < a.size()) out.push_back(a[i++]);\n    while (j < b.size()) out.push_back(b[j++]);\n    return out;\n}"
    },
    "complexity": "Waktu O(n + m) karena tiap elemen dikunjungi sekali. Memori O(n + m) untuk hasil.",
    "edgeCases": [
      "Salah satu list kosong.",
      "Nilai yang sama di kedua list — keduanya harus muncul di hasil.",
      "List dengan satu elemen."
    ],
    "quiz": {
      "question": "Setelah satu list habis, apa yang dilakukan dengan sisa list lainnya?",
      "options": [
        "Dibuang",
        "Ditambahkan apa adanya karena sudah terurut",
        "Diurutkan ulang dulu",
        "Dibalik dulu"
      ],
      "answer": 1,
      "explanation": "Sisa list sudah terurut dan semua nilainya lebih besar dari yang sudah diambil, jadi tinggal ditempel."
    }
  },
  {
    "id": "beli-jual-saham",
    "title": "Beli dan Jual Saham Sekali",
    "difficulty": "Easy",
    "pattern": "Array",
    "description": "Diberikan harga saham tiap hari. Kamu boleh membeli di satu hari dan menjual di hari sesudahnya, sekali saja. Hitung keuntungan maksimum yang bisa didapat. Jika tidak ada keuntungan yang mungkin, kembalikan 0 (tidak wajib bertransaksi).",
    "examples": [
      {
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "output": "5",
        "explanation": "Beli di harga 1 (hari ke-2), jual di harga 6 (hari ke-5): 6 - 1 = 5."
      },
      {
        "input": "prices = [7, 6, 4, 3, 1]",
        "output": "0",
        "explanation": "Harga selalu turun, jadi tidak ada transaksi yang untung."
      }
    ],
    "constraints": [
      "Beli harus terjadi sebelum jual.",
      "Hanya satu kali transaksi.",
      "Jika tidak untung, jawabannya 0."
    ],
    "functionName": "maxProfit",
    "jsSignature": "function maxProfit(prices) {",
    "tests": [
      {
        "args": [
          [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        ],
        "expected": 5
      },
      {
        "args": [
          [
            7,
            6,
            4,
            3,
            1
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          [
            2,
            4,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1
          ]
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Keuntungan di hari ini = harga hari ini - harga beli termurah SEBELUM hari ini. Jadi yang perlu dilacak hanya dua hal: harga termurah sejauh ini dan keuntungan terbaik sejauh ini.",
      "Jalan sekali dari kiri ke kanan. Di tiap hari, hitung dulu keuntungan jika menjual hari ini, lalu perbarui harga termurah dengan harga hari ini.",
      "Pseudocode: minPrice = prices[0], best = 0; untuk tiap harga p: best = max(best, p - minPrice); minPrice = min(minPrice, p); kembalikan best."
    ],
    "solutions": {
      "javascript": "function maxProfit(prices) {\n  let minPrice = Infinity, best = 0;\n  for (const p of prices) {\n    best = Math.max(best, p - minPrice);\n    minPrice = Math.min(minPrice, p);\n  }\n  return best;\n}",
      "python": "def max_profit(prices):\n    min_price = float(\"inf\")\n    best = 0\n    for p in prices:\n        best = max(best, p - min_price)\n        min_price = min(min_price, p)\n    return best",
      "java": "public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE, best = 0;\n    for (int p : prices) {\n        best = Math.max(best, p - minPrice);\n        minPrice = Math.min(minPrice, p);\n    }\n    return best;\n}",
      "go": "func maxProfit(prices []int) int {\n    minPrice, best := 1<<62, 0\n    for _, p := range prices {\n        if p-minPrice > best { best = p - minPrice }\n        if p < minPrice { minPrice = p }\n    }\n    return best\n}",
      "cpp": "int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX, best = 0;\n    for (int p : prices) {\n        best = max(best, p - minPrice);\n        minPrice = min(minPrice, p);\n    }\n    return best;\n}"
    },
    "complexity": "Waktu O(n) sekali jalan. Memori O(1).",
    "edgeCases": [
      "Harga selalu turun -> 0.",
      "Satu hari saja -> 0.",
      "Harga termurah muncul di hari terakhir -> tidak sempat menjual."
    ],
    "quiz": {
      "question": "Kenapa harga termurah diperbarui SETELAH menghitung keuntungan hari ini?",
      "options": [
        "Supaya kodenya rapi",
        "Supaya beli dan jual tidak terjadi di hari yang sama",
        "Supaya harga termurah tidak berubah",
        "Supaya keuntungan selalu nol"
      ],
      "answer": 1,
      "explanation": "Beli harus sebelum jual; kalau minPrice diperbarui dulu dengan harga hari ini, kita bisa \"membeli dan menjual\" di hari yang sama dengan untung 0 — tidak salah, tapi urutan ini menjaga logika beli-dulu-jual-kemudian tetap jelas."
    }
  },
  {
    "id": "angka-hilang",
    "title": "Angka yang Hilang",
    "difficulty": "Easy",
    "pattern": "Array",
    "description": "Diberikan array berisi n angka berbeda dari rentang 0 sampai n. Tepat satu angka dari rentang itu tidak ada di array. Temukan angka yang hilang.",
    "examples": [
      {
        "input": "nums = [3, 0, 1]",
        "output": "2",
        "explanation": "Rentang 0..3, yang hilang adalah 2."
      },
      {
        "input": "nums = [0, 1]",
        "output": "2",
        "explanation": "Rentang 0..2, yang hilang adalah 2."
      },
      {
        "input": "nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]",
        "output": "8",
        "explanation": "Rentang 0..9, yang hilang adalah 8."
      }
    ],
    "constraints": [
      "Angka-angka di array berbeda satu sama lain.",
      "Tepat satu angka hilang."
    ],
    "functionName": "missingNumber",
    "jsSignature": "function missingNumber(nums) {",
    "tests": [
      {
        "args": [
          [
            3,
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            9,
            6,
            4,
            2,
            3,
            5,
            7,
            0,
            1
          ]
        ],
        "expected": 8
      },
      {
        "args": [
          [
            0
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Kalau tidak ada yang hilang, jumlah semua angka 0..n sudah bisa dihitung dengan rumus. Selisih jumlah itu dengan jumlah array adalah jawabannya.",
      "Rumus jumlah 0..n adalah n*(n+1)/2, dengan n = panjang array.",
      "Pseudocode: n = nums.length; total = n*(n+1)/2; kembalikan total - jumlah(nums). Alternatif: XOR semua angka 0..n dengan semua elemen array."
    ],
    "solutions": {
      "javascript": "function missingNumber(nums) {\n  const n = nums.length;\n  const total = (n * (n + 1)) / 2;\n  const sum = nums.reduce((a, b) => a + b, 0);\n  return total - sum;\n}",
      "python": "def missing_number(nums):\n    n = len(nums)\n    total = n * (n + 1) // 2\n    return total - sum(nums)",
      "java": "public int missingNumber(int[] nums) {\n    int n = nums.length;\n    int total = n * (n + 1) / 2;\n    int sum = 0;\n    for (int x : nums) sum += x;\n    return total - sum;\n}",
      "go": "func missingNumber(nums []int) int {\n    n := len(nums)\n    total := n * (n + 1) / 2\n    sum := 0\n    for _, x := range nums { sum += x }\n    return total - sum\n}",
      "cpp": "int missingNumber(vector<int>& nums) {\n    int n = nums.size();\n    int total = n * (n + 1) / 2;\n    int sum = 0;\n    for (int x : nums) sum += x;\n    return total - sum;\n}"
    },
    "complexity": "Waktu O(n), memori O(1).",
    "edgeCases": [
      "Yang hilang adalah 0.",
      "Yang hilang adalah n (angka terbesar).",
      "Array dengan satu elemen."
    ],
    "quiz": {
      "question": "Kenapa rumus n*(n+1)/2 bisa dipakai di sini?",
      "options": [
        "Karena angkanya acak",
        "Karena rentang 0..n lengkap tanpa duplikat, jadi jumlah idealnya sudah pasti",
        "Karena array selalu terurut",
        "Karena n selalu genap"
      ],
      "answer": 1,
      "explanation": "Rentang lengkap 0..n jumlahnya tetap; selisih dengan jumlah array yang ada persis angka yang hilang."
    }
  }
];
