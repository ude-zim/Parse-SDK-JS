'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _CoreManager = require('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = require('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = require('./Storage');

var _Storage3 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var iidCache = null; /**
                      * Copyright (c) 2015-present, Parse, LLC.
                      * All rights reserved.
                      *
                      * This source code is licensed under the BSD-style license found in the
                      * LICENSE file in the root directory of this source tree. An additional grant
                      * of patent rights can be found in the PATENTS file in the same directory.
                      *
                      * 
                      */

var usedWithNativeSDK = true;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return new _promise2.default(function (resolve, reject) {
    ParsePushPlugin.getInstallationId(function (id) {
      resolve(id);
    }, function (e) {
      reject(e);
    });
  });
}

var InstallationController = {
  currentInstallationId: function () {
    if (typeof iidCache === 'string') {
      return _ParsePromise2.default.as(iidCache);
    }
    var path = _Storage3.default.generatePath('installationId');
    return _Storage3.default.getItemAsync(path).then(function (iid) {
      if (!iid) {
        return generateId().then(function (iid) {
          return _Storage2.default.setItemAsync(path, iid).then(function () {
            iidCache = iid;
            return iid;
          });
        });
      }

      iidCache = iid;
      return iid;
    });
  },
  _clearCache: function () {
    iidCache = null;
  },
  _setInstallationIdCache: function (iid) {
    iidCache = iid;
  }
};

module.exports = InstallationController;