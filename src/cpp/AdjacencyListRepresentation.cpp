/*
 * Adjacency List:
   An array of linked lists is used. Size of the array is equal to number of vertices.
   Below is the code for adjacency list representation of an undirected graph
 * Pros: Saves space O(|V|+|E|) . In the worst case, there can be C(V, 2) number of edges 
	in a graph thus consuming O(V^2) space. Adding a vertex is easier.
 * Cons: Queries like whether there is an edge from vertex u to vertex v are not efficient 
	and can be done O(V).
*/

#include <isotream>
using namespace std;

// A structure to represent an adjacency list node
// A structure to represent an adjacency list



// A utility function that creates a graph of V vertices
struct Graph* createGraph(int V)
{
	
}

// A utility function to print the adjacenncy list representation of graph
void printGraph(struct Graph* graph)
{
}


// Driver program to test above functions
int main()
{
    // create the graph given in above figure
    int V = 5;
    struct Graph* graph = createGraph(V);
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 4);
    addEdge(graph, 1, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 3);
    addEdge(graph, 3, 4);
 
    // print the adjacency list representation of the above graph
    printGraph(graph);
 
    return 0;
}