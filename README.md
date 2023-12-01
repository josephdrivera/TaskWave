# TaskWave - Electron To-Do List Application

## Description
TaskWave is a simple yet powerful to-do list application built with Electron. It allows users to manage their daily tasks efficiently with a user-friendly interface. The application now uses local storage to ensure your tasks are saved directly on your machine, providing fast and reliable access to your data.

## Installation
To install TaskWave, follow these steps:
1. Clone the repository: `https://github.com/josephdrivera/TaskWave.git`
2. Navigate to the project directory: `cd taskwave`
3. Install dependencies: `npm install`
4. Run the application: `npm start`

## Usage
After launching TaskWave, you can:
- Add new tasks using the 'Add Task' button.
- View a list of all added tasks.
- Tasks are automatically saved to your local storage, ensuring they persist across application restarts.

## Features
- Easy-to-use interface.
- Add tasks with a simple click.
- Tasks are stored locally using `localStorage`, allowing for quick access and persistence.
- A clean and minimalistic design, focusing on usability.

## Contributing
Contributions to TaskWave are welcome! If you have ideas for improvements or have found a bug, please open an issue or submit a pull request. Please read our contributing guidelines for more information.

## Local Storage Information
- TaskWave now uses the browser's local storage to save tasks.
- This change enhances the application's performance and reliability by eliminating the need for external database dependencies.
- Please note that local storage is limited in capacity, and the data stored is only accessible on the machine where it was created.
