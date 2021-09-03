//////////////////////
//实现循环单链表
import singleList from './LinkList'  //如何进行联合编译？？？
class CirSingList extends singleList{ //继承单链表的原型创建一个新类
    constructor(){
        super();  //调用父类的构造函数(constructor)
    }

    findLast(){
        let currentNode=this.head;
        let count=0;
        while ( count++ !==this.size){
          currentNode=currentNode.next;
        }
        return currentNode;
    }
    insert(item,element){
          if(!this.find(item))return;
          if(item==='head'){
            let newNode=new Node(element);
              if(this.isEmpty){
                  this.head.next=newNode;
                  newNode.next=newNode;
                  this.size++;
              }
              else{
                  let lastNode=this.findLast();
                  newNode.next=this.head.next;
                  this.head.next=newNode;
                  lastNode.next=newNode;
                  this.size++;
              }
          }else{
                  let currentNode=this.head;
                  while(currentNode.next.data!==item){
                      currentNode=currentNod.next;
                  }
                  newNode.next=currentNode.next.next;
                  currentNode.next=newNode;
                  this.size++;
          }
         
    }
    remove(item){
        if(! this.find(item)) return;
        if(item==='head'){
            if(!this.isEmpty()){
                return;
            }
            else{
                this.head.next=null;
                return;
            }
        }
        let currNode=this.head;
        while(currNode.next.data!==item){
             currNode=currNode.next;
        }
        if(currNode===this.head){ //如果删除的是第一个节点
            if(!this.size==1)   //而且除了头节点外只有还有好多节点
             { 
                 let lastNode=this.findLast();
                 currNode.next=currNode.next.next;
                 lastNode.next=currNode.next.next;
                 
            }
            else{
                  this.head=null;
                  
            }
        }else{   //如果删除的不是第一个节点
            currNode.next=currNode.next.next;
           
        }
        this.size--;
    }
    display(){
       let currentNode=this.head.next;
       let firstNode=currentNode;
       let result='';
       let count=this.size;
       while(count--){
           result+=currentNode.data;
           if(currentNode.next!==firstNode){
               result+='->'
           }
           currentNode=currentNode.next;
       }
       console.log(result);
    }
    append(item){
        let currentNod=this.findLast();
        let newNode=new Node(item);
        currentNod.next=newNode;
        newNode.next=this.head.next;
        this.size++;
    }
}
let mycirlinklist=new CirSingList();
console.log(mycirlinklist.findLast())
let arr3=[1,2,3];
for(let i=0;i<arr.length;i++){
    cirlinklist.append(arr3[i]);
}
cirlinklist.display();
cirlinklist.remove(2);
cirlinklist.display();
console.log(cirlinklist.findLast());
console.log(cirlinklist.find(1));

