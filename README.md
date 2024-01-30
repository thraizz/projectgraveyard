# Project Graveyard

Welcome to the Project Graveyard, a platform where developers can showcase their old, dropped side projects. Users can post projects with text and images, upvote other projects, and engage in discussions through comments.

## Technologies Used

- **Vue 3:** The front-end of the application is built using Vue 3, providing a reactive and component-based user interface. Also uses vue-router for routing.

- **Firebase:** Firebase is used as the backend for authentication, data storage, and real-time updates.

- **Tailwind CSS:** The application is styled using Tailwind CSS, providing a utility-first approach for designing modern and responsive user interfaces.

- **Headless UI:** Components from Headless UI are leveraged to build accessible and customizable UI elements without enforcing any styling, allowing for seamless integration with Tailwind CSS.

## Features

- **User Authentication:** Users can sign up, log in, and securely authenticate through Firebase.

- **Project Showcase:** Developers can showcase their side projects by posting detailed descriptions, images, and tags.

- **Upvoting System:** Users can upvote their favorite projects, and projects are ranked based on upvotes.

- **Comments:** Engage in discussions with other users by leaving comments on showcased projects.

- **Search and Filtering:** Easily find projects using tags or search for specific titles.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/thraizz/projectgraveyard.git
   cd projectgraveyard
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Set up a Firebase project and obtain the necessary configuration details.
   - Update the Firebase configuration in `src/firebase.ts`.

4. **Run the Application:**

   ```bash
   npm run dev
   ```

5. **Start the firebase emulators:**

   ```bash
   npm run emulators
   ```

   This will start the Firebase emulators for Authentication, Firestore, and Functions. The data will contain some demo projects/users/comments.
   It also contains a user with the email `test@example.com` and the password `Test123!` for testing purposes.

6. **Visit the Application:**
   Open your browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
