import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';

@Pipe({
  name: 'searchPosts'
})
export class SearchPostsPipe implements PipeTransform {

  transform(posts: Post[], search: string): Post[] {
    return posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

}
