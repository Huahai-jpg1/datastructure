//图的实现
//所谓的邻接表就是用链表来实现的
//需要注意表顶节点和表边节点之间的区别
class Vertex{ //顶点表节点
    constructor(data){
        this.data=data;
        this.firstEdge=null;//指向第一个邻接边的指针
        this.outNum=0;//在无向图中表示与顶点邻接的边的数量，在有向图中为出度
        this.inNum=0;//在有向图中为顶点的入度
    }
}
class EdgeVertex{//表边节点
    constructor(data,weight=0,nextEdge=null){ //weight表示权值
        this.data=data;
        this.nextEdge=nextEdge;
        this.weight=weight;
    }
}
class Graph{
    constructor(isDirected=flase){
        this.isDirected=isDirected;
        this.adj=[];//顶点表
        this.eNum=0;//边的数目
    }
    initVertex(verArr){//初始化顶点表
      for(let i=0;i<verArr.length;i++){
          let newVer=new Vertex(verArr[i])
          this.adj.push(newVer);
      }
    }
    addVertex(data){
      let newVer=new Vertex(data);
      this.adj.push(newVer);
    }
    _find(data){
        //找到节点val在顶点表中的位置
        let pos=-1;
        for(let i=0;i<this.adj.length;i++){
            if(this.adj[i].data===data){
                pos=i;
                break;
            }
        }
        return pos
        
    }
    //判断图中是否存在边(x,y)或者(x,y)
    hasEdge(x,y){
      let x_index=this._find(x);
      if(x_index>-1){
         let curVertex=(this.adj[x_index]).firstEdge;
          while(curVertex){
              if(curVertex.data===y) return true
              curVertex=curVertex.nextEdge;
            }
            return false;
        }
    }
    addEdge(x,y,w=0){
       let pos_x=this._find(x);
       let pos_y=this._find(y);
       let newEdgeX=new EdgeVertex(x,w);
       let newEdgeY=new EdgeVertex(y,w);
       if(!this.isDirected){
           //如果是无向图
           if(!this.hasEdge(x,y)&&!this.hasEdge(y,x)){
               this.adj[pos_x].outNum++;
               let curVertex=this.adj[pos_x].firstEdge;
               if(!curVertex){
                this.adj[pos_x].firstEdge=newEdgeY;
                   
               }else{
                   while(curVertex.nextEdge){
                       curVertex=curVertex.nextEdge;
                   }
                   curVertex.nextEdge=newEdgeY;
               }
               this.adj[pos_y].outNum++;
               curVertex=this.adj[pos_y].firstEdge;  
               if(!curVertex){
                this.adj[pos_y].firstEdge=newEdgeX
               }else{
                   while(curVertex.nextEdge){
                       curVertex=curVertex.nextEdge
                   }
                   curVertex.nextEdge=newEdgeX;
               }
               this.eNum++;
           }
       }else{
           //如果是有向图
           if(!this.hasEdge(x,y)){
               this.adj[pos_x].outNum++;
               this.adj[pos_y].inNum++;
               let curVertex=this.adj[pos_x].firstEdge;
            if(!curVertex){
                this.adj[pos_x].firstEdge=newEdgeY
            }else{
                while(curVertex.nextEdge){
                    curVertex=curVertex.nextEdge;
                }
                curVertex.nextEdge=newEdgeY;
                }
           }
           this.eNum++;
       }
    }
    removeEdge(x,y){
        let pos_x=this._find(x);
        let pos_y=this._find(y);
        if(!this.isDirected){
            if(this.hasEdge(x,y)&&this.hasEdge(y,x)){
                this.adj[pos_x].outNum--;
                this.adj[pos_y].outNum--;
                this.eNum--;
                if(this.adj[pos_x].firstEdge.data===y){
                    this.adj[pos_x].firstEdge=this.adj[pos_x].firstEdge.nextEdge;
                }else{
                    let curVertex=this.adj[pos_x].firstEdge;
                    while(curVertex.nextEdge.data!==y){
                        curVertex=curVertex.nextEdge;
                    }
                    curVertex.nextEdge=curVertex.nextEdge.nextEdge;
                }
                if(this.adj[pos_y].firstEdge.data===x){
                    this.adj[pos_y].firstEdge=this.adj[pos_y].firstEdge.nextEdge;
                }else{
                    let curVertex=this.adj[pos_y].firstEdge;
                    while(curVertex.nextEdge.data!==x){
                        curVertex=curVertex.nextEdge;
                    }
                    curVertex.nextEdge=curVertex.nextEdge.nextEdge
                }
            }
        }else{
            if(this.hasEdge(x,y)){
                this.adj[pos_x].outNum--;
                this.adj[pos_y].inNum--;
                this.eNum--;
                if(this.adj[pos_x].firstEdge.data===y){
                    this.adj[pos_x].firstEdge=this.adj[pos_x].firstEdge.nextEdge;
                }else{
                    let curVertex=this.adj[pos_x].firstEdge;
                    while(curVertex.nextEdge.data!==y){
                        curVertex=curVertex.nextEdge;
                    }
                    curVertex.nextEdge=curVertex.nextEdge.nextEdge;
                }
            }
        }
    }
    deleteVertex(x){
       let pos_x=this._find(x);
        if(pos_x!==-1){
            let len=this.adj[pos_x].outNum;
            //splice函数有三个参数，第一个参数用于指定开始的索引号，第二个参数用于指定删除或添加多少个元素，第三个参数给出需要添加的内容
           this.adj.splice(pos_x,1);
           for(let i=0;i<this.adj.length&&len>0;i++){
               let curVertex=this.adj[i].firstEdge;
               while(curVertex&& curVertex.data!==x){
                   curVertex=curVertex.nextEdge;
               }
               if(curVertex){
                   len--
                  curVertex.data=curVertex.nextEdge.data;
                  curVertex.nextEdge=curVertex.nextEdge.nextEdge;
               }
               
           }
        }
    }
    allNeightbors(){
        for(let i=0;i<this.adj.length;i++){
            let result='';
            let curVertex=this.adj[i];
            result+=curVertex.data;
            result+='->';
            curVertex=curVertex.firstEdge;
            while(curVertex){
                result+=curVertex.data;
                if(curVertex.nextEdge){
                    result+='->';
                }
                
                curVertex=curVertex.nextEdge;
            }
            console.log(result)
        }
    }
    //广度优先搜索
    BFSTraverse(x=this.adj[0].data){
        let visited=[];
        let result='';

        for(let i=0;i<this.adj.length;i++){
            visited[i]=false;
        }

        result = this._BFS(x,visited);//求以x为起始点的连通分量
        //如果还有未被访问的顶点，则以该顶点再次出发
        let index= visited.indexOf(false)
        if(index!==-1){
            for(let i=index;i<this.adj.length&&visited.indexOf(false)!==-1;i++){
                let x=this.adj[i].data;
                result+='&'+this._BFS(x,visited);
            }
        }
        
        return result

    }
    //实际进行广度优先搜索的函数，每次遍历都是得到一个以顶点x为起点的连通分量
    _BFS(x,visited){
        let pos = this._find(x);
        let queue= [];
        let result='';
        if(pos!==-1){
            let curVertex=this.adj[pos];
            visited[pos]=true;
            result+=curVertex.data;
            queue.push(curVertex);
            while(queue.length){
                curVertex=queue.shift() //出队列的是边表点，并没有firstEdge，所以需要找到该表边节点对应的邻接表
                pos=this._find(curVertex.data)
                curVertex=this.adj[pos].firstEdge
                while(curVertex){
                    pos=this._find(curVertex.data);
                    if(!visited[pos]){
                        visited[pos]=true;
                        result+='->'+curVertex.data;
                        queue.push(curVertex);
                    }
                    curVertex=curVertex.nextEdge;
                }
            }
        }
        return result;
    }
    DFSTraverse(x=this.adj[0].data){ //深度优先搜索
       let pos=this._find(x)
       let result='';
       let visited=[];
       for(let i=0;i<this.adj.length;i++){
           visited[i]=false;
       }
       if(pos!==-1){
           result=this._DFS(x,visited);
       }
       let index=visited.indexOf(false);
       if(index!==-1){
           for(let i=index;i<visited.length&&visited.indexOf(false)!==-1;i++){
               result+='&'+this._DFS(this.adj[i].data,visited);
           }
       }
       console.log(result)
    }
    _DFS(x,visited){
        let result='';
        let pos=this._find(x);
        let queue=[];
        if(pos!==-1){
            result+=this.adj[pos].data;
            visited[pos]=true;
            queue.push(this.adj[pos]);
            while(queue.length){
                let curVertex=queue[queue.length-1];
                pos=this._find(curVertex.data);
                curVertex=this.adj[pos].firstEdge;
                while(curVertex){
                    pos=this._find(curVertex.data)
                    if(visited[pos]){
                        curVertex=curVertex.nextEdge;
                    }else{
                        visited[pos]=true;
                        queue.push(curVertex);
                        result+='->'+curVertex.data;
                        break;
                    }
                  
                }
                if(!curVertex) queue.pop() //当已经没有路径可走的时候返回上一次的节点
            }
        }
        return result;
    }
    
    getEdgeWeight(x,y){
        //获取边(x,y)的权值
        let pos_x=this._find(x)
        if(pos_x>-1){
            let curVertex=this.adj[pos_x].firstEdge;
        while(curVertex){
            if(curVertex.data===y) return curVertex.weight
            curVertex=curVertex.nextEdge;
        }
        return 0
        }
        
    }
    
    getSumOfWeight(){
      //获取图中权值之和
      let sum =0;
      if(!this.isDirected){
          //如果是无向图
          for(let i=0;i<this.adj.length-1;i++){
            for(let j=i;j<this.adj.length;j++){
                let weight=this.getEdgeWeight(this.adj[i].data,this.adj[j].data)
                if(weight) sum+=weight;
            }
        }
      }else{
          for(let i=0;i<this.adj.length-1;i++){
              for(let j=0;j!=i&&j<this.adj.length;j++){
                  let weight=this.getEdgeWeight(this.adj[i].data,this.adj[j].data)
                  if(weight) sum+=weight;
              }
          }
      }
  
      return sum;
     
    }
     
    isConnected(x=this.adj[0].data){
      //判断当前的图是否是连通图
      //如果是连通图的话，只需要一次的遍历即可得到所有的节点
      let  vertexts=this.getVertexData()
      let pos=vertexts.indexOf(x);
      let visited=[];
      let queue=[];
      for(let i=0;i<this.adj.length;i++){
          visited[i]=false;
      }
      let curVertex=this.adj[pos];
      visited[pos]=true;
      queue.push(curVertex);
      while(queue.length){
          curVertex=queue[queue.length-1];
          pos=this._find(curVertex.data);
          curVertex=this.adj[pos].firstEdge;
          while(curVertex){
              pos=this._find(curVertex)
              if(visited[pos]){
                  curVertex=curVertex.nextEdge;
              }else{
                 visited[pos]=true;
                 queue.push(curVertex)
                 break;
              }
          }
          if(!curVertex) queue.pop()
      }
      return visited.indexOf(false)===-1? true :false;
    }
    getPrimMST(){
        //普里姆算法
        if(!this.isConnected) return ;
        let V=this.adj;
        let Vt=[V[0]];
       // let V_Vt=V.fill(x=>Vt.indexOf(x)===-1);
        let MSTree=new Graph(this.isDirected);
        MSTree.addVertex(Vt[0].data);
        while(Vt.length!=this.adj.length){
            let data=Vt[Vt.length-1].data
            let arr=this.getMinWeight(data,Vt)
            let minWeight=arr[0];
            let nextTexver_pos=arr[1];
            let nextTexver=new EdgeVertex(this.adj[nextTexver_pos].data,minWeight)
            let curVertex=MSTree.adj[MSTree.adj.length-1]
            curVertex.firstEdge=nextTexver;
            Vt.push(this.adj[nextTexver_pos]);
            MSTree.addVertex(nextTexver.data);
            
            
        }
        return MSTree;
        
        






    }
    getMinWeight(x,vt){
        let pos= this._find(x)
        if(pos===-1) return;
        let curVertex=this.adj[pos].firstEdge;
        pos =this._find(curVertex.data);
        let minWeight=Infinity;
        while(curVertex){
            if(curVertex.weight<minWeight&&vt.indexOf(this.adj[this._find(curVertex.data)])===-1){
                minWeight=curVertex.weight;
                pos=this._find(curVertex.data)
            }
            curVertex=curVertex.nextEdge;
        }
        return [minWeight,pos];
    }
   
    getAllEdges(){
        //获取图中所有的边
        let stack=[];
        if(!this.isDirected){
            //如果是无向图
            for(let i=0;i<this.adj.length-1;i++){
                for(let j=i;j<this.adj.length;j++){
                    if(this.hasEdge(this.adj[i].data,this.adj[j].data)){
                        let weight=this.getEdgeWeight(this.adj[i].data,this.adj[j].data)
                        stack.push([this.adj[i].data,this.adj[j].data,weight])
                    }
                }
            }
        }else{
            for(let i=0;i<this.adj.length;i++){
                for(let j=0;j!=i&&j<this.adj.length;j++){
                    if(this.hasEdge(this.adj[i].data,this.adj[j].data)){
                        let weight=this.getEdgeWeight(this.adj[i].data,this.adj[j].data)
                        stack.push([this.adj[i].data,this.adj[j].data,weight])
                    }
                }
            }
        }
        return stack;
    }

    getKruskalMST(){
        // 克鲁斯卡尔算法
        let allEdges=this.getAllEdges();
        let MSTree= new Graph(this.isDirected);
        let curEdge=this.getMinWeightEdge(allEdges);
        MSTree.addVertex(curEdge[0][0]);
        MSTree.addVertex(curEdge[0][1]);
        MSTree.addEdge(curEdge[0][0],curEdge[0][1],curEdge[0][2]);
        allEdges.splice(curEdge[1],1);
        while(MSTree.eNum<this.adj.length-1){
           let str_BFS=MSTree.BFSTraverse(MSTree.adj[0].data)
           let str2arr=str_BFS.split(str_BFS.indexOf("&")!==-1?"&":"->")
           if(str2arr[0].indexOf("->")!==-1){
               str2arr=str2arr[0].split("->")
           }
           let curEdge=this.getMinWeightEdge(allEdges);
           let MSTree_vertex=MSTree.getVertexData();
           //找到边后，判断是否会构成回路
           //如果两个节点都不在MSTree中
           if(str2arr.indexOf(curEdge[0][0])==-1 || str2arr.indexOf(curEdge[0][1])==-1){ //只有两个节点至少有一个不在MSTree中才不构成回路
               if(str2arr.indexOf(curEdge[0][0])==-1 && str2arr.indexOf(curEdge[0][1])==-1){ 
                   MSTree.addVertex(curEdge[0][0]);
                   MSTree.addVertex(curEdge[0][1]);
                   MSTree.addEdge(curEdge[0][0],curEdge[0][1],curEdge[0][2]);
               //如果有一个节点已经在MSTree中   
               }else if(str2arr.indexOf(curEdge[0][0])!==-1){ //如果是有一个节点已经在树中
                console.log(MSTree_vertex.indexOf(curEdge[0][1]))
                  if(MSTree_vertex.indexOf(curEdge[0][1])===-1){ //避免两个节点已经在MSTree中但是，知识没有构成连接而已
                    MSTree.addVertex(curEdge[0][1]);
                  }
                   
                   MSTree.addEdge(curEdge[0][0],curEdge[0][1],curEdge[0][2]);
               }else{
                   if(MSTree_vertex.indexOf(curEdge[0][0])===-1){
                    MSTree.addVertex(curEdge[0][0])
                   }
                   
                   MSTree.addEdge(curEdge[0][1],curEdge[0][0],curEdge[0][2])
               }
           }
            
           allEdges.splice(curEdge[1],1);
        }
        //修改定点表中的顺序，防止遍历的时候不是从链条的头或尾开始时，导致遍历错误。
        console.table(MSTree.adj)
        let i=0;
        let curVertex = MSTree.adj[i]
        while(curVertex.outNum!=1&&i<MSTree.adj.length){
            curVertex=MSTree.adj[++i]
        }
        [MSTree.adj[0],MSTree.adj[i]]=[MSTree.adj[i],MSTree.adj[0]]
        return MSTree
  
    }
    getMinWeightEdge(allEdges){
        let minWeight=Infinity;
        let pos_min=0;
        for(let i=0;i<allEdges.length;i++){
            if(allEdges[i][2]<minWeight){
                minWeight=allEdges[i][2];
                pos_min=i;
            }

         }
         return [allEdges[pos_min],pos_min];
    }
    
    getVertexData(){
        let i=0;
        let curVertex=this.adj[i];
        let Date=[]
        while(curVertex){
           Date.push(curVertex.data)
           curVertex=this.adj[++i]
        }
        return Date;
    }

    getShortesPath(x){
       //单源最小路径
       console.log(this.getMinWeight())
       
       console.log(this._find(x))
       console.log(this.isConnected(x))
       if(this.getMinWeight()<0 ||
          !this.isDirected||
          this.isConnected(x)||
          this._find(x)===-1){return -1 }

        var dist=[];
        var vers=[];
        var exts=[x];
        var path=[];

        var len = this.adj.length;
        var MAX=Infinity;

        for(let i=0; i<len;i++){
            vers[i]=this.adj[i].data;
            dist[i]=this.getEdgeWeight(x,vers[i]) || MAX;
            if(dist[i]!==MAX){
                path[i]=`${x}->${vers[i]}`
            }else{
                path[i]="";
            }
        }
        var rem = vers.filter(x=>exts.indexOf(x)===-1)
        while(exts.length<len){
            var MIN= MAX;
            var idx=-1;
            for(let i=0;i<dist.length;i++){
                if(MIN>dist[i]){
                    MIN=dist[i]
                    idx=i;
                }
            }

            var Vj=vers[idx];
            exts.push(Vj)
            dist[idx]=MAX;

            rem=vers.filter(x=>exts.indexOf(x)===-1);
            console.log(path[idx])
            for(let i=0;i<rem.length;i++){
                var w=this.getEdgeWeight(Vj,rem[i]) || MAX;
                var k=vers.indexOf(rem[i]);
                if(w+MIN<dist[k]){
                    dist[k]=w+MIN;
                    path[k]=`${path[idx]}->${vers[k]}`
                }

            }

        }

    }     
}

var arr = ['A', 'B', 'C', 'D', 'E'];
var myGraph = new Graph(1);  // 1表示有向图
myGraph.initVertex(arr);

myGraph.addEdge('A', 'B', 10);
myGraph.addEdge('A', 'C', 3);
myGraph.addEdge('B', 'C', 1);
myGraph.addEdge('B', 'D', 2);
myGraph.addEdge('C', 'B', 4);
myGraph.addEdge('C', 'D', 8);
myGraph.addEdge('C', 'E', 2);
myGraph.addEdge('D', 'E', 7);
myGraph.addEdge('E', 'D', 9);

myGraph.allNeightbors()

myGraph.getShortesPath("A")