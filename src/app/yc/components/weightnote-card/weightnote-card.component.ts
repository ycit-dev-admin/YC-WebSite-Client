import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PostParameters } from '../../models/post-parameters';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';

@Component({
  selector: 'app-weightnote-card',
  templateUrl: './weightnote-card.component.html',
  styleUrls: ['./weightnote-card.component.scss']
})
export class WeightnoteCardComponent implements OnInit {

  @Input() post: Post;
  pageMeta: PageMeta;
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  displayedColumns: string[] = ['id', 'title', 'author', 'lastModified'];
  dataSource: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<Post>;
      this.dataSource = pagedResult.value;      
      /* this.dataSource.values[0] = this.post;
      this.dataSource.values[1] = this.post; */
    });
  }

}
