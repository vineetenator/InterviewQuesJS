#include <math.h>
#include <stdio.h>
#include <string>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>
#include <vector>
using namespace std;

bool isOpenDelimiter(const char c){
	return 	c == '(' ||
			c == '{' ||
			c == '[';
}
bool isCloseDelimiter(const char c){
	return 	c == ')' ||
			c == '}' ||
			c == ']';
}

bool isDelimiter(const char c){
	return isOpenDelimiter(c) || isCloseDelimiter(c);
}

bool isEscapeChar(const char first, const char second){
	return isDelimiter(first) && ( first == second );
}

vector<string> getTokenedStr(string str){
	vector<string> vStr;
	for(int i = 0; i < str.size(); i++){
		if(str
	}	
	
	return vStr;
}

char** separatersInString(char* str,int* output_size){
    vector<string> result = getTokenedStr(string(str));
    *output_size = result.size();
    char** outStr = new char* [result.size()];
    for(int i = 0; i < result.size(); i++){
		outStr[i] = new char [result[i].size() +1];
		memcpy(outStr[i],result[i].c_str(), result[i].size()+1);
	}
	
	return outStr;
}



// Don't modify Main.
int main() {
    int output_size;
    char** output;

    char* ip1 = "abc(edf)hij{klmn}opq[rst]uvw";
    char* ip2 = "abc(e))df)";
    output = separatersInString(ip1,&output_size);
    int output_i;
    for(output_i=0; output_i < output_size; output_i++) {
    
        printf("%s\n", output[output_i]);
        
    }
    
    getchar();
    return 0;
}
