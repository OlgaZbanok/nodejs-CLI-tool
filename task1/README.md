## Task 1. Caesar cipher CLI tool
Follow steps below to see result:
1. download repository
2. in console write `npm install`, then `cd task1`
3. to run tool write `node index`  with arguments:
-  *-s, --shift*: a shift value (number) (required)    
-  *-a, --action*: an action encode/decode (required)    
-  *-i, --input*: an input file 
-  *-o, --output*: an output file

## Examples of usage

    node index --action encode --shift 7 --input input.txt --output output.txt
    node index -a encode -s 7 -i input.txt -o output.txt
    node index --action decode --shift 10