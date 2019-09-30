import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PostService } from '../../services/post.service';
import { PostParameters } from '../../models/post-parameters';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';
import { Post } from '../../models/post';



@Component({
  selector: 'app-pos-produce-process',
  templateUrl: './pos-produce-process.component.html',
  styleUrls: ['./pos-produce-process.component.scss']
})
export class PosProduceProcessComponent implements OnInit {

  weightMetalForm: FormGroup;
  pageMeta: PageMeta;
  postParameter = new PostParameters({ orderBy: 'id desc', pageSize: 10, pageIndex: 0 });
  displayedColumns: string[] = ['id', 'title', 'author', 'lastModified'];
  step3DisplayedColumns: string[] = ['id', 'title', 'field1', 'author', 'field2', 'lastModified', 'field3'];
  step4DisplayedColumns: string[] = ['id', 'title', 'author', 'f1', 'f2', 'f3', 'f4', 'lastModified'];
  dataSource: Post[];

  constructor(private postService: PostService) {
    this.weightMetalForm = new FormGroup({
      carNo: new FormControl('', Validators.required),
      fullWeight: new FormControl('', Validators.required),
      scaleNo: new FormControl(1),
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.postService.getPagedPosts(this.postParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<Post>;
      this.dataSource = pagedResult.value;
    });
  }

}
