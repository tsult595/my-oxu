import Image from "next/image";
import MainImg from '../../assets/header.webp'

const AdvertisementUpper = () => {
  return (
    <div className="w-[70%] m-auto h-35 relative">
      <Image src={MainImg}
       fill // Заставляет картинку занять всё пространство родительского div
        className="object-cover" // Аналог background-size: cover (картинка заполнит блок без деформации)
        priority //
       alt="Advertisement" />
    </div>
  )
}

export default AdvertisementUpper