import { ListProps, ResponseProps } from '../store/interface'

// 调用接口缓存图片，解决豆瓣图片无法加载
export const getImages = (url:string|any):string => {

   if (typeof url !== 'string') {
      return ''
   }
   let _u = url.substring(7);
   return 'https://images.weserv.nl/?url=' + _u;
}

// 根据评分获取星星数目

let iconCls = 'icon-star'
export const getStarCount = (rating:number|any):Array<string> => {
   let ret:Array<string> = [iconCls, iconCls, iconCls, iconCls, iconCls]

   if (typeof rating !== 'number') {
      return ret
   }

   let percent:number = Math.floor(rating) / 2
   let num:number = percent | 0

   for (let i = 0; i < num; i ++) {
      ret[i] = `${iconCls} solid`
   }

   if (num !== percent) {
      ret[num] = `${iconCls}-half`
   }

   return ret
}

export interface MovieProps {
   directors: Array<{name: string}>
   collect_count: number | string
   title: string
   year: string | number
   images: {small: string}
   id: string
   genres: Array<string>
   rating: {average: number}
   casts: Array<{name: string}>
}

// 电影列表的实例对象
export class Movie {
   directors: string               // 导演
   image: string                   // 电影图片
   collect_count: number | string  // 评论数
   title: string                   // 电影标题
   year: string | number           // 上映年代
   id: string                      // 电影Id
   genres: string                  // 类型
   rating: number                  // 评分
   stars: Array<string>            // 星星数目
   actors: string                  // 演员
   constructor({ directors, collect_count, title, year, images, id, genres, rating, casts }:MovieProps) {
      this.directors = directors.map(item => item.name).join('/')
      this.image = getImages(images.small)
      this.collect_count = collect_count
      this.title = title
      this.year = year
      this.id = id
      this.genres = genres.join('/')
      this.rating = rating.average
      this.stars = getStarCount(rating.average)
      this.actors = casts.map(item => item.name).join('/')
   }
}

const TIMESTAMP = 7200000 // 缓存时长2小时（毫秒单位）
export const updateMovieList = (oldData:ListProps, newData:ResponseProps, refresh:boolean = false):ListProps => {

   const newMovies = newData.subjects.map(item => new Movie(item))

   const invalidateTime = new Date().getTime() + TIMESTAMP,
      items = refresh ? newMovies : oldData.items.concat(newMovies),
      hasMore = items.length < newData.total,
      start = refresh ? (0 + newMovies.length) : (oldData.start + newData.subjects.length),
      method = oldData.method,
      count = oldData.count

   return { items, hasMore, invalidateTime, start, method, count }
}