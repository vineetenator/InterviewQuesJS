#include "utils.h"
#include <vector>
#include <string>
using namespace std;

bool isDelimiter(const char ch){
	if(ch == '{' || ch == '}' || ch == '(' || ch == ')' || ch == '[' || ch == ']'){
		return true;
	}
	return false;
}
bool isEscape(const char ch, const char ch2){
	if(isDelimiter(ch)&& ch == ch2){
		return true;
	}
	return false;
}
char* split(char *str)
{
    char *pch = str;
    char temp[10];
    char *r = temp;
	while(*pch){  
		if(!isDelimiter(*pch)){
			*r = *pch;
			r++;
			pch++;
		}else{
			//char* r = new char[pch-str+1];
			pch++;
			if(isEscape(*pch, *(pch-1))){
				*r = *pch;
				r++;
				pch++;
			}else{					
				break;
			}
		}
	} 
	*r= '\0';
	cout<<temp<<endl;
	return (*pch)? pch : NULL;
}

int main(){
	char str[] ="abc((edf)hij{klmn}}opq[rst]uvw";
	char str2[] = "abc(e))df)";
	char keys[] = "({[]})";
	char *x = split(str2);
	while(x != NULL){
		x = split(x);                   
	}
    getchar();
    return 0;
}
