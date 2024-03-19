import React, { useState } from 'react';
import './CookiePopup.css'; // Assurez-vous d'importer le fichier CSS correctement
import { useLanguage } from '../languageContext'; // Adjust the import path as necessary
import { db } from '../firebaseconfig'; // Adjust the import path as necessary
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage(); // Use the current language
  const handleButtonClick = async (consent) => {
    setIsVisible(false);

    try {
      // Specify the collection where you want to save the consent
      const docRef = await addDoc(collection(db, "cookieConsents"), {
        consent, // "Accept" or "Refuse"
        timestamp: serverTimestamp() // Sets the server timestamp
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  if (!isVisible) return null;
  const heroTranslations = {
    EN: {
      Refuse:"Refuse",
      Accept: "Accept",
    },
    // Add to src/translations/heroTranslations.js
    FR: {
      Refuse:"Refuser",
      Accept: "Accepter",
    },
  };
  const { Refuse, Accept } = heroTranslations[language]; // Get translations

  return (
    <div className="cookie-popup">
      <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.</p>
        <div className='cookie-btn'>
        <button onClick={() => handleButtonClick('Refuse')} className='cta-btn disabled'>{Refuse}</button>
         <button onClick={() => handleButtonClick('Accept')} className='cta-btn'>{Accept}</button>

        </div>
    </div>
  );
};

export default CookiePopup;
