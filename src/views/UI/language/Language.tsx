import { useContext } from "react";
import UserContext from "context/user/UserContext";
import { useTranslation } from "react-i18next";
import './language.scss'

const lngs = [
  { code: "en", native: "🇬🇧" },
  { code: "es", native: "🇪🇸" },
];

const Language = () => {
  const { i18n } = useTranslation();
  const { dbUser, updateUser } = useContext(UserContext)

  const handleTrans = (code: string) => {
    const userData = {
      name: dbUser.name,
      lastname: dbUser.lastname,
      language: code
    }
    updateUser(userData)
    i18n.changeLanguage(code);
    document.documentElement.setAttribute("lang", code);
  };

  return (
    <div className="language">
      {lngs.map((lng, i) => {
        const { code, native } = lng;
        return <div className={dbUser.language === code ? 'active' : ''} key={i} onClick={() => handleTrans(code)}>{native}</div>;
      })}
    </div>
  )
}

export default Language;