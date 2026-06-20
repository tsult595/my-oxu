import Image from "next/image";
import Img from '../../assets/free-photo-of-street-in-nyc-at-dusk.jpeg'

const AdvertisementRight = () => {
    return (
      // h-screen задает высоту 100vh (на всю высоту экрана)
      // w-[160px] задает фиксированную ширину баннера (например, 160px для небоскреба)
      <div className="relative h-screen w-40 ">
        <Image 
          src={Img} 
          alt="Advertisement"
          fill // Заставляет картинку занять всё пространство родительского div
          className="object-cover" // Аналог background-size: cover (картинка заполнит блок без деформации)
          priority // Говорит Next.js загрузить этот баннер как можно быстрее
        />
      </div>
    );
}

export default AdvertisementRight