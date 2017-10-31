#include "utils.h"

void merge(int a[], int l, int m, int r);

void mergeSort(int a[], int l, int r){
	int m = (l+r)/2;
	if(l<r){
		int m = (l+r)/2;
		mergeSort(a, l, m);
		mergeSort(a, m+1, r);
		
		merge(a, l, m, r);		
	}
}
void merge(int a[], int l, int m, int r){
	int n1 = m-l+1,
		n2 = r-m,
		L[n1],
		R[n2];
		
	// copy L & R
	for(int i = 0; i < n1; i++)
		L[i] = a[l+i];
	for(int i = 0; i < n2; i++)
		R[i] = a[m+1+i];
		
	int i = 0, 
		j = 0, 
		k = l;
	while(i < n1 && j < n2){
		if(L[i] < R[j]){
			a[k] = L[i];
			i++;
		}else{
			a[k] = R[j];
			j++;
		}
		k++;
	}
	
	while(i < n1){
		a[k] = L[i];
		i++;
		k++;
	}
		
	while(j < n2){
		a[k] = R[j];
		j++;
		k++;
	}
}

int main(){
    int c[] = {2,7,90, 342,234, 4, 76, 990, 22},
		a[] = {8,9,10,12,600, 811},
    	b[] = {2, 5, 61, 301, 919, 3};
    int size = sizeof(c)/sizeof(int);
		
	printArray(c, size, "before Sort");
	mergeSort(c, 0, size);
    //int* output = megre(a, b, aLen, bLen);
    
    printArray(c, size, "After Sort");
    getchar();
    return 0;
}
