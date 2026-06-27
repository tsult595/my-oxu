import React from 'react'
import { useTranslations} from 'next-intl';

const MainAdvertisement = () => {
   const t = useTranslations('advertisement');
  return (
      <div className="flex-1 w-10 h-100 bg-amber-200 m-4 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <p className="text-gray-600">{t('description')}</p>
    </div>
  )
}

export default MainAdvertisement