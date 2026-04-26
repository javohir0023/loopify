# Quiz Savollar va AI Yordamchi Ma'lumot Bazasi

## Quiz Tizimi

### Savollar Katalogi (17+ Savol)

#### Python Asoslari (5 Savol)

| # | Savol | Javoblar | To'g'ri Javob | Qiyinchilik |
|---|-------|---------|---------------|------------|
| 1 | O'zgaruvchi e'lon qilish operatori | =, ==, :=, -> | = | Boshlang'ichlar |
| 2 | String tiplama misoli | 123, 'hello', [1,2,3], {key:val} | 'hello' | Boshlang'ichlar |
| 3 | List qavslari | (), {}, [], <> | [] | Boshlang'ichlar |
| 4 | len([1,2,3,4]) natijasi | 3, 4, 5, Error | 4 | Boshlang'ichlar |
| 5 | for loop maqsadi | Shart, Ketma-ketlik, Funk, O'zg | Ketma-ketlik | Boshlang'ichlar |

#### Web Dasturlash (5 Savol)

| # | Savol | Javoblar | To'g'ri Javob | Qiyinchilik |
|---|-------|---------|---------------|------------|
| 6 | HTML tizim teg'i | div, html, body, head | html | Boshlang'ichlar |
| 7 | CSS rang xususiyati | bg-color, text-color, color-style, font-color | background-color | Boshlang'ichlar |
| 8 | JS funksiya e'loni | function(), func(), def(), function: | function() {} | Boshlang'ichlar |
| 9 | Flexbox markazing | align-items, justify-content, flex-dir, gap | justify-content | O'rta |
| 10 | Responsive dizayn | CSS Grid, Media Queries, Flex, Bootstrap | Media Queries | O'rta |

#### JavaScript (5 Savol)

| # | Savol | Javoblar | To'g'ri Javob | Qiyinchilik |
|---|-------|---------|---------------|------------|
| 11 | Array element kiritish | {0}, .0, [0], ->0 | [0] | Boshlang'ichlar |
| 12 | x += 3 qiymati (x=5) | 5, 8, 53, 3 | 8 | Boshlang'ichlar |
| 13 | Object e'loni | {key:val}, [key:val], (key:val), <key:val> | {key:val} | Boshlang'ichlar |
| 14 | String kattalashga o'tkazish | .toUpperCase(), .upper(), .uppercase(), .makeUpper() | .toUpperCase() | Boshlang'ichlar |
| 15 | async/await maqsadi | O'zgaruvchilar, Asinxron, String, Loops | Asinxron | O'rta |

#### Data Structures (2 Savol)

| # | Savol | Javoblar | To'g'ri Javob | Qiyinchilik |
|---|-------|---------|---------------|------------|
| 16 | Stack prinsipi | FIFO, LIFO, Random, Sorted | LIFO | O'rta |
| 17 | Binary Tree eng kichik | Root, O'ng, Chap, Istalgan | Chap | O'rta |

---

## AI Chatbot Bilim Bazasi

### Python Bo'limi

**Mavzular:**
- `o'zgaruvchilar` → "Python-da o'zgaruvchi = operatori bilan e'lon qilinadi..."
- `tiplar` → "Python-ning asosiy tiplari: int, float, str, bool"
- `loop` → "for loop ketma-ketliklar orqali, while loop shart to'g'ri bo'lgunga qadar"
- `funksiya` → "Funksiya def kalit so'zi bilan e'lon qilinadi..."
- `list` → "List [] ichida e'lon qilinadi: my_list = [1, 2, 3]"
- `dict` → "Dictionary {} ichida key:value bilan: person = {'name': 'Ali'}"
- `class` → "Class-lar object-oriented dasturlashning asosidir..."

### Web Dasturlash Bo'limi

**Mavzular:**
- `html` → "HTML teg'lari web sahifaning tuzilishini e'lon qiladi..."
- `css` → "CSS stillarni boshqaradi: color, background-color, font-size"
- `javascript` → "JS-da funksiya: function myFunc() {} yoki () => {}"
- `flex` → "Flexbox: display: flex; justify-content; align-items"
- `grid` → "CSS Grid: display: grid; grid-template-columns"
- `responsive` → "Responsive: @media (max-width: 768px) {} bilan"

### JavaScript Bo'limi

**Mavzular:**
- `o'zgaruvchilar` → "Array indexi: array[0], string[0]"
- `tiplar` → "Types: number, string, boolean, object, array"
- `funksiya` → "Function declaration va arrow functions"
- `async` → "Async/await asinxron operatsiyalar uchun"
- `dom` → "DOM: document.getElementById(), querySelector()"

---

## AI Javobi Generatsiyasi

### Algoritm:

```javascript
1. Foydalanuvchi matnini qabul qiling
2. Kichik harfga o'tkazib, sazbni qidiring
3. Python, Web, JS bo'limlarini tekshiring
4. Agar mavzu topilsa, tegishli javobni qaytaring
5. Agar topilmasa, umumiy javob qaytaring
6. Javobni tez qaytaring (800ms delay)
```

### Javob Misollar:

**Savol:** "Python-da for loop qanday ishlaydi?"
**Javob:** "for loop ketma-ketliklar orqali takrorlanish uchun. while loop shart to'g'ri bo'lgunga qadar takrorlanadi."

**Savol:** "CSS Flexbox nima?"
**Javob:** "Flexbox: display: flex; va justify-content, align-items xususiyatlari bilan ishlaydi."

**Savol:** "Noma'lum savol"
**Javob:** "Bu juda yaxshi savol! Python, Web Dasturlash yoki JavaScript haqida batafsil aytib bering..."

---

## Qo'shilgan Savollar

### Qo'shish Jarayoni:

1. `lib/quiz-questions.ts` faylini oching
2. `QUIZ_QUESTIONS` massiviga yangi savol qo'shing:

```typescript
{
  id: 18,
  question: "Yangi savol o'zbek tilida",
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 0, // To'g'ri javob indeksi
  explanation: "Tushuntirish...",
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  category: 'Python Asoslari' | 'Web Dasturlash' | 'JavaScript' | 'Data Structures',
}
```

### AI Bilim Bazasi Qo'shish:

1. `app/chat/page.tsx` faylini oching
2. `KNOWLEDGE_BASE_UZ` yoki `KNOWLEDGE_BASE_EN` objektiga mavzuni qo'shing:

```typescript
KNOWLEDGE_BASE_UZ.python.topics.push('yangi_mavzu');
KNOWLEDGE_BASE_UZ.python.responses['yangi_mavzu'] = 'Javob matni...';
```

---

## Test Buklari

### Quiz Test Kodi

```javascript
// Random 5ta quiz oling
const quizzes = getRandomQuiz(5);

// Kategoriya bo'yicha quizlar
const pythonQuizzes = getQuizzesByCategory('Python Asoslari');
```

### AI Test Kodi

```javascript
// Python savoli
const response = findBestResponse("for loop nima", 'uz');
// Javob: "for loop ketma-ketliklar orqali takrorlanish uchun..."

// Web savoli
const response = findBestResponse("CSS flexbox", 'uz');
// Javob: "Flexbox: display: flex; va justify-content..."
```

---

## Til Sozlamalari

### Iqtibosli Javoblar

**O'zbek Tilida:**
- "Savol noma'lum" → "Bu juda yaxshi savol! Python, Web Dasturlash yoki JavaScript haqida..."
- Kutish xabari → "⏳ Javob tayyorlanmoqda..."
- Yubor tugmasi → "Yuborish"

**Ingliz Tilida:**
- "Unknown question" → "Great question! Tell me more about Python, Web Development..."
- Loading message → "⏳ Thinking..."
- Send button → "Send"

---

**Oxirgi yangilanish:** 2026-04-26
**Savollar soni:** 17 ta
**AI Mavzulari:** 18+ ta
**Tili:** O'zbekcha va Inglizcha
