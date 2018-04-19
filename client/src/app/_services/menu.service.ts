import { Injectable } from '@angular/core';
import { Menu } from '../_models/index';

@Injectable()
export class MenuService {
    private menu: Array<{}>;
    private navbar: Array<{}>;
    constructor() { }

    getAll() { return this.menu }

    administrator() {
        this.menu = [
        { href: "/postdetail/new", title: "Добавить статью", active: "" }];
        return this.navbar = this.getAll();
    }

    moderator() {
        this.menu = [
        { href: "/posts", title: "Статьи", active: "" }];
        return this.navbar = this.getAll();
    }

    user() {
        this.menu = [
        { href: "/posts", title: "Главная", active: "" },
        { href: "/postdetail/new", title: "Добавить статью", active: "" }];
        return this.navbar = this.getAll();
    }
}