
import { getNewsById } from '@/api/newsApi'
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

const NewsDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const newsItem = await getNewsById(id) // Запрос прямо на сервере!

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 block font-medium">
          &larr; Назад к ленте
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight">
          {newsItem.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-gray-400 my-4 font-medium">
          <span>{new Date(newsItem.createdAt).toLocaleDateString('ru-RU')}</span>
          <span>Просмотров: {newsItem.view}</span>
        </div>

        <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden my-6 bg-gray-100">
          <Image src={newsItem.img} alt={newsItem.title} fill className="object-cover" priority />
        </div>

        <div className="text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
          {newsItem.description}
        </div>
      </div>
    </main>
  )
}

export default NewsDetailPage