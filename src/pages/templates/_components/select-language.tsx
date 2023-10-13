import {
  FieldValue,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const idiomas = {
  Africano: "af",
  Albanês: "sq",
  Árabe: "ar",
  Azerbaijano: "az",
  Bengalês: "bn",
  Búlgaro: "bg",
  Catalão: "ca",
  "Chinês (CHN)": "zh_CN",
  "Chinês (HKG)": "zh_HK",
  "Chinês (TAI)": "zh_TW",
  Croata: "hr",
  Tcheco: "cs",
  Dinamarquês: "da",
  Holandês: "nl",
  Inglês: "en",
  "Inglês (Reino Unido)": "en_GB",
  "Inglês (EUA)": "en_US",
  Estoniano: "et",
  Filipino: "fil",
  Finlandês: "fi",
  Francês: "fr",
  Alemão: "de",
  Grego: "el",
  Guzerate: "gu",
  Hauçá: "ha",
  Hebraico: "he",
  Hindi: "hi",
  Húngaro: "hu",
  Indonésio: "id",
  Irlandês: "ga",
  Italiano: "it",
  Japonês: "ja",
  Canarês: "kn",
  Cazaque: "kk",
  Coreano: "ko",
  Laociano: "lo",
  Letão: "lv",
  Lituano: "lt",
  Macedônio: "mk",
  Malaio: "ms",
  Malaiala: "ml",
  Marati: "mr",
  Norueguês: "nb",
  Persa: "fa",
  Polonês: "pl",
  "Português (BR)": "pt_BR",
  "Português (POR)": "pt_PT",
  Punjabi: "pa",
  Romeno: "ro",
  Russo: "ru",
  Sérvio: "sr",
  Eslovaco: "sk",
  Esloveno: "sl",
  Espanhol: "es",
  "Espanhol (ARG)": "es_AR",
  "Espanhol (ESP)": "es_ES",
  "Espanhol (MEX)": "es_MX",
  Suaíli: "sw",
  Sueco: "sv",
  Tâmil: "ta",
  Telugo: "te",
  Tailandês: "th",
  Turco: "tr",
  Ucraniano: "uk",
  Urdu: "ur",
  Uzbeque: "uz",
  Vietnamita: "vi",
  Zulu: "zu",
};

export type SelectLanguages<T extends FieldValues> = {
  defaultValues?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  register: UseFormRegister<T>;
  name: Path<T>;
};

export const SelectLanguage = <T extends FieldValues>({
  defaultValues = `pt_BR`,
  onChange,
  register,
  name,
}: SelectLanguages<T>) => {
  return (
    <select
      {...register(name)}
      className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
      defaultValue={defaultValues}
      onChange={onChange}
    >
      {Object.keys(idiomas).map((idioma) => (
        // @ts-ignore
        <option key={`option-${idioma}`} value={idiomas[idioma]}>
          {idioma}
        </option>
      ))}
    </select>
  );
};
