import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class UF {
 private int[] id;
 
 public UF(int N){
  id = new int[N];
  for (int i = 0; i < N; i++){
   id[i] = i;
  }
 }
 public void union(int p, int q){
  int pid = id[p];
  int qid = id[q];
  for (int i = 0; i < id.length; i++){
   if (id[i] == pid){
    id[i] = qid;
   }
  }  
 }
 public boolean connected(int p, int q){
  return id[p] == id[q]; 
 }
 public int find(int p){
  return p;
 }
 public int count(){
  return 0;
 }
 public static void main(String[] args){
  int N = StdIn.readInt();
  UF uf = new UF(N);
  while(!StdIn.isEmpty()){
   int p = StdIn.readInt();
   int q = StdIn.readInt();
   if(!uf.connected(p,q)){
    uf.union(p, q);
    StdOut.println(p+"  "+q);
   }
  }
 }
}