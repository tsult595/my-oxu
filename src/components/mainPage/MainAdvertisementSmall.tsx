import React from 'react'
import { useTranslations} from 'next-intl';

const MainAdvertisementSmall = () => {
  const t = useTranslations('advertisement');
  return (
    <div className="bg-gray-200 mt-4 h-100 w-1/3">
      <h3>{t('title')}</h3>
      <p>{t('description')}</p>
    </div>
  )
}

export default MainAdvertisementSmall
