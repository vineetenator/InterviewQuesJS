#include <iostream>
using namespace std;


class wtQuickUnion{
	private:
		int *id, *sz;
		int len;
	public:
		wtQuickUnion(int N){
            len = N;
			id = new int[N];
			sz = new int[N];
			for(int i = 0; i < len; i++){
				id[i] = i;
				sz[i] = 1;
			}
		};
		void unionNodes(int p, int q){
			 int i = root(p);
             int j = root(q);
             if(sz[i] < sz[j]){
		  	     id[i] = j;
    			 sz[j] += sz[i];
	   		 }else{
	   		     id[j] = i;
	   		     sz[i] += sz[j];
	         }
		};
		
		bool connected(int p, int q){
			return root(p) == root(q); 
		};
		int root(int p){
            while(id[p] != p){						
                p = id[p];                       
            }
            return p;
        };
};
int main(){
	int N;
	char y;
	cout<<"Enter Number of Nodes: ";
	cin>>N;
	wtQuickUnion uf(N);
	do{
		int p,q;
		cout<<"Enter nodes to be connected\n";
		cin>> p >> q;
		
		if(!uf.connected(p,q)){
			uf.unionNodes(p, q);
			cout<<p<<"  "<<q<<endl;
		}
		cout<<"want to connect more nodes? ";
		cin>>y;
	}while(y=='y'|| y=='Y');
	cin.ignore();
	return 0;
}
