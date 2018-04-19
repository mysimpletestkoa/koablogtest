import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Comment } from '../_models/index';

@Injectable()
export class CommentService {
    constructor(private http: Http) {}
    getAll(post_id: string) { return this.http.get('/comments/' + post_id).map((response: Response) => response.json()) }
    getById(_id: string) { return this.http.get('/comments/' + _id + '/edit').map((response: Response) => response.json()) }
    create(_new: Comment) { return this.http.post('/comments', _new) }
    update(_new: Comment) { return this.http.put('/comments/' + _new._id, _new) }
    delete(_id: string) { return this.http.delete('/comments/' + _id) }
}