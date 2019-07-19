Device a plan for solving problems
master common solving patterns

1) Understand the problem
2) Explore concrete examples
3) Break it down
4) Solve/ simplify
5) Look back and refactor

// 1 - Understand the problem - How to solve it book by George Polya

a) can I restate the problem in my own words
b) what are the inputs that go to problem
c) what are the outputs that should come from the solution to the problem?
d) can the outputs be determined from the inputs / Do I have enough information to solve the problem
e) how should I label the important pieces of data that are a part of the problem

Eg: Write a function which takes two numbers and returns their sums

a) can I restate the problem in my own words
implement addition

b) what are the inputs that go to problem
integers/ float/ really large numbers(languages has some boundaries)

c) what are the outputs that should come from the solution to the problem?
int?/float? string?

d) can the outputs be determined from the inputs / Do I have enough information to solve the problem

e) how should I label the important pieces of data that are a part of the problem



// 2 - Explore concrete examples
- sanity checks with few examples
- start with simple examples
- progress to more complex examples
- empty inputs
- invalid inputs

eg: - Write a function whihc takes in a string and returns counts of each charecter in the string
- start with simple examples
charCount('aaaa'); // {a: 4}
charCount('hello'); // {h:1, e:1, l:2, o;1}

- progress to more complex examples
charCount("my phone numbers is  182763") // str & num combo
charCount("Hello hi") // case type
charCount("Hello hi !!") // special charecters

- empty inputs
charCount('')

- invalid inputs
charCount(null)
charCount({a: apple})
charCount(function(w){ return 3;})


// 3 - Break it down
Explicitly write out the steps you need to take
