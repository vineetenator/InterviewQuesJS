/*
	Given a string, the task is to count all palindrome substring in a given 
	 string. Length of palindrome substring is greater then or equal to 2.
*/
#include <iostream>
#include <cstring>
#include <map>
using namespace std;

int countPalindromeSubStrings(char str[], int n){
	map<char, int> hashmap;
	int foundSofar = 0;
	bool T[n][n];
	memset(T, false , sizeof(T));
	
	// len = 1
	for(int i = 0; i < n; i++){
		T[i][i] = true;	
	}
	
	// len = 2
	for(int i = 0; i < n-1; i++){
		if(str[i] == str[i+1]){
			T[i][i+1] = true;
			foundSofar++;
			cout<<"[i, j] = ["<<i<<", "<<i+1<<"]\n";
		}
	}
	
	// len >=3
	// len = last index for the string when we starts from starting = 3-1 =2
	for(int len = 2; len < n; len++){
		for(int i = 0; i < n - len; i++){
			int j = len + i; // index of last elem
			//T[i+1][j-1] will tell whether str in between i & j is palindrome or not
			if(str[i] == str[j] && T[i+1][j-1]){
				T[i][j] = true;
				foundSofar++;	
				cout<<"[i, j] = ["<<i<<", "<<j<<"]\n";			
			}
		}
	}
	
	return foundSofar;
}

int main (){
	char tc1[] = "abaab";
	char tc2[] = "abbaeae";
	char tc3[] = "abaaa";
	char tc4[] = "geek";
	char tc5[] = "abcdedcba";
	cout<<endl<<"palindrome substring greater then or equal to 2"<<endl;
	cout<<tc1<<" = "<<countPalindromeSubStrings(tc1, 5)<<endl<<endl;
	cout<<tc2<<" = "<<countPalindromeSubStrings(tc2, 7)<<endl<<endl;
	cout<<tc3<<" = "<<countPalindromeSubStrings(tc3, 5)<<endl<<endl;
	cout<<tc4<<" = "<<countPalindromeSubStrings(tc4, 4)<<endl<<endl;
	cout<<tc5<<" = "<<countPalindromeSubStrings(tc5, 9)<<endl<<endl;
	
	cin.get();
	return 0;
}
