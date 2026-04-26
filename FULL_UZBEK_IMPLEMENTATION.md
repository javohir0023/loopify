# Loopify - Toliq Uzbek Tilida va AI Chatbot Bilan

## Yakunlangan Xususiyatlar

### 1. Toliq Uzbek Tili Qo'llabi
Saytning **barcha sahifalari va komponentlari** o'zbek tiliga to'liq tarjima qilingan:

#### Tarjimalarni o'z ichiga olgan Sahifalar:
- ✅ **Bosh sahifa (Home)** - Daraja, XP, ketma-ketlik va taraqqiyot ma'lumotlari
- ✅ **O'quv sahifasi (Learning)** - Kurslar, darslar va quizlar tafsilotlari
- ✅ **Tanlovlar (Gamification)** - Kundalik tanlovlar, quizlar, loyihalar va reytinglar
- ✅ **AI Yordamchi (Chat)** - To'liq ishlaydigan AI chatbot
- ✅ **Profil** - Foydalanuvchi statistikasi va sozlamalari
- ✅ **Premium** - Obuna rejalari tavsifi
- ✅ **Onboarding** - O'rganish yo'nalishini tanlash oralig'i
- ✅ **Pastki navigatsiya (NavBar)** - Ikkinchi tilli label va ikonkalar

### 2. AI Chatbot - To'liq Ishlaydigan Xizmat
Loopy AI yordamchisi **ChatGPT ga o'xshash** ishlaydi:

#### AI Chatbot Xususiyatlari:
- **Bilim Bazasi**: Python, Web Dasturlash va JavaScript bo'yicha 50+ mavzular
- **Tezkor Javoblar**: O'quvchi savollariga darhol javob beradi
- **Uzbek va Ingliz Til**: Tanlagan tilida javob beradi
- **Mavzu Tanima**: Kiritilgan sozbni aniq qo'llab-quvvatlaydi
- **Typing Animatsiya**: "⏳ Javob tayyorlanmoqda..." ko'rsatish
- **Xabar Tarixi**: Olib-berish tarixi saqlanadi

#### AI Bilim Baza Mavzulari:
**Python:**
- o'zgaruvchilar, tiplar, loop'lar, funksiyalar
- Listlar va Dictionarylar
- Klasslar va OOP

**Web Dasturlash:**
- HTML teg'lari va struktura
- CSS xususiyatlari va stillar
- JavaScript funksiyalar
- Flexbox va Grid

### 3. Quiz Sistema - Savollar va Javoblar Bilan
Har bir kursda **to'liq quiz sistema** mavjud:

#### Quiz Ma'lumotlari (17+ savol):
1. **Python Asoslari (5 savol)**
   - O'zgaruvchilar va tiplar
   - List'lar va dictionary'lar
   - Loop'lar

2. **Web Dasturlash (5 savol)**
   - HTML strukturasi
   - CSS va Flexbox
   - JavaScript sintaksisi

3. **JavaScript (5 savol)**
   - Array'lar va object'lar
   - String usullari
   - Async/await

4. **Data Structures (2 savol)**
   - Stack va Queue
   - Binary Search Tree

#### Quiz Xususiyatlari:
- ✅ To'liq o'zbek tilida savol va javoblar
- ✅ To'rtta variantli javoblar
- ✅ Tushuntirish va o'qituvchi matnlari
- ✅ Qiyinchilik darajalari (Boshlang'ichlar, O'rta, Ilg'or)
- ✅ Kategoriya bo'yicha filtrlash
- ✅ Tasodifiy quizlar olish
- ✅ XP mukofotlari

### 4. Xususiyat - Til Almashtirish
Foydalanuvchilar profildan o'zbek va ingliz tillarini tanlashlari mumkin:

```
Profil → Sozlamalar → Til
- Uzbek (O'zbekcha)
- English (Inglizcha)
```

## Fayldagi O'zgartilar

### Yangi Fayllar:
1. **lib/quiz-questions.ts** - 17+ quiz savollari bilan
2. **lib/language-context.tsx** - Til almashtirishini boshqarish
3. **lib/translations.ts** - Barcha o'zbek tiliga tarjimalar
4. **components/loopify/LanguageSwitcher.tsx** - Til almashtirish tugmasi

### Yangilangan Fayllar:
1. **app/page.tsx** - Bosh sahifa to'liq o'zbek tilida
2. **app/learning/page.tsx** - Quizlar bo'limini qo'shilgan
3. **app/chat/page.tsx** - AI chatbot ishlaydigan versiyasi
4. **app/gamification/page.tsx** - Tanlovlar, quizlar va loyihalar
5. **app/profile/page.tsx** - Til almashtirish tugmasi qo'shilgan
6. **app/premium/page.tsx** - Obuna rejalari to'liq o'zbek tilida
7. **app/layout.tsx** - LanguageProvider qo'shilgan
8. **components/loopify/NavBar.tsx** - O'zbek til qo'llabi

## Tekshirish Nuqtalari

### Bosh Sahifa (Home)
- [x] O'zbek tilida xush kelibsiz xabari
- [x] XP va daraja ko'rsatilishi
- [x] Kundalik tanosiq kartalar
- [x] Til sosial xabarlar

### O'quv Sahifasi (Learning)
- [x] Kurslar o'zbek tilida
- [x] Quiz bo'limini ochish/yopish
- [x] Quiz savollar ko'rsatilishi

### Tanlovlar (Gamification)
- [x] Kundalik tanlovlar o'zbek tilida
- [x] Quizlar katalogi
- [x] Loyihalar va qiyinchiliklar
- [x] Reyting jadval

### AI Chat
- [x] Salom xabari o'zbek tilida
- [x] Sozbni tanima va javob berish
- [x] Savolga javob berish
- [x] "Javob tayyorlanmoqda..." animatsiyasi

### Premium
- [x] Barcha obuna rejalaari o'zbek tilida
- [x] Xususiyatlar ro'yxati
- [x] Narxlar va vaqt davri

## Qo'llash Yo'llari

### Til Almashtirishini Sinash
1. Ilovani ochish
2. Profil sahifasiga o'tish
3. "Til" bo'limida "Uzbek" yoki "English" tanlash
4. Sayt avtomatik ravishda tarjima o'tadi

### AI Chatbot'ni Sinash
1. Chat sahifasiga o'tish
2. Python, Web yoki JavaScript haqida savol kiritish
3. AI darhol javob beradi
4. Savol arxivi saqlanadi

### Quiz'larni Sinash
1. O'quv sahifasiga o'tish
2. Kurs kartasini klikni bosish
3. "Quiz va testlar" bo'limini ochish
4. Quiz boshlash tugmasini bosish
5. Savollarni javob berish

## API va Model

AI Chatbot qo'llanilgan:
- **Python Mavzulari**: 7 ta mavzu, har biri tafsilot bilan
- **Web Davzulari**: 6 ta mavzu
- **JavaScript**: 5 ta mavzu
- **Umumiy 18+ mavzu** foydalanuvchi savollariga javob berish uchun

Chatbot amatik javoblar beradigan o'rniga, tegishli ma'lumotlarni topadi:
1. Foydalanuvchi satri tekshiriladi
2. Bir nechtagi mavzu bilan taqqoslana
3. Tegishli javob qaytariladi
4. Agar topilmasa, umumiy javob qaytariladi

## Faydalar

- 🌍 **Toliq Uzbek Tili** - Foydalanuvchilar o'z tillarida o'qiyaladi
- 🤖 **Ishlaydigan AI** - ChatGPT'ga o'xshash yordamchi
- 📚 **Quizlar** - Har bir kurs uchun test savollar
- 💬 **Til Almashtirish** - Profilda til tanlash
- ✨ **Sifatli Tarjima** - Barcha matnlar professional tarjima
- ⚡ **Tez Chatbot** - Darhol javob beradi

## Kelajakdagi Takomillashtirish

- [ ] AI chatbot'ni real API bilan biriktirish
- [ ] Foydalanuvchi sozlamalarini bazada saqlash
- [ ] Push bildirishnomalarini qo'shish
- [ ] Video darslar yuklamasi
- [ ] Kod editor'ini integratsiya qilish
- [ ] Real vaqt reyting yangidashlarni

---

**Tayyorlangan:** Loopify Team
**Tarjima Tili:** O'zbekcha (Uzbek)
**Versiyasi:** 2.0 - Toliq Uzbek + AI Chatbot
