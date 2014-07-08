/*jshint devel: true, jquery: true */
/*global require: true */
Hull.component({
  require: ['side-comments'],
  datasources: {
    currentUser: 'me',
    comments: ':id/comments'
  },
  options: {
    selector: 'p'
  },
  requireCss: ['side-comments', 'themes/default'],
  injectLinkTag: function(path) {
    var e = document.createElement('link');
    e.href = this.options.baseUrl + '/' + path.replace('.css', '') + '.css';
    e.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(e);
  },
  initialize: function () {
    if (!this.options.id) {
      this.options.id = this.defaultId();
    }
    this.SideComments = require('side-comments');
    var _ = this.sandbox.util._;
    _.each(this.requireCss, _.bind(this.injectLinkTag, this));
  },
  beforeRender: function (data) {
    var _ = this.sandbox.util._;
    _.each(this.$el.find(this.options.selector), this.prepareCommentable);
    var user = this.formatCurrentUser(data.currentUser);
    var comments = this.formatHullComments(data.comments);
    this.sider = new this.SideComments(this.$el, user, comments);
    this.sider.on('commentPosted', _.bind(this.postComment, this));
    this.sider.on('commentDeleted', _.bind(this.deleteComment, this));
    this.sandbox.on('hull.auth.login', _.bind(this.setCurrentUser, this));
    this.sandbox.on('hull.auth.logout', _.bind(this.setCurrentUser, this));
  },
  doRender: function () {},
  defaultId: function () {
    return this.sandbox.util.entity.encode(window.location.toString());
  },
  prepareCommentable: function (elt, i) {
    var $elt = $(elt);
    var sectionId = [i.toString(), btoa($elt.text())].join('-');
    $elt.addClass('commentable-section').attr('data-section-id', sectionId);
  },
  formatCurrentUser: function (currentUser) {
    if (!currentUser || !currentUser.id) {
      return null;
    }
    return {
      id: currentUser.id,
      avatarUrl: currentUser.picture,
      name: currentUser.name
    };
  },
  formatHullComments: function (hullComments) {
    var _ = this.sandbox.util._;
    var sortedBySection = _.reduce(hullComments, this.insertHullCommentInSection, {});
    return _.reduce(sortedBySection, _.bind(this.formatSortedComments, this), []);
  },
  insertHullCommentInSection: function (memo, cmt) {
    var section = cmt.extra.sectionId;
    if (section) {
      memo[section] = memo[section] || [];
      memo[section].push(cmt);
    }
    return memo;
  },
  formatSortedComments: function (memo, comments, sectionId) {
    var _ = this.sandbox.util._;
    var descriptor = {
      sectionId: sectionId,
      comments: _.map(comments, this.formatSingleComment)
    };
    memo.push(descriptor);
    return memo;
  },
  formatSingleComment: function (comment) {
    return {
      authorAvatarUrl: comment.user.picture,
      authorName: comment.user.name,
      authorId: comment.user.id,
      comment: comment.description,
      id: comment.id
    };
  },
  postComment: function (comment) {
    var data = {
      description: comment.comment,
      extra: {
        sectionId: comment.sectionId
      }
    };
    var sider = this.sider;
    this.api.post(this.options.id + '/comments', data).then(function (hullComment) {
      comment.id = hullComment.id;
      sider.insertComment(comment);
    });
  },
  deleteComment: function (comment) {
    var sider = this.sider;
    this.api.delete(comment.id).then(function () {
      sider.removeComment(comment.sectionId, comment.id);
    });
  },
  setCurrentUser: function (user) {
    this.sider.setCurrentUser(this.formatCurrentUser(user));
  }
});
