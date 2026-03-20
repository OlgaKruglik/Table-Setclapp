import en from "./eng.json";
import ru from "./ru.json";
import { useEffect, useState } from "react";

type Lang = "en" | "ru";

const translations = { en, ru };

let currentLang: Lang = (localStorage.getItem("lang") as Lang) || "ru";

export const setLang = (lang: Lang) => {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  window.dispatchEvent(new CustomEvent("langChange", { detail: lang }));
};

export const getLang = () => currentLang;

export const useTranslation = () => {
  const [lang, setLangState] = useState<Lang>(currentLang);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setLangState(event.detail);
    };
    window.addEventListener("langChange", handler as EventListener);
    return () => {
      window.removeEventListener("langChange", handler as EventListener);
    };
  }, []);

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let result: any = translations[lang];
    for (const key of keys) {
      result = result?.[key];
    }
    return result || path;
  };

  return { t, lang, changeLang };
};
