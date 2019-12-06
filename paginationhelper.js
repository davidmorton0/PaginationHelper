// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage) {
  this.page = [];
  for (n = 0; n < Math.ceil(collection.length / itemsPerPage); n++) {
    this.page[n] = collection.slice(n * itemsPerPage, (n + 1) * itemsPerPage);
  }
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  if (this.page.length == 0) {
    return 0;
  } else {
  return this.page[0].length * (this.page.length - 1) + this.page[this.page.length - 1].length;
  }
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return this.page.length;
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  if (pageIndex < 0 || pageIndex >= this.page.length) {
    return - 1;
  } else {
    return this.page[pageIndex].length;
  }
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if (itemIndex < 0 || itemIndex >= this.itemCount()) {
    return -1;
  } else {
    return Math.floor(itemIndex / this.page[0].length);
  }
}

var assert = require('assert');
var helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
assert.equal(helper.pageCount(), 2)
assert.equal(helper.itemCount(), 6)
assert.equal(helper.pageItemCount(0), 4)
assert.equal(helper.pageItemCount(1), 2)
assert.equal(helper.pageItemCount(2), -1)

// pageIndex takes an item index and returns the page that it belongs on
assert.equal(helper.pageIndex(5), 1)
assert.equal(helper.pageIndex(2), 0)
assert.equal(helper.pageIndex(20), -1)
assert.equal(helper.pageIndex(-10), -1)
