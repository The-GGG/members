const Azure = require('azure-storage');
const Promise = require('bluebird');

const TableQuery = Azure.TableQuery;

const MEMBERS_ENTITY = "members";
const MEMBERS_PARTITION_KEY = "fb_scale_partition";

module.exports = class Members {
  constructor(connectionString) {
    this.table = promisify(
      Azure.createTableService(connectionString));
  }

  getMembers() {
    const getAllQuery = new TableQuery().select();

    return this.table
      .queryEntitiesAsync(MEMBERS_ENTITY, getAllQuery, null)
      .then(result => {
        return result.response.body.value;
      });
  }

  updateMember(member) {
    return this.table.replaceEntityAsync(MEMBERS_ENTITY, member, null);
  }
}

// :'(  y msft? y? y so sux?
const promisify = (obj) => {
  return Promise.promisifyAll(obj, {
    promisifier: (func) => function (...args) {
      return new Promise((resolve, reject) => {
        try {
          func.call(this, ...args, (err, result, response) => {
            err && reject(err);
            resolve({result, response});
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  });
};