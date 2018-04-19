import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Post } from '../_models/index';

@Injectable()
export class PostService {
    constructor(private http: Http) { }
    getAll() { return this.http.get('/posts/').map((response: Response) => response.json()) }
    getById(_id: string) { return this.http.get('/posts/' + _id + '/edit').map((response: Response) => response.json()) }
    create(_new: Post) { return this.http.post('/posts', _new) }
    update(_new: Post) { return this.http.put('/posts/' + _new._id, _new) }
    delete(_id: string) { return this.http.delete('/posts/' + _id) }
}