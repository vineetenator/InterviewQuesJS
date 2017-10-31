/*
 Given an array of integers and a target number. Find out the count of all 
 subsets such that the sum of all the numbers in the subset is equal to a target number 
 
Ex:
	 Input: [1 2 3 4 5]
	 Target: 5
Sol:	 
	 Count: 3
	 Subsets are [ [ 1,4 ] , [2,3] , [5] ]

*/


#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>
void sort(int size, int* arr){
	for(int i = 0; i < size; i++){
        for(int j = 0; j< size; j++){
            if(arr[i] < arr[j]){
                int t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }
    }
}
int subsetToTarget(int size, int* arr,int target)
{
    int count = 0;
    sort(size, arr);
    
    for(int i = 0; i < size; i++){
    
        //printf("%d ", arr[i]);
    }
    return count;
}


int main() {
    int output = 0;
    int ip1_size = 0;
    int ip1_i;
    //scanf("%d\n", &ip1_size);
    int ip1[ip1_size] = {1, 2, 3, 4, 5};
    //for(ip1_i = 0; ip1_i < ip1_size; ip1_i++) {
//        int ip1_item;
//        scanf("%d", &ip1_item);
//        
//        ip1[ip1_i] = ip1_item;
//    }
    int ip2 = 5;
    //scanf("%d", &ip2);
    output = subsetToTarget(ip1_size,ip1,ip2);
    printf("%d\n", output);
    
    getchar();
    return 0;
}
