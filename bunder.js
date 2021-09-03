'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LinkList = require('./LinkList');

var _LinkList2 = _interopRequireDefault(_LinkList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //////////////////////
//实现循环单链表


var CirSingList = function (_singleList) {
    _inherits(CirSingList, _singleList);

    //继承单链表的原型创建一个新类
    function CirSingList() {
        _classCallCheck(this, CirSingList);

        return _possibleConstructorReturn(this, (CirSingList.__proto__ || Object.getPrototypeOf(CirSingList)).call(this)); //调用父类的构造函数(constructor)
    }

    _createClass(CirSingList, [{
        key: 'findLast',
        value: function findLast() {
            var currentNode = this.head;
            var count = 0;
            while (count++ !== this.size) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
    }, {
        key: 'insert',
        value: function insert(item, element) {
            if (!this.find(item)) return;
            if (item === 'head') {
                var _newNode = new Node(element);
                if (this.isEmpty) {
                    this.head.next = _newNode;
                    _newNode.next = _newNode;
                    this.size++;
                } else {
                    var lastNode = this.findLast();
                    _newNode.next = this.head.next;
                    this.head.next = _newNode;
                    lastNode.next = _newNode;
                    this.size++;
                }
            } else {
                var currentNode = this.head;
                while (currentNode.next.data !== item) {
                    currentNode = currentNod.next;
                }
                newNode.next = currentNode.next.next;
                currentNode.next = newNode;
                this.size++;
            }
        }
    }, {
        key: 'remove',
        value: function remove(item) {
            if (!this.find(item)) return;
            if (item === 'head') {
                if (!this.isEmpty()) {
                    return;
                } else {
                    this.head.next = null;
                    return;
                }
            }
            var currNode = this.head;
            while (currNode.next.data !== item) {
                currNode = currNode.next;
            }
            if (currNode === this.head) {
                //如果删除的是第一个节点
                if (!this.size == 1) //而且除了头节点外只有还有好多节点
                    {
                        var lastNode = this.findLast();
                        currNode.next = currNode.next.next;
                        lastNode.next = currNode.next.next;
                    } else {
                    this.head = null;
                }
            } else {
                //如果删除的不是第一个节点
                currNode.next = currNode.next.next;
            }
            this.size--;
        }
    }, {
        key: 'display',
        value: function display() {
            var currentNode = this.head.next;
            var firstNode = currentNode;
            var result = '';
            var count = this.size;
            while (count--) {
                result += currentNode.data;
                if (currentNode.next !== firstNode) {
                    result += '->';
                }
                currentNode = currentNode.next;
            }
            console.log(result);
        }
    }, {
        key: 'append',
        value: function append(item) {
            var currentNod = this.findLast();
            var newNode = new Node(item);
            currentNod.next = newNode;
            newNode.next = this.head.next;
            this.size++;
        }
    }]);

    return CirSingList;
}(_LinkList2.default);

var mycirlinklist = new CirSingList();
console.log(mycirlinklist.findLast());
var arr3 = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
    cirlinklist.append(arr3[i]);
}
cirlinklist.display();
cirlinklist.remove(2);
cirlinklist.display();
console.log(cirlinklist.findLast());
console.log(cirlinklist.find(1));
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//////////////////
//实现单链表

var Node = function Node(data) {
    _classCallCheck(this, Node);

    this.data = data;
    this.next = null;
};

var singleList = function () {
    function singleList() {
        _classCallCheck(this, singleList);

        this.size = 0;
        this.head = new Node('head');
        this.currNode = '';
    }

    _createClass(singleList, [{
        key: 'find',
        value: function find(item) {
            var currNode = this.head;
            while (currNode && currNode.data !== item) {
                currNode = currNode.next;
            }
            return currNode;
        }
    }, {
        key: 'findLast',
        value: function findLast() {
            var currNode = this.head;
            while (currNode && currNode.next != null) {
                currNode = currNode.next;
            }
            return currNode;
        }
    }, {
        key: 'insert',
        value: function insert(item, element) {
            var currNode = this.find(item);
            if (!currNode) {
                return;
            }
            var newNode = new Node(element);
            newNode.next = currNode.next;
            currNode.next = newNode;
            this.size++;
        }
    }, {
        key: 'remove',
        value: function remove(item) {
            if (!this.find(item)) {
                return;
            }
            if (item === 'head') {
                //删除头节点
                if (!this.isEmpty()) {
                    //如果链表不为空，不允许删除头节点
                    return;
                } else {
                    //如果链表是空的
                    this.head.next = null;
                    return;
                }
            }
            var currNode = this.head;
            while (currNode.next.data !== item) {
                currNode = currNode.next;
            }
            currNode.next = currNode.next.next;
            this.size--;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size === 0;
        }
    }, {
        key: 'display',
        value: function display() {
            var currNode = this.head;
            var result = '';
            if (!currNode) {
                console.log("链表为空");
                return;
            } else {
                while (currNode) {
                    result += currNode.data;
                    currNode = currNode.next;
                    if (currNode) {
                        result += '->';
                    }
                }
                console.log(result);
            }
        }
    }, {
        key: 'advance',
        value: function advance(n) {
            var currNode = this.head;
            while (n-- && currNode.next) {
                currNode = currNode.next;
            }
            return currNode;
        }
    }, {
        key: 'show',
        value: function show() {
            console.log(this.currNode.data);
        }
    }, {
        key: 'getLength',
        value: function getLength() {
            return this.size;
        }
    }, {
        key: 'append',
        value: function append(item) {
            var currNode = this.findLast();
            var newNode = new Node();
            newNode.data = item;
            if (currNode) {
                currNode.next = newNode;
                this.size++;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.head.next = null;
            this.size = 0;
        }
    }]);

    return singleList;
}();

var linklist = new singleList();
var linklist2 = new singleList();
var arr = [2, 4, 3];
var arr2 = [5, 6, 4];
for (var i = 0; i < arr.length; i++) {
    linklist.append(arr[i]);
    linklist2.append(arr2[i]);
}
// linklist.display();
// linklist2.display()
// console.log(linklist.find(2));

// linklist.insert(3,10);
// linklist.display()
// linklist.remove(4);
// linklist.display();

// console.log(linklist.findLast() )
// console.log(linklist.advance(3) )
// console.log(linklist.getLength())
//下面的这个函数用来模拟加法器。
//有两个单链表，每一结点都保证一位的数据，第一个结点(头节点的下一个)表示个位。依次类推
//计算的结果保存在一个新的单链表中。
// 问题:1.两个链表的长度不同 2.有可能需要进位操作 特别是最后一次计算 3. 结果保存在单链表中.
function addTwoNumbers(node1, node2) {
    var resultNode = new singleList();
    var carry = 0; //进位标志位
    while (node1 || node2) {
        //解决了两个链表长度不同的问题
        var val1 = node1 ? node1.data : 0; //利用三元操作符对变量进行赋值，很简洁。这一句用来判断该结点是否有效
        var val2 = node2 ? node2.data : 0;
        var answer = val1 + val2 + carry;
        carry = answer > 9 ? 1 : 0; //利用三元操作符，对本次计算结果进行判断，设置进位标志符，简洁！！
        resultNode.append(answer % 10); // 由于需要进位，所以进位后的数值就可能不是原来可能计算出来的值，所以用求余操作进行设置每一位的值，因为是十进制，所以是对十进行求余数。
        if (node1) node1 = node1.next; //由于链表长度不同，需要先判断是否还有下一个有效节点，再更新节点
        if (node2) node2 = node2.next;
    }
    if (carry) resultNode.append(1); //根据进位标准位判断最后一次计算结果是否大于10，如果是，还需要新增加一个节点。

    return resultNode;
}

var mergeTwoLists = function mergeTwoLists(l1, l2) {
    var resultNode = new Node(null);
    var cur = resultNode;
    while (l1 != null && l2 != null) {
        if (l1.data < l2.data) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 || l2;
    return resultNode.next;
};
var test_arr1 = [1, 5, 6];
var test_arr2 = [];
var linklist1 = new singleList();
linklist2 = new singleList();
for (var _i = 0; _i < test_arr1.length; _i++) {
    linklist1.append(test_arr1[_i]);
}
for (var _i2 = 0; _i2 < test_arr2.length; _i2++) {
    linklist2.append(test_arr2[_i2]);
}

var resultNode = addTwoNumbers(linklist.find(2), linklist2.find(5));
resultNode = mergeTwoLists(linklist1.head.next, linklist2.head.next);

var result = "";
while (resultNode) {
    result += resultNode.data;
    if (resultNode.next) {
        result += '->';
    }
    resultNode = resultNode.next;
}
console.log(result);
