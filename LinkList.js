//////////////////
//实现单链表

class Node {
    constructor(data){
        this.data=data;
        this.next=null;
    }
}
class singleList {
     constructor(){
         this.size=0;
         this.head=new Node('head');
         this.currNode='';
     }
     find(item){
         let currNode = this.head;
         while(currNode && currNode.data!==item){
             currNode = currNode.next;
         }
         return currNode;
     }
     findLast(){
         let currNode=this.head;
        while(currNode && currNode.next!=null){
            currNode=currNode.next;
        }  
        return currNode;
     }
     insert(item,element){
        let currNode=this.find(item);
        if(!currNode){
            return;
        }
         let newNode=new Node(element);
         newNode.next=currNode.next;
         currNode.next=newNode;
         this.size++;
     }
     remove(item){
         if(!this.find(item)){
             return;
         }
         if(item==='head'){    //删除头节点
             if(!(this.isEmpty())){ //如果链表不为空，不允许删除头节点
                 return;
             }else{                //如果链表是空的
                 this.head.next=null;
                 return;
             }
         }
         let currNode=this.head;
         while(currNode.next.data!==item){
             currNode=currNode.next;
         }
         currNode.next=currNode.next.next;
         this.size--;
     }
     removeNode(node){ //移除某个节点
         node.val=node.next.val;
         node.next=node.next.next;
     }
     isEmpty(){
         return this.size===0;
     }
     display(){
        let currNode=this.head;
        let result='';
        if(!currNode){
            console.log("链表为空")
            return;
        }
        else{
            while(currNode){
               result+=currNode.data;
               currNode=currNode.next;
               if(currNode){
                   result+='->';
               }
            }
            console.log(result);
        }
     }

     advance(n){
        let  currNode=this.head;
         while((n--) && currNode.next){
             currNode=currNode.next;
         }
         return currNode;
     }
     show(){
         console.log(this.currNode.data)
     }
     getLength(){
         return this.size;
     }
     append(item){
        let currNode=this.findLast();
        let newNode=new Node();
        newNode.data=item;
        if(currNode){
            currNode.next=newNode;
            this.size++;
        }
     }
     clear(){
         this.head.next=null;
         this.size=0;
     }

}

    var linklist=new singleList();
    var linklist2=new singleList();
    let arr=[2,4,3];
    var arr2=[5,6,4]
    for(let i=0;i<arr.length;i++){
        linklist.append(arr[i]);
        linklist2.append(arr2[i])
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
   function addTwoNumbers(node1,node2){
       const resultNode=new singleList();
       let carry=0;              //进位标志位
       while(node1 || node2){   //解决了两个链表长度不同的问题
           let val1=node1? node1.data:0;  //利用三元操作符对变量进行赋值，很简洁。这一句用来判断该结点是否有效
           let val2=node2? node2.data:0;
           let answer=val1+val2+carry;
           carry = answer>9? 1 : 0;   //利用三元操作符，对本次计算结果进行判断，设置进位标志符，简洁！！
           resultNode.append(answer%10);  // 由于需要进位，所以进位后的数值就可能不是原来可能计算出来的值，所以用求余操作进行设置每一位的值，因为是十进制，所以是对十进行求余数。
           if(node1)node1=node1.next;  //由于链表长度不同，需要先判断是否还有下一个有效节点，再更新节点
           if(node2)node2=node2.next;
       }
       if(carry)resultNode.append(1);  //根据进位标准位判断最后一次计算结果是否大于10，如果是，还需要新增加一个节点。
       
       return resultNode;
   }

   var mergeTwoLists = function(l1, l2) {
    const resultNode=new Node(null);
    let cur = resultNode;
    while(l1!=null && l2!=null){
      if(l1.data<l2.data){
         cur.next=l1;
          l1=l1.next;
      }else{
          cur.next=l2;
          l2=l2.next;
      }
      cur=cur.next;
   }
    cur.next=l1||l2;
    return resultNode.next;
    
 };
    let test_arr1=[1,5,6];
    let test_arr2=[];
    let linklist1=new singleList();
    linklist2=new singleList();
    for(let i=0;i<test_arr1.length;i++){
        linklist1.append(test_arr1[i]);
    }
    for(let i=0;i<test_arr2.length;i++){
        linklist2.append(test_arr2[i]);
    }
    
   let resultNode=addTwoNumbers(linklist.find(2),linklist2.find(5));
   resultNode=mergeTwoLists(linklist1.head.next,linklist2.head.next);
   
   let result="";
   while(resultNode){
       result+=resultNode.data;
       if(resultNode.next){
           result+='->'
       }
       resultNode=resultNode.next;
   }
   console.log(result);
   
    
    
