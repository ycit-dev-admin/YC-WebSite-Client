import { Component, OnInit } from '@angular/core';
import { PostParameters } from '../../models/post-parameters';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { PageMeta } from '../../../shared/models/page-meta';
import { ResultWithLinks } from '../../../shared/models/result-with-links';
import { OpenIdConnectService } from 'src/app/shared/oidc/open-id-connect.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Post[];
  pageMeta: PageMeta;
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 5, pageIndex: 0 });


  constructor(private postService: PostService,
    private openIdConnectService: OpenIdConnectService) { }

  ngOnInit() {
    this.posts = [];
    this.getPosts();
  }

  getPosts() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const result = { ...resp.body } as ResultWithLinks<Post>;
      //this.posts = result.value;
      this.posts = this.posts.concat(result.value);  //配合無限滾動功能，要往列表加值
    });
  }

  onScroll() {
    console.log('scrolled down!!');
    this.postParameter.pageIndex++;
    if (this.postParameter.pageIndex < this.pageMeta.pageCount) {
      this.getPosts();
    }
  }

}
