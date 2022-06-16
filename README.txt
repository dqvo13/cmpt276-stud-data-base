An interactive student database made for Assignment 2 of CMPT 276, Summer 2022.
App deployed by Heroku, which uses PostgreSQL for database management. 
Built using HTML, CSS, Javascript, with Bootstrap and NodeJS frameworks. 

Access the Heroku app at stud-data-base.herokuapp.com
For SFU students and staff, source code at https://csil-git1.cs.surrey.sfu.ca/dva11/cmpt276-stud-data-base

Features include:
- homepage:
    - displays all students in table form
    - add a student
    - edit a student
        - opens side menu pre-filled with student info
        - reset fields to values of original student
        - update student, changes reflected in table
    - delete a student
    - all changes reflected here after completing action
- add page:
    - add student with relevant student info
    - reset button clears input fields
- boxpage: 
    - view students in box form
    - size of boxes is relative to student height + weight
    - click on boxes to edit/delete respective students
- edit menu:
    - consistent on homepage + boxpage
    - shown as side menu that slides in from the right side of the screen
    - contains input fields for editing student info, as well as reset button
        - on boxpage, editing menu also contains delete button