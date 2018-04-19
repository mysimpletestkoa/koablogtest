'use strict';

const  koa = require('koa');
const  favicon = require('koa-favicon');
const  logger = require('koa-logger');
const  KoaBody = require('koa-body');
const  cors = require('koa-cors');
const  corsError = require('koa-cors-error');
const  koaOptions = {
  origin:  true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST']
};

const  router = require('koa-router')();
const  ObjectID = require('mongoose').Types.ObjectId;
// Set up monk (mongodb connect)
const  monk = require('monk');

const  db = monk('localhost/koaBlog');
const  parse = require('co-body');
const config = require("./config/config");
// Wrap monk in generator goodness
const  postsbd = db.get('posts');
const  commentsbd = db.get('comments');

// posts class definition
const  posts = {
  //---------------------API------------------------------
  // show post by id form request
  show: async (ctx) => {
    let id = new ObjectID(ctx.params.id);
    var post = await postsbd.findOne({_id: id});
    if (!post) this.throw(404, 'неправильный идентификатор');
    ctx.body = post;
  },
  // create post to database
  create: async (ctx, next) => {
    var post = await parse(ctx);
    console.log('create', post);
    post.created_at = new Date;
    ctx.status = 201;
    ctx.body = await postsbd.insert(post);
  },
  // update post in database
  update: async (ctx) => {
    let id = new ObjectID(ctx.params.id);
    var post = await parse(ctx);
    console.log('update', post);
    ctx.status = 201;
    ctx.body = await postsbd.update(id, post);
  },
  // show all posts
  list: async (ctx, next) => {
    var postList = await postsbd.find({});
    ctx.body = postList;
  },
  //
  edit: async (ctx) => {
    let id = new ObjectID(ctx.params.id);
    var post = await postsbd.findOne({_id: id});
    ctx.body = post;
  }
};
// comments class definition
const  comments = {
  //--------------------------------------------------------------
  // create comment to database
  create: async (ctx, next) => {

    var comment = await parse(ctx);
    comment.post = new ObjectID(comment.post);
    console.log('create', comment);
    comment.created_at = new Date;
    ctx.status = 201;
    ctx.body = await commentsbd.insert(comment);
  },
  // update comment in database
  update: async (ctx) => {
    let id = new ObjectID(ctx.params.id);
    var comment = await parse(ctx);
    console.log('update', comment);
    ctx.status = 201;
    ctx.body = await commentsbd.update(id, comment);
  },
  // show all comments of post id
  list: async (ctx, next) => {
    let post_id = new ObjectID(ctx.params.post_id);
    var commentList = await commentsbd.find({post: post_id});
    ctx.body = commentList;
  },
  //
  edit: async (ctx) => {
    let id = new ObjectID(ctx.params.id);
    var comment = await commentsbd.findOne({_id: id});
    ctx.body = comment;
  }
};
// application
const  app = new koa();
// middleware
app.use(logger());
// gzip compress open by default
const compress = require("koa-compress");
app.use(compress());
// static files
const serve = require("koa-static");
const staticFilePath = config.path.static;
app.use(serve(staticFilePath));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.on('error', err => {
  log.error('server error', err)
});
// API
router.get( '/', posts.list);
router.get( '/api/posts/:id/edit', posts.edit);
router.get( '/api/posts/:id', posts.show);
router.post('/api/posts', posts.create);
router.put( '/api/posts/:id', posts.update);
router.get( '/api/posts', posts.list);
router.get( '/api/comments/:post_id', comments.list);
router.post('/api/comments', comments.create);
// router.post('/comment', comments.create);
// init router
app.use(cors(koaOptions));
app.use(router.routes());
app.use(router.allowedMethods());
// listen
app.listen(3000);
console.log('listening on port 3000');