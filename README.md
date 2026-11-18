https://github.com/ST10467527/ChristoffelsMenuApp.git
Youtube video
https://youtu.be/eA21Y7jojJY
8. Updates
This section records the changes made while developing the Christoffel's Menu App after the Part 1 & 2 planning document was prepared. Part 1 remains the original planning evidence; the points below describe the implementation and refinements made to the working application.
Application setup and structure
•	The application was created as a React Native project using Expo and TypeScript. The project is organised into separate screens and shared constants, including HomeScreen.tsx, AddDishScreen.tsx, App.tsx, constants/colors.ts and constants/typography.ts.
•	The app now has a working Home Screen and Add Dish screen, with navigation between the screens managed in App.tsx.
Menu data and course categories
•	The app now starts with 30 sample dishes so that the menu can be viewed and tested immediately.
•	The sample menu is organised into four course categories: Starter, Main Course, Dessert and Beverage.
•	Each dish stores its name, description, course, price and availability status. Prices are displayed in South African rand.
Home Screen improvements
•	The Home Screen has been developed into a menu dashboard with a menu overview and a list of dishes.
•	Search and filtering have been added so that dishes can be found by name and narrowed down by course or availability.
•	Dish cards provide an edit action so that an existing menu item can be updated.
•	The empty-menu state and the no-search-results state are handled separately. The empty-menu state encourages the user to add the first dish, while the filtered-results state explains that no dishes match the current search or filters.
Adding and editing dishes
•	The Add Dish screen supports both creating a new dish and editing an existing dish.
•	The form captures the dish name, description, course, price and availability.
•	Course selection is restricted to the predefined options: Starter, Main Course, Dessert and Beverage.
•	Validation has been added for required fields, maximum text lengths, valid course selections and prices.
•	The price field accepts a decimal point or comma, allows up to two decimal places, must be greater than zero and cannot exceed R1,000,000.
•	Validation feedback is shown beside the relevant fields rather than displaying multiple error alerts.
•	After a dish is saved, a success message identifies the saved dish and the app returns to the Home Screen.
Visual design and shared styling
•	The visual theme uses a cream, burgundy and gold colour palette to create a consistent restaurant-style interface.
•	The shared colour constants in constants/colors.ts are cream (#FAF6ED), burgundy (#5A1718), gold (#D4B16A), white (#FFFFFF), black (#1A1A1A), muted text (#817A70), border (#E5DCCB), error (#B42318) and success (#287D46).
•	A shared typography file, constants/typography.ts, defines consistent styles for screen titles, section titles, body text, subtitles, labels, prices and buttons.
Code and interface refinements
•	The Home Screen component was simplified to focus on displaying the menu, adding a dish and editing a dish.
•	The separate remove and availability-toggle actions were removed from the Home Screen interface to keep the dish cards focused on the core tasks.
•	The App.tsx screen connection was updated to pass the Home Screen only the properties it now needs: the dish list, the add-dish action and the edit-dish action.
Current development focus
The current implementation provides a working foundation for viewing, searching, filtering, adding and editing menu items. Further testing should confirm that all form validation rules, navigation paths, search and filter combinations, and the display of updated menu information work correctly on the target device.
