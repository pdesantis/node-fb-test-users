var FBTestUsers = require('../');
var assert = require('assert');
var mocha  = require('mocha');
var sinon  = require('sinon');
var should = require('should');

var creds  = require('./creds');
var appID  = creds.appID;
var secret = creds.secret;
var fbTestUsers;

describe('FBTestUsers', function(){

  describe('#Constructor', function(){
    it('Should throw when no args are passed', function(){
      var failingConstructor = function(){
        return new FBTestUsers();
      };
      failingConstructor.should.throw();
    });

    it('Should throw when no appID is specified', function(){
      var failingConstructor = function(){
        return new FBTestUsers({secret: 'test'});
      };
      failingConstructor.should.throw();
    });

    it('Should throw when no secret is specified', function(){
      var failingConstructor = function(){
        return new FBTestUsers({appID: 'test'});
      };
      failingConstructor.should.throw();
    });

    it('Should set appID', function(){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      fbTestUsers.appID.should.equal(appID);
    });

    it('Should set secret', function(){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      fbTestUsers.secret.should.equal(secret);
    });
  });

  describe('#getAccessToken', function(){
    it('Should fetch access token if it is not cached', function(done){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      sinon.spy(fbTestUsers, 'fetchAccessToken');

      should.not.exist(fbTestUsers.access_token);
      fbTestUsers.getAccessToken(function(error, access_token){
        if(error) return done(error);
        fbTestUsers.fetchAccessToken.callCount.should.equal(1);
        should.exist(access_token);
        fbTestUsers.access_token.should.equal(access_token);
        done();
      });
    });

    it('Should use cached access token on subsequent calls', function(done){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      sinon.spy(fbTestUsers, 'fetchAccessToken');
      sinon.spy(fbTestUsers, 'getAccessToken');

      should.not.exist(fbTestUsers.access_token);
      fbTestUsers.getAccessToken(function(err, token){
        if(err) return done(err);
        fbTestUsers.getAccessToken(function(error, access_token){
          if(error) return done(error);
          fbTestUsers.fetchAccessToken.callCount.should.equal(1);
          fbTestUsers.getAccessToken.callCount.should.equal(2);
          should.exist(access_token);
          fbTestUsers.access_token.should.equal(access_token);
          done();
        });
      });
    });
  });

  describe('#fetchAccessToken', function(){
    it('Should parse out "access_token=" string', function(done){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      fbTestUsers.fetchAccessToken(function(error, access_token){
        if(error) return done(error);
        access_token.should.not.match(/^access_token=.*/);
        done();
      });
    });
  });

  describe('#list', function(){
    before(function(){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
    });

    it('Should get the app access_token', function(done){
      sinon.spy(fbTestUsers, 'getAccessToken');
      fbTestUsers.list(function(error, users){
        if(error) return done(error);
        fbTestUsers.getAccessToken.callCount.should.equal(1);
        fbTestUsers.getAccessToken.restore();
        done();
      });
    });

    it('Should callback with an array', function(done){
      fbTestUsers.list(function(error, users){
        if(error) return done(error);
        users.should.be.an.instanceof(Array);
        done();
      });
    });    
  });

  describe("#create", function(){
    before(function(){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
    });

    it('Should get the app access_token', function(done){
      sinon.spy(fbTestUsers, 'getAccessToken');
      fbTestUsers.create({}, function(error, users){
        if(error) return done(error);
        fbTestUsers.getAccessToken.callCount.should.equal(1);
        fbTestUsers.getAccessToken.restore();
        done();
      });
    });

    it('Should callback with a user object', function(done){
      fbTestUsers.create({}, function(error, users){
        if(error) return done(error);
        users.should.be.an.instanceof(Object);
        done();
      });
    });
  });

  describe("#update", function(){
    var user;

    before(function(done){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      fbTestUsers.list(function(error, users){
        user = users[0];
        done();
      });
    });

    it('Should get the app access_token', function(done){
      sinon.spy(fbTestUsers, 'getAccessToken');
      fbTestUsers.update(user.id, {name: 'Tester McTesterson'}, function(error, users){
        if(error) return done(error);
        fbTestUsers.getAccessToken.callCount.should.equal(1);
        fbTestUsers.getAccessToken.restore();
        done();
      });
    });

    it('Should callback with success = true', function(done){
      fbTestUsers.update(user.id, {name: 'Testy McCool'}, function(error, success){
        if(error) return done(error);
        success.should.be.true;
        done();
      });
    });
  });

  describe('#delete', function(){
    var allUsers = [];

    before(function(done){
      fbTestUsers = new FBTestUsers({appID: appID, secret: secret});
      fbTestUsers.list(function(error, users){
        allUsers.push(users[0], users[1]);
        done();
      });
    });

    it('Should get the app access_token', function(done){
      var user = allUsers.pop();
      sinon.spy(fbTestUsers, 'getAccessToken');
      fbTestUsers.delete(user.id, function(error, users){
        if(error) return done(error);
        fbTestUsers.getAccessToken.callCount.should.equal(1);
        fbTestUsers.getAccessToken.restore();
        done();
      });
    });

    it('Should callback with success = true', function(done){
      var user = allUsers.pop();
      fbTestUsers.delete(user.id, function(error, success){
        if(error) return done(error);
        success.should.be.true;
        done();
      });
    });
  });

});