//利用js数组的队列操作，实现一个队列

class Queue{
    constructor(length){
        this.data=[];
        this.max=length;
        this.size=0;
    }
    append(item){
        if(this.size>=this.max){
            this.data.shift();
        }
        this.data.push(item);
        this.size++;
       
    }
   dequeue(){   //队首删除一个元素
       this.data.shift();
       this.size--;
   }
    
    front(){
       return this.data[0];
    }    //读取队首元素
     back(){
      return this.data[this.size-1];
     };      //读取队尾元素
    Display(){
       let result='';
       for(let i=0;i<this.size;i++){
           result+=this.data[i];
           if(i<this.size-1)
            result+='<-'
       }
       console.log(result);
    };//显示队内元素
    isEmpty(){
        return this.size==0;
    };//判断队列是否为空

}

let myQueue=new Queue(3);
console.log(myQueue.isEmpty());
let test_arr=[1,2,3];
for(let i=0;i<test_arr.length;i++){
    myQueue.append(test_arr[i]);
}
myQueue.Display();
console.log(myQueue.front());
console.log(myQueue.back());
myQueue.dequeue()
myQueue.Display()
