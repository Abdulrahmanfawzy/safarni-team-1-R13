
'use client';

import { useState } from 'react';

const languages = [
  { id: 'ar', label: 'العربية', detail: 'Arabic', flag: '🇪🇬' },
  { id: 'en', label: 'English', detail: 'English', flag: '🇬🇧' },
  { id: 'fr', label: 'Français', detail: 'French', flag: '🇫🇷' },
];

export default function AppLanguagePage() {
  const [language, setLanguage] = useState('ar');
  const [saved, setSaved] = useState(false);

  function saveLanguage() {
    localStorage.setItem('safarni-language', language);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-8 text-[#17241e]">
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold text-emerald-700">Settings</p>
        <h1 className="text-xl font-bold">App Language</h1>
        <p className="mb-5 mt-1 text-sm text-gray-500">Choose your preferred language.</p>

        <div className="space-y-2" role="radiogroup" aria-label="App language">
          {languages.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={language === item.id}
              onClick={() => setLanguage(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                language === item.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <span className="text-xl" aria-hidden="true">{item.flag}</span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-gray-500">{item.detail}</span>
              </span>
              <span className={`grid size-5 place-items-center rounded-full border ${language === item.id ? 'border-emerald-600' : 'border-gray-300'}`}>
                {language === item.id && <span className="size-2.5 rounded-full bg-emerald-600" />}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={saveLanguage}
          className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {saved ? 'Saved ✓' : 'Save preference'}
        </button>
      </section>
    </main>
  );
}
