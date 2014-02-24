var async   = require('async');
var request = require('request');

var FBTestUsers = function(args) {
  if (!args){
    throw new Error('args must be specified');
  };

  if(!args.hasOwnProperty('appID')){
    throw new Error('Facebook App ID argument must be specified');
  }

  if(!args.hasOwnProperty('secret')){
    throw new Error('Facebook App Secret argument must be specified');
  }

  this.appID = args.appID;
  this.secret = args.secret;
  this.access_token = args.access_token;

  return this;
};

FBTestUsers.prototype.getAccessToken = function(callback){
  if(this.access_token){
    callback(null, this.access_token);
  } else {
    this.fetchAccessToken(callback);
  }
};

FBTestUsers.prototype.fetchAccessToken = function(callback){
  var that = this;
  var url = 'https://graph.facebook.com/oauth/access_token';
  var qs = {
    client_id: this.appID,
    client_secret: this.secret,
    grant_type: 'client_credentials'
  };
  request.get({url: url, qs: qs, json: true}, function(error, response, body){
    that.access_token = body.replace('access_token=','')
    callback(error, that.access_token);
  });
};

FBTestUsers.prototype.list = function(callback){
  var that = this;
  this.getAccessToken(function(error, access_token){
    var url = 'https://graph.facebook.com/' + that.appID + '/accounts/test-users';
    var qs = {
      access_token: access_token
    };
    request.get({url: url, qs: qs, json: true}, function(error, response, body){
      callback(error, body.data);
    });
  });
};

FBTestUsers.prototype.create = function(args, callback){
  var that = this;
  args = args || {};
  args.installed = (args.installed !== null) ? args.installed : true;
  args.limit = args.limit || 1;
  args.permissions = args.permissions || 'read_stream';

  this.getAccessToken(function(error, access_token){
    var url = 'https://graph.facebook.com/' + that.appID + '/accounts/test-users';
    var qs = {
      access_token: access_token,
      installed: args.installed,
      locale: 'en_US',
      permissions: args.permissions,
      method: 'post'
    };
    async.times(args.limit, function(n, next){
      request.post({url: url, qs: qs, json: true}, function(error, response, body){
        next(null, body);
      });
    }, function(err, users){
      if(args.limit === 1){
        users = users[0];
      }
      callback(err, users);
    });
  });
};

FBTestUsers.prototype.update = function(userID, args, callback){
  this.getAccessToken(function(error, access_token){
    var url = 'https://graph.facebook.com/' + userID;
    var qs = {
      method: 'post',
      access_token: access_token,
      password: args.password,
      name: args.name
    };
    request.post({url: url, qs: qs, json: true}, function(error, response, body){
      callback(error, body);
    });
  });
};

FBTestUsers.prototype.delete = function(userID, callback){
  this.getAccessToken(function(error, access_token){
    var url = 'https://graph.facebook.com/' + userID;
    var qs = {
      method: 'delete',
      access_token: access_token
    };
    request.post({url: url, qs: qs, json: true}, function(error, response, body){
      callback(error, body);
    });
  });
};

module.exports = FBTestUsers;
