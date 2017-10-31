#include <iostream>
#include <cmath>
using namespace std;

bool xy(unsigned num){
    unsigned m = (unsigned)sqrt(num);
    unsigned x = 2, n = num;
    bool is = false;
    while(n > 1 && x <= m){
        if(n%x != 0){
            x++;
            is = false;
            n = num;
        }else{
            n /= x;
            is = true;
        }
    }

    return is;
}
int main() {
	//code
	cout<<xy(4)<<endl;
	cout<<xy(8)<<endl;
	cout<<xy(10)<<endl;
	cout<<xy(14)<<endl;
	cout<<xy(36)<<endl;
	cout<<xy(81)<<endl;
	cout<<xy(314432)<<endl;
	cout<<xy(46656)<<endl;
	cout<<xy(15552)<<endl;
	cout<<xy(72)<<endl;
	    float a = 2, b = 2.0, c = 34.232;
 
 	if(a == (float)(int)a){cout<<"a is int. ";}
	if(b == (float)(int)b){cout<<"b is int. ";}
	if(c == (float)(int)c){cout<<"c is int. \n";}
	cin.get();
	return 0;
}
