#include<iostream>
#include <typeinfo>
#include <algorithm>
#include <cmath>
using namespace std;
#define wc 	" "

void bubbleSort(int arr[], int n); // O(n*n)
void insertionSort(int arr[], int n); // O(n*n)

int main(){
	//int arr[] = {12, 11, 13, 5, 6};
	int arr[] = {9, 7, 6,6, 15, 16, 5, 10, 11,16};
	int n = sizeof(arr)/ sizeof(arr[0]);
	cout<<"\nUnsorted: \t";
	for(int i = 0; i < n; i++)
		cout<<arr[i]<<wc;
	//bubbleSort(arr, n);
	insertionSort(arr, n);
 
	for(int i = 0; i < n; i++)
		cout<<arr[i]<<wc;
	
	cout<<endl<<"END"<<endl;
	cin.get();
	return 0;
}
void insertionSort(int arr[], int n){
	for(int i = 1; i < n; i++){
		int j = i-1, key = arr[i];
		while(arr[j] > key && j >= 0){
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = key;
	}
	
	cout<<"\nInsertion: \t";	
}

void bubbleSort(int arr[], int n){
	for(int i = 0; i < n-1; i++){
		for(int j = i+1; j < n; j++){
			if(arr[i] > arr[j]){
				swap(arr[i], arr[j]);
			}
		}
	}
	
	cout<<"\nBubble Sorted: \t";	
}

