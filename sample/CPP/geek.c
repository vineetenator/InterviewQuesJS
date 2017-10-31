#include<stdio.h>

void argument_alignment_check( char c1, char c2 )
{
// Considering downward stack
// (on upward stack the output will be negative)
printf("Displacement %d\n", (int)&c2 - (int)&c1);
}

int main()
{
	int arr[4];
	void *p1,*p2;
	p1 = p2 = arr;p2++;
	printf("%lu\n", p2-p1);
	double *i1 = (double*)malloc(12);
	printf("%lu\n", sizeof(*i1));
	printf("%lu\n", sizeof(i1));
	char c1, c2;
	argument_alignment_check(c1,c2);
	getchar();
	return 0;
} 



