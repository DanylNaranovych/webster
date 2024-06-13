# Webster Frontend Docs

## Short Description

This project is a photo editor built using React and Redux. The application allows users to upload images, apply various filters and adjustments, and save the edited images. The editor provides a user-friendly interface with real-time preview and a range of customization options. The main goal is to offer an easy-to-use yet powerful tool for basic photo editing tasks.

## Sccreenshots

![Screenshot](https://i.ibb.co/pfK6YyQ/2024-06-13-15-46-42.png)

## Requirements and Dependencies

To build and run this project, you need to have the following installed on your machine:

-   **Node.js**: Version 12.x or higher
-   **npm**: Version 6.x or higher (comes with Node.js)
-   **React**: ^17.0.0
-   **Redux**: ^4.0.0
-   **React-Redux**: ^7.0.0
-   **Other dependencies**: Listed in `package.json`

## Describe the steps from cloning your repository to the first launch

1. **Clone the repository:**
   git clone https://github.com/DanylNaranovych/webster/tree/main/frontend

2. **Navigate to the project directory:**
   cd photo-editor

3. **Install dependencies:**
   npm install

4. **Start the development server:**
   npm start

5. **Open your browser:**
   Navigate to 127.0.0.1:3000

# Full-Fledged Documentation

## The project follows a structured organization to maintain clarity and ease of navigation. Key directories include:

-   src/components: Contains reusable React components for building the user interface.

-   src/styles: Includes global styles and theme configurations for consistent styling across the application.

-   src/http: This directory contains modules and utilities related to handling HTTP requests. It typically includes files for API interaction, such as functions for sending requests (using libraries like Axios or Fetch), processing server responses, managing authentication, and intercepting errors. It may also house client request configurations and interceptor setups.

-   src/services: In this directory, you'll find service layers or business logic. Files here handle tasks such as API interaction, data processing before passing it to components, state management, and executing business logic. Services may include methods for CRUD operations, data transformations, or integration with external services.

-   src/store: The store directory is used for centralized state management, often with libraries like Redux or Vuex. It contains files related to state actions, reducers for updating state based on actions, selectors for accessing state data, and middleware for asynchronous logic like API calls or logging.

-   src/utils: This directory stores utility functions and helper modules that provide common functionalities throughout the application. Utilities may include functions for date formatting, string manipulation, validation helpers, or any other reusable functions used across different parts of the codebase.

-   public: Contains static assets such as images and favicon.

## Progress After Each Completed CBL Stage

-   Conceptualization: Defined the core features including image loading, editing tools, and exporting capabilities.

-   Design: Created a modular architecture allowing for easy integration of new features and enhancements. Designed the user interface for intuitive interaction.

-   Implementation: Developed the image processing algorithms for color correction, filters, and retouching. Implemented the UI components and backend logic for seamless operation.

## Description of the Algorithm of the Whole Program

The photo editor operates through the following key algorithms:

-   Image Loading: Handles loading images from various file formats while maintaining data integrity and quality.

-   Editing Algorithms: Implement editing algorithms that enable resizing images while maintaining aspect ratios, drawing shapes, adding text using pencil and brush tools with adjustable sizes, modifying text and shape dimensions, changing colors, and moving elements within the image.

-   Saving and Exporting: Allows users to save edited images in multiple formats (JPEG, PNG, TIFF) with customizable compression settings.

-   User Interface Management: Manages the user interaction flow, providing intuitive controls for accessing editing tools and viewing real-time previews of changes.
