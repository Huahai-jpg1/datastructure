//这是一个自平衡的二叉树

class treeNode{
    constructor(val){
        this.val=val;
        this.right=null;
        this.left=null;
    }
}
class AVLTree {
   constructor(){
       this.root=null;
   }
   findNullNode(root,val){
    if(root.val>val){
        if(root.left==null){
            root.left=new treeNode(val);
        }else{
            this.findNullNode(root.left,val)
        }
      
    }else{
        if(root.right==null){
            root.right=new treeNode(val);
        }
        else{

          this.findNullNode(root.right,val)
        }
    }
  }
   insert(val){
   if(this.root==null){
       this.root=new treeNode(val);
       
   }else{
   this.findNullNode(this.root,val) 
        }
   }
   search(val){
     function find(node,val) {
        if(node.val==val) return true;
        if(!node.left&& !node.right) return false;
        
         if(node.val>val){
            return find(node.left,val);
         }else{
             return find(node.right,val)
         }
     }
     return find(this.root,val);
   }
   inOrderTraverseNode(){ //中序遍历
      let result="";
      function inorderTraverseNode(node){
          if(node==null) return ;
          inorderTraverseNode(node.left);
          result+=node.val;
          result+='->'
          inorderTraverseNode(node.right);
      }
      inorderTraverseNode(this.root);
      return result;
      
   }
   preOrderTraverse(){
     let result='';
     function preordertraberse(node){
         if(node==null)return;
         result+=node.val;
         result+='->'
         preordertraberse(node.left);
         preordertraberse(node.right);
     }
     preordertraberse(this.root);
     return result;
   }
   postOrderTraverse(){
    let result='';
    function preordertraberse(node){
        if(node==null)return;
        preordertraberse(node.left);
        preordertraberse(node.right);
        result+=node.val;
        result+='->'
    }
    preordertraberse(this.root);
    return result;
   }
 findMin(node) {
    if(!node.left) return node;
    return  this.findMin(node.left);
}
   min(){
       return (this.findMin(this.root)).val
   }
   max(){
      function findMax(node) {
          if(!node.right) return node.val
          return findMax(node.right);
      }
      return findMax(this.root)
   }
   _removNode(node,val){
    if(!node) return null;
    if(node.val==val){
        if(!node.left&&!node.right) return null;
        else if(!node.left) return node.right;
        else if(!node.right) return node.left;
        else{
            let tempNode=this.findMin(node.right); //_removeNode必须是类中的一个函数，如果是在函数内定义的，当执行该函数的时候，this指向的是一个这个函数，那么在这个函数里面使用this.findMin函数是没有定义的。但是如果是这个类中的一个函数，this指向的是这个类
           node.right=this._removNode(node.right,tempNode.val);
            node.val=tempNode.val;
            return node;
        }
    }else if(node.val<val){
       node.right= this._removNode(node.right,val);
       return node;
    }else{
       node.left=this._removNode(node.left,val);
       return node;
    }

    }  
   remove(val){
    
       this.root=this._removNode(this.root,val);    
     }
}
   



let myAVLtree=new AVLTree();
let arr=[5,1,6,2,0,3,7];
myAVLtree.insert(arr[0]);
myAVLtree.insert(arr[1]);
myAVLtree.insert(arr[2]);
myAVLtree.insert(arr[3]);
myAVLtree.insert(arr[4]);
myAVLtree.insert(arr[5]);
myAVLtree.insert(arr[6]);
console.log(myAVLtree)
console.log(myAVLtree.inOrderTraverseNode());
console.log(myAVLtree.preOrderTraverse());
console.log(myAVLtree.postOrderTraverse())
console.log(myAVLtree.search(1))
console.log(myAVLtree.min())
console.log(myAVLtree.max())
myAVLtree.remove(1);
console.log(myAVLtree.preOrderTraverse())
console.log(myAVLtree.inOrderTraverseNode())