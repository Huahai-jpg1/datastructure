// //利用数组的栈方法写一个栈
// //js中的Array对象有栈方法 push()和pop()


function Stack (){
    let items = []
    
    this.push = function(element){
        items.push(element)
    }
    this.pop = function(){
       return items.pop()
    }
    this.peek = function(){
        return items[items.length - 1]
    }
    this.isEmpty = function(){
        return items.length === 0
    }
    this.size = function(){
        return items.length
    }
    this.clear = function(){
        items = []
    }
    this.print = function(){
        console.log(items.toString())
    }
}

    var myStack= new Stack();
    myStack.push(123);
    myStack.print();
