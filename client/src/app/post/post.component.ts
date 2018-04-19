import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from '../app.component';
import { appConfig } from '../app.config';
import { Post } from '../_models/index';
import { PostService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css']
})

export class PostComponent implements OnInit {
    pageHeader: string;
    category: number;
    posts: Post[] = [];
    currentPage: number = 1;
    pageSize: number = 5;
    recordCount: number = 0;
    pages: number = 0;
    filter: string = "";
    searchString: string = "";
    pageStatus: {first: string, prev: string, next: string, last: string } = {
        first: "disabled",
        prev : "disabled",
        next : "disabled",
        last : "disabled"
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService,
        private sessionStorage: SessionStorageService ) {}

    ngOnInit() {
        this.getPage();
        this.sessionStorage.observe('searchString')
        .subscribe((value: any) => {
            console.log('posts:searchString', value);
            this.searchString = value;
            this.getPage();
        })
    }

    getPage() {
        this.postService.getAll()
        .subscribe(posts => {
            console.log(posts);
            this.posts = posts;
            this.recordCount = posts.count;
        });
    }
}
