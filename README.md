# Transformers

The goal of this project is to write a function in JavaScript to solve the problem
described bellow:

## Problem

Given a set of **Transformers** in a confrontation (see Instructions to Run),
and, based on **Tech Spec** of each of them (see Tech Spec),
this program should compute the number battles (see Rules) between **Autobots**
and **Decepticons** that happen in such confrontation, the winner team and also
should display the survivors of the losing team.

### Tech Spec

Each transformer contains the following attributes
(all of them are ranked from **1 to 10**):

- Strength
- Intelligence
- Speed
- Endurance
- Rank
- Courage
- Firepower
- Skill

**Overall Rating = (Strength + Intelligence + Speed + Endurance + Firepower)**

A transformer can be either an **Autobot (A)** or a **Decepticon (D)**.

### Rules

The teams should be sorted by rank and faced off one on one against each other in order to determine a victor, the loser is eliminated

- A battle between opponents uses the following rules:
  - If any fighter is down 4 or more points of courage and 3 or more points of strength compared to their opponent, the opponent automatically wins the face-off regardless of overall rating (opponent has ran away)
  - Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win the fight regardless of overall rating
  - The winner is the Transformer with the highest overall rating

- In the event of a tie, both Transformers are considered destroyed

- Any Transformers who don’t have a fight are skipped (i.e. if it’s a team of 2 vs. a team of 1, there’s only going to be one battle)

- The team who eliminated the largest number of the opposing team is the winner

**Special rules:**

- Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
any other criteria

- In the event either of the above face each other (or a duplicate of each other), the game
immediately ends with all competitors destroyed

**Assumptions:**

In case of a battle between Optimus Prime and Predaking, the third line of the output, instead of displaying the surviving members of the losing team, displays 'No one survived'.

In case of equal number of participants in the two teams, the third line of the output, instead of displaying the surviving members of the losing team, displays 'No losing team'.

In case no one of the losing team survived, displays:
  Survivors from the losing team (<Losing Team>): No one

In case of a draw:
  - The second line of the output, instead of displaying the winning team, displays 'Draw'
  - The third line of the output, instead of displaying the surviving members of the **losing team**, displays the surviving members.

Based on the following rule 'The team who eliminated the largest number of the opposing team is the winner'
  - If after all battles the the number of eliminated for both teams are equal, then the war ends in a draw even if there is a team with more members. For instance: if it's a team of 2 vs. a team of 1 and the first and only battle ends in a draw, then, the war ends in a draw.

Both the winning team and the remaining of the losing team are displayed in order of their rank, not necessarily in the order they were inserted.

## Instructions to Install

Run the command:
```
npm install
```

## Instructions to Run

Inside the project's folder, run the command:

```
node dist < [file name]
```

Where `filename` is the name of a **text** file following this standard:
The file should contain text encoded in **UTF8**, and each line should represent
a transformer. It doesn't matter the number of lines in the file (however,
this program wasn't tested with big files).

Each line should follow this standard:
<transformer name>: <Team Letter>, <strength>, <intelligence>, <speed>, <endurance>, <rank>, <courage>, <firepower>, <skill>

Example of an `input file`:
```
Soundwave, D, 8,9,2,6,7,5,6,10
Bluestreak, A, 6,6,7,9,5,2,9,7
Hubcap: A, 4,4,4,4,4,4,4,4
```

Expected **output**:
```
1 battle
Winning team (Decepticons): Soundwave
Survivors from the losing team (Autobots): Hubcap
```

## Instructions to Test

Run the tests with the command:
```
npm test
```

## Technical Description

This project uses Mocha for automated tests, and, it uses Babel to transpile Javascript from ES6 to ES5.

## Project Creation Steps

This project followed the same standard from **Peaks and Valleys**.
Refer to it for the details of creations: https://github.com/glandre/peaks-and-valleys

## REFERENCES

- Mocha JS
  - Getting started: https://mochajs.org/
- Babel
  - Setup: http://babeljs.io/docs/setup/#installation
  - Testing in ES6 (ES2015) with Mocha and Babel: http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/
