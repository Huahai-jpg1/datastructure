//排序算法

//冒泡排序
 var BubbleSort=function(arr){
     for(let i=0;i<arr.length;i++){
         for(let j=arr.length-1;j>=i;j--){
             if(arr[j]<arr[j-1]){
                 [arr[j-1],arr[j]]=[arr[j],arr[j-1]];
             }
         }
     }
     return arr;
 }

 let arr=[9,1,5,8,3,7,2];
 console.log(BubbleSort(arr))