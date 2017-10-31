#ifndef _UTILS_H_
#define _UTILS_H_

#include<iostream>
using namespace std;

void printArray(int *A, int size, char* msg = NULL){
	if(msg)
		std::cout<<msg<<endl;
    for (int i=0; i < size; i++)
        std::cout<<A[i]<<"  ";
	cout<<endl;
}

#endif
