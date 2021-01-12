/* eslint-env mocha */

"use strict";

var assert = require("chai").assert;
var createConfiguration = require("../src/create-configuration");

describe("create-configuration", function () {
  var test = function (t) {
    it(t.description, function () {
      t.assertions(createConfiguration(t.params.options));
    });
  };
  test({
    description: "http-only without api",
    params: {
      options: {
        http: "http://somewhere:1234",
        ws: null,
        ipc: null,
        api: { events: null, functions: null },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } }
      }
    },
    assertions: function (configuration) {
      assert.deepEqual(configuration, {
        http: "http://somewhere:1234",
        ws: null,
        ipc: null,
        api: { events: null, functions: null },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } },
        httpAddresses: ["http://somewhere:1234"],
        wsAddresses: [],
        ipcAddresses: []
      });
    }
  });
  test({
    description: "http-only with api",
    params: {
      options: {
        http: "http://127.0.0.1:8545",
        ws: null,
        ipc: null,
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } }
      }
    },
    assertions: function (configuration) {
      assert.deepEqual(configuration, {
        http: "http://127.0.0.1:8545",
        ws: null,
        ipc: null,
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } },
        httpAddresses: ["http://127.0.0.1:8545"],
        wsAddresses: [],
        ipcAddresses: []
      });
    }
  });
  test({
    description: "http and websockets with api",
    params: {
      options: {
        http: "http://127.0.0.1:8545",
        ws: "ws://127.0.0.1:8546",
        ipc: null,
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } }
      }
    },
    assertions: function (configuration) {
      assert.deepEqual(configuration, {
        http: "http://127.0.0.1:8545",
        ws: "ws://127.0.0.1:8546",
        ipc: null,
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } },
        httpAddresses: ["http://127.0.0.1:8545"],
        wsAddresses: ["ws://127.0.0.1:8546"],
        ipcAddresses: []
      });
    }
  });
  test({
    description: "http, websockets, and ipc with api",
    params: {
      options: {
        http: "http://127.0.0.1:8545",
        ws: "ws://127.0.0.1:8546",
        ipc: "/home/jack/.vapory/gvap.ipc",
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } }
      }
    },
    assertions: function (configuration) {
      assert.deepEqual(configuration, {
        http: "http://127.0.0.1:8545",
        ws: "ws://127.0.0.1:8546",
        ipc: "/home/jack/.vapory/gvap.ipc",
        api: {
          events: {
            event1: { contract: "contract1" },
            event2: { contract: "contract1" },
            event3: { contract: "contract2" }
          },
          functions: {
            contract1: { method1: {}, method2: {} },
            contract2: { method1: {} }
          }
        },
        contracts: { 3: { contract1: "0xc1", contract2: "0xc2" } },
        httpAddresses: ["http://127.0.0.1:8545"],
        wsAddresses: ["ws://127.0.0.1:8546"],
        ipcAddresses: ["/home/jack/.vapory/gvap.ipc"]
      });
    }
  });
});
