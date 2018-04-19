import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';

import { appConfig } from '../app.config';
import { Post, Comment } from '../_models/index';
import { AlertService, PostService, CommentService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'post-detail.component.html',
    styleUrls: ['post-detail.component.css']
})

export class PostDetailComponent implements OnInit {
    private document: Post = new Post;
    private newDocument = false;
    private loading = false;
    private readOnly = "readonly";
    private created_at: string;
    private comment: Comment = new Comment;
    private comments: Comment[] = [];
    private comment_text: any;
    private comment_owner: any;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private commentService: CommentService,
        private alertService: AlertService ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.openDocument(params);
        });
    }
    // подготовим документ к открытию
    openDocument(params: Params) {
        this.readOnly = "";
        let id = params['id'];
        if (id === 'new') {
            this.newDocument = true;
            this.document = new Post;
            this.created_at = (new Date()).toISOString().substring(0, 10);
        } else {
            this.newDocument = false;
            this.postService.getById(id)
            .subscribe(document => {
                // console.log(document);
                this.document = document;
                this.created_at = document.created_at.substring(0, 10);
                this.commentService.getAll(id)
                .subscribe(comments => {
                    // console.log(document);
                    this.comments = comments;
                    // this.created_at = document.created_at.substring(0, 10);
                });
            });
        }
    }
    // сохранение документа
    save() {
        // convert string to date type
        this.document.created_at = new Date(this.created_at);
        console.log(this.document);
        if( this.newDocument ) {
            this.postService.create(this.document)
            .subscribe(
                data => { window.history.back() },
                error => { this.alertService.error(error) });
        } else {
            this.postService.update(this.document)
            .subscribe(
                data => { window.history.back() },
                error => { this.alertService.error(error) });
        }
    }

    addComment() {
        this.comment.post = this.document._id;
        this.comment.owner = this.comment_owner;
        this.comment.body = this.comment_text;
        if(this.comment.owner === undefined) { this.comment.owner = 'anonymus' };

        console.log(this.comment);

        this.commentService.create(this.comment)
        .subscribe(
            data => {
                this.commentService.getAll(this.document._id)
                .subscribe(comments => {
                    this.comments = comments;
                });
            },
            error => { this.alertService.error(error) });
    }

    goBack() {
        window.history.back();
    }
}