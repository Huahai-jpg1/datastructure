//二叉搜索树
class Node{
    constructor(val){
        this.val=val;
        this.left=null;
        this.right=null;
        this.count=1;
    }
}

class BsTree{
     constructor(){
         this.root=null;
     }
     _removeBode(node,data){
              if (!node) return null;
              if(node.val==data){
                    if(node.left==null && node.right==null) return null;
                    if(node.left==null) return node.right;
                    if(node.right==null) return node.left;
                    let tempNode=this.getMinNode(node.right);
                    node.data =tempNode.data;
                    node.right=this._removeBode(node.right,tempNode.data);
                    return node;
              }else if(data>node.val){
                  node.right=this._removeBode(node.right,data)
                  return node;
              }else{
                  node.left=this._removeBode(node.left,data)
                  return node;
                }
     }
     remove(val){
           this.root=this._removeBode(this.root,val);
     }
     insert(val){
          let newNode=new Node(val);
          if(!this.root) {
              this.root=newNode;
              return;
            }
        let curNode=this.root;
        let parentNode=null;
        while(true){
            parentNode=curNode;
            if(newNode.val<curNode.val){
                curNode=curNode.left;
                if(! curNode){
                    parentNode.left=newNode;
                    break;
                }
            }else if(newNode.val>curNode.val){
                    curNode=curNode.right;
                    if(! curNode){
                        parentNode.right=newNode;
                        break;
                    }
            }else{
                curNode.count++;
                break;
            }


        }
          
     }
     find(data){
         let curNode=this.root;
         while(curNode){
             if(curNode.val===data){
                return curNode;
             }else if(curNode.val>data){
                 curNode=curNode.left;
             }else{
                 curNode=curNode.right;
             }
         }
         return null;
     }
     getMinNode(node=this.root){
         if(!node) return;
         while(node.left){node=node.left}
         return node.val;
     }
     getMaxNode(node=this.root){
        if(!node) return;
        while(node.right){
            node=node.right;
        }
        return node.val;
     }
     inOrderTraverseNode(node,callback){  //中序遍历，callback为回调函数
         if(!node) return ;
         this.inOrderTraverseNode(node.left,callback);
         callback(node);
         this.inOrderTraverseNode(node.right,callback);
     }
     isValidBST(node){
         let pre=-Infinity;
         function helper(node){
            if(!node) return true;
            if(!helper(node.left)) return false;
            if(node.val<pre) return false
            pre=node.val;
            return helper(node.right);
         }

         return this.isValidBST(node);

     }
     levelOrder(node=this.root){  //层序遍历
        let queue=new Array();
        let result='';
        queue.push(node); 
        while(queue.length){
            node=queue.shift()
            result+=node.val;
            result+='->'
            if(node.left){queue.push(node.left)}
            if(node.right){queue.push(node.right)}
        }
        return result;
     }

     getNodeNumber(node=this.root){
      //获取二叉树的节点数量
      let count=0;
      var helper=function (node) {
          if(node===null)return 0;
          count++;
          helper(node.left);
          helper(node.right);
      }
      helper(node);
      return count;
 
     }
     getLeafNodeNumber(node=this.root){
      //获取叶子节点的数量
      let queue=new Array();
      let count=0;
      queue.push(node)
      while(queue.length){
          node=queue.shift();
          if(!node.left && !node.right) count++;
          if(node.left) queue.push(node.left)
          if(node.right) queue.push(node.right);
      }
      return count;
     }
     getTreeDepth(node=this.root){
        //获得树的最大深度
        return node?Math.max(this.getTreeDepth(node.left),this.getTreeDepth(node.right))+1:0;
     }
     getLevelNodeNumber(level,node=this.root){
        //获得某一层的节点数量
        if(node){
            let depth=0;
            let size=0;
            let queue = new Array();
            queue.push(node);
            if (queue.length==level) return queue.length
            while(queue.length){
                size=queue.length;
                if(size==0) break;
                while(size--){
                    node=queue.shift();
                    if(node.left)queue.push(node.left)
                    if(node.right)queue.push(node.right)
                }
                depth++;
                if(depth==level) return queue.length;
            }
        }
     }
     isCompleteTree(node=this.root){
       //判断是否是完全二叉树
       let queue=new Array();
       let finalNum=0;
       queue.push(node)
       while(queue.length){
           node=queue.shift();
           if(node.left){
               queue.push(node.left);
               if(finalNum) return false;
            }
           else if(node.right){
               return false;
           }
           if(node.right) queue.push(node.right);
           else{
               finalNum=queue.length;
           }
       }
       return true;
     }
     invertTree(node=this.root){
         //求二叉树的镜像
         if(node==null) return;
         let tempNode=node.left;
         node.left=node.right;
         node.right=tempNode;
         this.invertTree(node.left);
         this.invertTree(node.right);
     }
     kthSmallest = function(root, k) {  //找出二叉树的第K小的数
        let res=null;
        function helper(root) {
            if(root!=null&&k){
                helper(root.left)
                if(--k===0){
                    res=root.val;
                    return;
                }
                helper(root.right)
            }
           
        }
        helper(root);
        return res;
        
    }




}



function isValidBST(node){  //判断是否是二叉树
    let pre=-Infinity;
    var helper=function (node){
       if(!node) return true;

       if(!helper(node.left)) return  false;
       if(node.val<=pre){
        return false;
       }
        pre=node.val;
      return helper(node.right)
      
    
    }
    return helper(node);
}



var isSymmetric = function(root) {  //判断是否是对称的树
    // let l_cur;
    // let r_cur;
    function helper(lTreeNode,rTreeNode){
        if(lTreeNode==null&&rTreeNode==null) return true;
        if(lTreeNode==null ||rTreeNode==null || lTreeNode.val!==rTreeNode.val) return false;
        
        if(helper(lTreeNode.left,rTreeNode.right)){
            return helper(lTreeNode.right,rTreeNode.left);
        };
        return false;
    }
  return  helper(root,root);
};

var isBalanced=function (root) {  //是否为平衡树
    if(root==null) true;
    return Math.abs(TreeDepth(root.left)-TreeDepth(root.right))<=1 && isBalanced(root.left)&& isBalanced(root.right);
}

function TreeDepth(root){   //   
    if(root==null) return 0;
   let  lDepth=TreeDepth(root.left);
   let rDepth=TreeDepth(root.right);
    return Math.max(lDepth,rDepth)+1;
}




let node1=new Node(1)
let node2=new Node(2)
let node3=new Node(2)
let node4=new Node(3)
let node5=new Node(3)
let node6=new Node(4)
let node7=new Node(4)
let node8=new Node(3)
let node9=new Node(3)


node1.left=node2;
node1.right=node3;
node2.left=node4;
node3.right=node5;
node4.left=node6;
node5.right=node7;

let myBSTree = new BsTree();
let arr=[2,3,1,0,4,5,6,7];
for(let i=0;i<arr.length;i++){
    myBSTree.insert(arr[i]);
}

console.log(kthSmallest(myBSTree.root,1))


