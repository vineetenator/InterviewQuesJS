#include<iostream>
#include <typeinfo>
#include <algorithm>
#include <cmath>
using namespace std;
#define wc 	" "

void bubbleSort(int arr[], int n);
void insertionSort(int arr[], int n);

int main(){
	//int arr[] = {12, 11, 13, 5, 6};
	int arr[] = {9, 7, 6, 15, 16, 5, 10, 11};
	int n = sizeof(arr)/ sizeof(arr[0]);
	cout<<"\nUnsorted: \t";
	for(int i = 0; i < n; i++)
		cout<<arr[i]<<wc;
	bubbleSort(arr, n);
	
 
	for(int i = 0; i < n; i++)
		cout<<arr[i]<<wc;
	
	cin.get();
	return 0;
}
void insertionSort(int arr[], int n){
	
}

void bubbleSort(int arr[], int n){
	for(int i = 0; i < n; i++){
		for(int j = i+1; j < n; j++){
			if(arr[i]>arr[j]){
				int temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	
	cout<<"\nBubble Sorted: \t";	
}
