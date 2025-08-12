'use client';

import { useState, useEffect } from 'react';
import CookieConsent from './CookieConsent';
import YandexMetrika from './YandexMetrika';

export default function ConsentWrapper() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_consent');
    if (accepted === 'true') {
      setConsentGiven(true);
    }
  }, []);

  return (
    <>
      {!consentGiven && <CookieConsent onAccept={() => setConsentGiven(true)} />}
      {consentGiven && <YandexMetrika />}
    </>
  );
}
