/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

import CoreManager from './CoreManager';
import ParsePromise from './ParsePromise';
import Storage from './Storage';

var iidCache = null;
var usedWithNativeSDK = true;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return new Promise((resolve, reject) => {
    ParsePushPlugin.getInstallationId(function (id) {
      resolve(id);
    }, function (e) {
      reject(e);
    });
  });
}

var InstallationController = {
  currentInstallationId() {
    if (typeof iidCache === 'string') {
      return ParsePromise.as(iidCache);
    }
    var path = Storage.generatePath('installationId');
    return Storage.getItemAsync(path).then(iid => {
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

  _clearCache() {
    iidCache = null;
  },

  _setInstallationIdCache(iid) {
    iidCache = iid;
  }
};

module.exports = InstallationController;