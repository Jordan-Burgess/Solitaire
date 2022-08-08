# Solitaire

Solitaire

Set Up (Game Board)
- Create 52 instances of unique cards with {suit, rank, face-up/face-down, selected} and save them in a main deck instance
- All main deck cards are set to face-down
- Each face-up card will be represented by a div and have a background image.
- Main Deck is displayed as the back of card
- Create game board with 7 columns (arrays) each with one card from deck. Columns 2 through 7 are face down.
- Create 4 empty columns for sorted suits

Main Deck Rotation (User clicks on main deck)
- Create empty deck for face-up cards
- If user clicks on main deck the last card is popped from main deck and pushed to the front of face-up deck (face-up array)
- Top card of Face-up Deck is always shown 
- When main deck is empty, if user clicks on main deck again, place all cards from face-up array back in main deck array.

Moving Cards 
- If user clicks on a face-up card it will be marked as selected and if clicked on same card it will be marked as unselected. Only one card can be selected at a time. Only face-up cards from the board or first of face-up deck can be selected.
- The selected card will be moved to an individual array. 
- If user has a selected card and clicks on another column, that card and all ones after it will be moved to that column if it meets the matching condition. 

Matching Conditions
- A selected card can only be placed if it has the following conditions for board columns
    - Diamond/Heart Suits can only be placed on Spades/Clubs Suits and vice versa.
    - The rank is one below the above rank
- A selected card can only be placed in the sorted decks if it is the same suit and one rank above the below rank.



Additional features to implement after main game design.

- Draw 3 cards
- Auto Win when all cards on game board are face-up
- Undo Button
- Timer
- Settings to choose from different card back styles
