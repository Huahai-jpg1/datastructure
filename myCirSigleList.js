class Node{
    constructor(val){
        this.val=val;
        this.next=null;
    }
}
class SingleList{
    constructor(){
        this.head=new Node('head');
        this.size=0;
    }
    find(item){
        let cur=this.head;
        while(cur && cur.val!==item){
            cur=cur.next;
        }
        if(cur.val===item){
            return cur
        }else{
            console.log("链表中没有需要的元素");
        }
    }
    insert(element,item){
         let targetNode=this.find(element);
         if(! targetNode) return;
         let newNode = new Node(item);
         newNode.next=targetNode.next;
         targetNode.next=newNode;
         this.size++;
    }
    remove(item){
        if(! this.find(item)) return ;
        if(item===this.head.val){
            if(!this.isEmpty){
                this.size=0;
                this.head.next=null;
            }else{
                return;
            }
        }else{
            let cur=this.head;
            while(cur.next.val!==item){
                cur=cur.next;
            }
            cur.next=cur.next.next;
            this.size--;
        }
    };  // 在单链表中删除一个节点
    append(element){
         let cur = this.findLast();
         let newNode=new Node(element);
         cur.next=newNode;
         this.size++
    } // 在单链表的尾部添加元素
    findLast(){
        let currNode =this.head;
        while(currNode.next!==null){
            currNode=currNode.next;
        }
        return currNode;
    };  // 获取单链表的最后一个节点
    isEmpty(){
        return this.size===0;
    };  // 判断单链表是否为空
    getLength(){
        return this.size;
    };  // 获取单链表的长度
    advance(n){
        let currNode= this.head;
        while(n--&&currNode){
            currNode=currNode.next;
        }
        return currNode;
    };  // 从当前节点向前移动n个位置
    display(){
        let cur=this.head;
        let result='';
        while(cur){
            result+=cur.val;
            if(cur.next){
                result+='->';
            }
            cur=cur.next;
        }
        console.log(result);
    };  // 单链表的遍历显示
    clear(){
        this.head.next=null;
        this.size=0;
    };  // 清空单链表
}

let test_arr=[1,2];
let mysingleList=new SingleList();
for(let i=0;i<test_arr.length;i++){
    mysingleList.append(test_arr[i]);
}

class CirSingleList extends SingleList{
    constructor(){
        super();
    }
    // 在单循环链表中寻找最后一个节点
    findLast() {
        let cur =this.head;
        let count=this.size;
        while(count--){
            cur=cur.next;
        }
        return cur;
    }
       
    // 在单循环链表中寻找数据
    find(item) {
        let cur= this.head;
        let count=this.size;
        while(count-- && cur.val!==item){
            cur=cur.next;
        }
        if(cur.val!==item && count===0){
            console.log("链表中没有需要寻找的元素")
        }else{
            return cur;
        }
    }
              
    // 在数据为item的节点后面插入数据为element元素的节点
    insert(item, element) {
        let targetNode=this.find(item);
        if(! targetNode)return;

        let newNode=new Node(element);

        if(item===this.head.val){
            if(this.isEmpty()){
                this.head.next=newNode;
                newNode.next=newNode;

            }else{
               let lastNode=this.findLast();
               newNode.next=this.head.next;
               this.head.next=newNode;
               lastNode.next=this.head.next;
            }
        }else{
            newNode.next=targetNode.next;
            targetNode.next=newNode;
        }
        this.size++;
    }

    remove(item) {
       let targetNode=this.find(item);
       if(!targetNode)return;
       if(item===this.head.val){
           if(this.isEmpty){
               return;
           }else{
               this.head.next=null;
               this.size=0;
           }
       }else {
           let cur =this.head;
           while(cur.next.val!==item){
               cur=cur.next;
           }
           cur.next=cur.next.next;
           this.size--;
           let lastNode=this.findLast();
           lastNode.next=this.head.next;
       }
     
          
    }

    display() {
        let result='';
        let cur=this.head;
        let count=this.size+1;
        let lastNode=this.findLast()
        while(count--){
            result+=cur.val;
            if(cur!==lastNode){
                result+='->'
            }
            cur=cur.next;
        }
        console.log(result);
    }

    //在尾部添加数据
    append(element) {
        let newNode=new Node(element);
        if(this.isEmpty()){
            this.head.next=newNode;
            newNode.next=newNode;
        }else{
            let lastNode=this.findLast();
            newNode.next=lastNode.next;
            lastNode.next=newNode;
        }
        this.size++;
    }
}

let myCirSingleList=new CirSingleList();
for(let i=0;i<test_arr.length;i++){
    myCirSingleList.append(test_arr[i]);
}
var reverseBetween = function(head, left, right) {
   const dummy=new Node();
   dummy.next=head;
   if(left==right)return dummy.next;
   let m=1;
   let beforestart=dummy;
   while(m<left){
       beforestart=beforestart.next;
       m++;
   }
   let end=beforestart;
   while(m<=right){
       end=end.next;
       m++;
    }
    let endAfter=end.next;
    let start=beforestart.next;
    let pre=start;
    let cur=pre.next;
    let next=cur.next;
    while(cur!=end){
        cur.next=pre;
        pre=cur;
        cur=next;
        next=cur.next;
    }

    beforestart.next=cur;
    start.next=endAfter;
    cur.next=pre;
    return dummy.next;

};

// let head=mysingleList.advance(1);
// let reverseResult=reverseBetween(head,1,3);
// console.log(reverseResult);

var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};

var reverseList=function(head){
    if(!head || head.next==null){
        return head;
    }
    let newhead=head.next;
    let nexthead=reverseList(newhead.next);
    newhead.next=head;
    nexthead.next=newhead;
    return nexthead;

}


let frontPointer;

const recursivelyCheck = (currentNode) => {
    if (currentNode !== null) {
        if (!recursivelyCheck(currentNode.next)) {
            return false;
        }
        if (currentNode.val !== frontPointer.val) {
            return false;
        }
        frontPointer = frontPointer.next;
    }
    return true;
}

var isPalindrome = function(head) {
    frontPointer = head;
    return recursivelyCheck(head);
};


var isPalindrome = function(head) {
    let tempList=[];
    while(head){
        tempList.push(head.val);
        head=head.next;
    };
    let j=tempList.length-1;
    let i=0;
  //   while(tempList[i]==tempList[j]){
  //      i++;
  //      j--;
  //      if(i==j) return true;
  //   }
  
  for(let i=0,j=tempList.length-1,stopNum=Math.floor(tempList.length/2);i<=stopNum;i++,j--){
      if(tempList[i]!=tempList[j]){
        return false;
      }
  }
    return true;
     
  };



mysingleList.display()
console.log(isPalindrome(mysingleList.advance(1)))
