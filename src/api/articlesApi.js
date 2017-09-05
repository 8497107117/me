'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { readFile, readFileSync } = require('fs');
const { resolve } = require('path');
const { database } = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const Articles = require('../models/articles.js');
const router = express.Router();
mongoose.Promise = Promise;

const readArticlePreviews = articles => new Promise(res => {
  const articleNum = articles.length;
  let count = articleNum;
  let ret = [...articles];
  for (let i = 0; i < articleNum; i++) {
    const { year, month, day, title } = articles[i];
    readFile(resolve(__dirname, `../../blog/articles/${year}-${month}-${day}-${title}.md`), 'utf-8', (err, content) => {
      if (err) throw err;
      ret[i] = Object.assign({}, ret[i].toObject(), { preview: content.slice(0, content.indexOf('<a id="more"></a>')) });
      count--;
      if (count <= 0) res(ret);
    });
  }
});

router.route('/page/:page')
  .get(asyncMiddleware(async (req, res, next) => {
    const page = parseInt(req.params.page, 10);
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const totalArticles = await Articles.count();
      const totalPage = Math.ceil(totalArticles / 10);
      let articles = await Articles.find().skip((page - 1) * 10).limit(10)
        .populate('tags', 'tagName').exec();
      articles = await readArticlePreviews(articles);
      res.status(200).json({ articles, totalPage });
    }
    catch (err) {
      res.status(404).json({ err: '取得文章列表錯誤' });
      throw err;
    }
  }));

router.route('/article')
  .get(asyncMiddleware(async (req, res, next) => {
    const { year, month, day, url } = req.query;
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const article = await Articles.findOne({ year, month, day, url })
        .populate('tags', 'tagName').exec();
      if (article) {
        const { title, tags } = article;
        const content = await readFileSync(resolve(__dirname, `../../blog/articles/${year}-${month}-${day}-${title}.md`),
          'utf-8');
        res.status(200).json({ title, tags, content });
      }
      else res.status(404).json({ err: '文章不存在' });
    }
    catch (err) {
      res.status(404).json({ err: '文章不存在' });
      throw err;
    }
  }));

module.exports = router;