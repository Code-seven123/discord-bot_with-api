import { youtubedl } from '@bochilteam/scraper-sosmed'

export default async (url) => {
  try {
    const data = await youtubedl(url)
    const down = await data.video.auto.download()
    return {
      title: data.title,
      thubnails: data.thumbnail,
      url: down
    }
  } catch (e) {
    console.log(e)
    return null
  } 
} 
