/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:41:15
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 01:24:52
 */

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var questionSchema = new mongoose.Schema({
	CategoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category"
	},
	UserQuestion: {
		type: String,
		require: true
	},
	Title: {
		type: String,
		require: true
	},
	Content: {
		type: String,
		require: true
	},
	References: {
		type: Array,
		default: []
	},
	CreateDate: {
		type: Date,
		require: true
	},
	ViewTime: {
		type: Number,
		require: true
	}
});
questionSchema.index({
	Title: 'text',
	Content: 'text'
});
var Question = mongoose.model('questions', questionSchema);

var countQuestion = function(option, callback) {
	Question.count(option, callback);
};
var getQuestionPaginate = function(limitItemOnePage, currentPage, callback) {
	var numberOfSkipItem = limitItemOnePage * (currentPage - 1);
	Question.find().limit(limitItemOnePage).skip(numberOfSkipItem).sort({
		'CreateDate': 'descending'
	}).exec(callback);
};

var getHotTopic = function(callback) {
	Question.find().limit(10).sort({
		'ViewTime': 'descending'
	}).exec(callback);
};
var getQuestionDetail = function(id, callback) {
	Question.findById(id).populate('QuestionId').exec(callback);
};
//api for mobile
var questionMobileIndex = function(callback) {
	Question.find({}).sort({
		'CreateDate': -1
	}).exec(callback);
};
var getQuestion = function(limitItem, callback) {
	Question.find().limit(limitItem).sort({
		'CreateDate': 'descending'
	}).exec(callback);
};
var getQuestionViaCategory = function(id, limitItem, callback) {
	Question.find({
		"CategoryId": ObjectId(id)
	}).limit(limitItem).exec(callback);
};

var submitQuestion = function(question, callback) {
	Question.collection.insert(question, callback);
};
var findQuestion = function(findString, callback) {
	Question.find({
		$text: {
			$search: findString
		}
	}).sort({
		'CreateDate': 'descending'
	}).exec(callback);
};

var countTotalQuestionViaCategory = function(categoryId, callback) {
	Question.find({
		CategoryId: ObjectId(categoryId)
	}).count(callback);
};
var updateViewTime = function(questionId, callback) {
	Question.update({ _id: ObjectId(questionId) }, { $inc: { ViewTime: +1 } }, callback);
};
var getAllContrib = function(currentUser, callback) {
	Question.find({
		UserQuestion: currentUser
	}).exec(callback);
};
var getAllQuestion = function(callback) {
	Question.find({}).exec(callback);
};
var getUnAnswerQuestion = function(idArray, callback) {
	Question.find({ _id: { $nin: idArray } }, callback);
};

module.exports = {
	Question: Question,
	countQuestion: countQuestion,
	getQuestionPaginate: getQuestionPaginate,
	getQuestionDetail: getQuestionDetail,
	questionMobileIndex: questionMobileIndex,
	getQuestion: getQuestion,
	getQuestionViaCategory: getQuestionViaCategory,
	submitQuestion: submitQuestion,
	findQuestion: findQuestion,
	countTotalQuestionViaCategory: countTotalQuestionViaCategory,
	getAllContrib: getAllContrib,
	getHotTopic: getHotTopic,
	updateViewTime: updateViewTime,
	getAllQuestion: getAllQuestion,
	getUnAnswerQuestion: getUnAnswerQuestion
};
