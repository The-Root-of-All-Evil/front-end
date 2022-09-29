# Love Letter Helper

## Deployed site

[Love Letter Helper Page](https://love-letter-helper.netlify.app/)

## Authors

Rhea Carillo, Amy Pierce, Jackson Gurney

## Overview

Our project will allow a user to compose a love letter and save it by title and recipient, it will evaluate the letter for positive or negative sentiment using an external API and return a score. It will then allow the recipient to edit the letter and re-score it, or delete the letter.
This project offers would-be Romeos and Juliets a secure place to compose and store love letters. It also gives writers who are uncertain of their skills some measure of how the object of their affection might receive their missive. Suitors may save letters, edit them, and rescore the edited version, or delete them.

## Wireframes

![Login Page](./project_prep/images/login.png?raw=true "Login Page")
![Compose A Letter](./project_prep/images/love-letter-compose.png?raw=true "Compose A Letter")
![View Saved and Edit Letters](./project_prep/images/love-letter-edit.png?raw=true "View Saved and Edit Letters")
![About Us](./project_prep/images/about-us.png?raw=true "About Us")
[Trello Board for this project](https://trello.com/b/mJsJb1sX/love-letter-helper)

## User Stories

User Stories

 As a User I want to make sure that no one can access my love letters:
 Feature Task(s)
Add an Auth0 - log in to the website that ensures users can only see their own letters.  
 Acceptance Test(s)
Ensure that no letters can be accessed without logging in first
Ensure that log in only allows the user to see the letters they created
Ensure that no logged in user can access the letters of other users
 Difficulty: Large

As a User I want to compose a love letter.
 Feature Task(s)
  
Enter a title
Enter a recipient name
Enter Letter Text
Save Letter
 Acceptance Test(s):
Ensure that the user can enter a title
Ensure that the user can enter a recipient
Ensure that the user can enter letter text
Ensure that the title, recipient and letter text are all saved in separate fields in a database.
 Difficulty: Large

As a User I want to be able to look at letters I have written
 Feature Task(s):
Click on a recipients name to view letters saved under that recipient
Click on a Letter title to see the text of that letter.
 Acceptance Test(s)
Ensure that the user will be able to view saved letters sorted by each recipient
Ensure that the user can click on saved letters and view the contents.
 Difficulty: Large

As a User I want to be able to edit a previously saved letter.
 Feature Task(s)
Click on an edit button to be able to edit the text of the letter.
Click save to save the newly edited version of the letter.
 Acceptance Test(s)
Ensure that the user can access the saved letter for editing.
Ensure that the user can change the title, recipient and letter text.
Ensure that the edited letter is properly saved under correct unique ID.
 Difficulty: Small

 As a User I want to score my letters to determine how they will be received:
 Feature Task(s)
At any time while writing or editing, the user can click a button to receive a score for their letter
The score will be saved with the letter.

 Acceptance Test(s)

Ensure that when a user clicks the button, the text of their letter is scored via sending the text to an external API, and a response is returned and displayed.
Ensure that the response is stored with the letter in a database.
Ensure that subsequent score requests are displayed and saved appropriately.
 Difficulty: Large
As a User I want to delete letters I no longer want.

 Feature Task(s):
Click on an edit button to be able to edit the text of the letter.
Be given a warning that the letter will be gone forever and choose to proceed
Click save to save the newly edited version of the letter.
 Acceptance Test(s)
Ensure that the user can access the saved letter to delete.
Ensure that the user is given a warning before the letter is deleted.
Ensure that the user can choose not to delete the letter
Ensure that the deleted letter is removed from the database and the page is re-rendered without that letter.
 Difficulty: Medium

![UML](./project_prep/images/uml.png?raw=true "UML")
![Schema and Constructors](./project_prep/images/scema_constructor.excalidraw.png?raw=true "Schema and Constructors")
