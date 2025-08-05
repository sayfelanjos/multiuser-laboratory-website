# Multiuser Laboratory Website

The Multiuser Laboratory Website is a project developed by Unicamp students in collaboration with the administration of the Faculty of Mechanical Engineering at Unicamp ([Faculdade de Engenharia Elétrica - FEM](https://www.fem.unicamp.br/)). Its goal is to provide an online platform for organizing and scheduling mechanical tests conducted in FEM laboratories.

Previously, the FEM laboratories had no dedicated website, and their usage was largely unregulated. This platform marks a significant advancement for the Faculty of Mechanical Engineering at Unicamp — benefiting students, professors, and collaborators alike. It also helps protect the laboratories' physical assets by enabling documented and traceable usage of equipment.

The project is currently under development and initially supports only the LMU Laboratory. However, it is actively being expanded to cover all FEM laboratories.

## How to Set Up the Project Locally

| <h3>[**Installations and Machine Setup**](#Installations)</h3> |
| -------------------------------------------------------------- |
| [Install a code editor](#codeeditor)                           |
| [Install Node.js and NPM](#nodejs)                             |
| [Install Git](#git)                                            |
| [Git Configuration](#gitconfig)                                |
| [Create a SSH-Key](#sshkey)                                    |
| [Install the Java SDK](#java-jdk)                              |
| [Get the Firebase Permissions](#permissions)                   |
| [Install the firebase-tools](#firebase-tools)                  |

| <h3>[Local Repo Setup](#repo)</h3>        |
| ----------------------------------------- |
| [Clone the Project](#gitclone)            |
| [Add Enviroment Variables](#env-var)      |
| [Install the dependencies](#npm-install)  |
| [Run the Development Server](#dev-server) |
| [Run the Firebase Emulators](#firebase)   |

### Installations <a id="Installations"></a>

Before getting started, you’ll need a few tools installed on your local machine, as well as a GitHub account.

If you don’t already have a GitHub account, begin by creating one: [Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).

Make sure to save your **username** and **email**, as they will be used later.

Below is a list of tools you’ll need to install or set up locally. Please ensure you have each one before proceeding:

- ### Install a code editor <a id="codeeditor"></a>

  The **Visual Studio Code** (or simply **VS Code**) is a lightweight, powerful, and easy-to-use code editor.

  It's the editor used to develop this project and comes with a wide range of features right out of the box.

  While you're free to use any code editor you prefer, we suggest installing VS Code to follow along more easily.

  You can download it here and follow the installation instructions:

  [→ VS Code Download](https://code.visualstudio.com/download)

- ### Install Node.js and NPM <a id="nodejs"></a>

  Node.js and NPM are essential tools for running the project locally. Installing Node.js automatically includes NPM (Node Package Manager).

  There are two main ways to install and use Node.js and NPM: directly from Node's website or via NVM:

  - **Option 1:** Install directly from the Node.js website

    This is the most straightforward approach and comes bundled with NPM:

    [Download Node.js](https://nodejs.org/en/download)

    Search for version 20, since it is used in this project

  - **Option 2 (Recommended):** Via NVM (Node Version Manager)

    While not strictly required, NVM is a powerful tool that lets you manage multiple Node.js versions on your machine and easily switch between them.

    With a little extra setup, it provides a more flexible and professional development environment. Choose your operating system and follow the appropriate installation guide:

    - **Windows**: [nvm-windows (at github)](https://github.com/coreybutler/nvm-windows)

    > ⚠️ Note: If you already have Node.js installed, you may need to uninstall it before installing NVM.

    - **Linux or MacOS**: [nvm (at github)](https://github.com/nvm-sh/nvm)

    > 💡 **Tip:** When using NVM, each Node.js version you install includes its own dedicated NPM instance—with separate global packages and configuration settings.

    After that, run in your terminal:

    ```sh
      # current project's Node version
      nvm install 20
      nvm use 20
    ```

- ### Install Git <a id="git"></a>

  Follow the steps below based on your operating system. If you prefer a full tutorial, visit the [Git Home Page](https://git-scm.com/).

  - **macOS / Linux**

    For Mac and linux, Git is typically intalled used via the terminal. Use the appropriate commands below to install it:

    - Ubuntu:

      ```sh
      sudo apt update # Update your package list
      sudo apt install git
      ```

    - macOS (via Homebrew):

      ```sh
      brew install git
      ```

    - Verify installation:

      ```sh
      git --version
      ```

      > Example output:
      >
      > ```sh
      > # git version 2.48.1
      > ```

  - **Windows**

    On Windows, you'll need to install [Git For Windows](https://gitforwindows.org/).

    This package enables Git to work through any terminal (Command Prompt or PowerShell), and also installs [Git Bash](https://www.atlassian.com/git/tutorials/git-bash), which includes OpenSSH (needed in later steps).

    Use one of the sources below to download the installer (`.exe`), then run it:

    - [Git for Windows homepage](https://gitforwindows.org/) — This page's download button redirects you to the latest version on GitHub.
    - [Git official download page](https://git-scm.com/downloads/win) — Locate the download link and click it.

- ### Set Up your Git config <a id="gitconfig"></a>

  A Git username and email are required whenever you make a commit. These are used to identify the author of the changes in the repository.

  You can choose any name, but it’s important that the **email matches the one associated with your GitHub account**. If it doesn’t, your commits won’t be linked to your GitHub profile.

  Git allows both global and local configurations. A **local config overrides the global one** for a specific repository.

  - To set a **global** Git identity (applied to all your repositories), run:

    ```sh
    git config --global user.name "Your Name"
    ```

    ```sh
    git config --global user.email "your_email@example.com"
    ```

  - To set a **local** identity (after the [Git Clone](#gitclone) step), run the same commands **without** the `--global` flag, inside the repository folder:

    ```sh
    git config user.name "Your Name"
    ```

    ```sh
    git config user.email "your_email@example.com"
    ```

- ### Create a SSH key <a id="sshkey"></a>

  An SSH key is required to securely and easily access GitHub from your local machine — for example, when using `git push`.

  While these steps may seem a bit clunky at first, they’re part of a one-time setup and are standard practice in professional development. Luckily, GitHub provides an excellent tutorial that we highly recommend:

  👉 [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

  Also, if you find it helpful, another great tutorial is offered by Atlassian:

  👉 [Atlassian - How to create an SSH Key](https://www.atlassian.com/git/tutorials/git-ssh)

  > **Important Note**: During the process, you’ll be asked to provide an email address. Be sure to use the **same email address as your GitHub account**, or your key may not be properly linked.

  Once you've generated your SSH public key, **contact a project administrator** to have it added to the repository's access list on GitHub.

- ### Installing the Java Development Kit (JDK) <a id="java-jdk"></a>

  You will need the Java Development Kit (JDK) to use the Firebase Local Emulator Suite. Without it, you won't be able to simulate Firebase services on your machine.

  Firebase requires **JDK version 11 or higher**. We recommend one of the following options:

  - [Eclipse Temurin JDK (Recommended)](https://adoptium.net/en-GB/temurin/releases/?os=any&arch=any&version=17):

    Temurin is a free, open-source, and production-ready distribution of Java. It's the simplest option, as it doesn't require an account to download.

    On the linked page, select the JDK 17 - LTS version for your operating system and follow the installation instructions.

    > **! IMPORTANT**: During the installation process, ensure that you enable the options to **set JAVA_HOME** and **update PATH** are both enabled during installation. This allows terminal applications to find Java automatically.

  - [Official Oracle JDK](https://www.oracle.com/br/java/technologies/downloads/#java11):

    This is the official JDK from Oracle. Be aware that while it's free for development, its license for production use has some restrictions. You will also need to create a free Oracle account to download it.

  After the installation is complete, open your terminal and run the following command to verify that it was successful.

  ```sh
  java -version
  ```

  If you see your installed version number (e.g., 17.0.15), you're all set!

- ### Getting Firebase Permissions <a id="permissions"></a>

  To continue, you'll need permission to access the project on Firebase. This is required to fetch the environment variables for your `.env` file in a later step.

  If you haven't been added yet, please contact a project administrator.

  You can check if you have access by visiting the link below. If the page loads and you see your account in the "Users and permissions" list, you are good to go.

  [Firebase Console 🔥 -> Multiuser Laboratory Website -> ⚙️ Settings -> Users and permissions](https://console.firebase.google.com/u/0/project/multiuser-laboratory-website/settings/iam)

  If you can access the link and you're on list, you're good to go.

- ### Installing the firebase-tools package <a id="firebase-tools"></a>

  Next, you need to install the firebase-tools CLI (Command Line Interface). We'll install it globally, which means you only have to do this once per machine.

  Open your terminal and run this command:

  ```sh
  npm install -g firebase-tools
  ```

  Once the installation is complete, log in to Firebase with your Google account. This command will open a browser window for you to complete the process.

  ```sh
  firebase login
  ```

  > ❕ NVM Note: If you use Node Version Manager (nvm), remember that global npm packages are tied to a specific Node.js version. If you switch your Node version (e.g., `nvm use 18`), you will need to re-install `firebase-tools`.

  💡 For more information, visit the official [Firebase CLI Documentation](https://firebase.google.com/docs/cli).

---

### Local Repository Setup <a id="repo"></a>

Having the required tools ready, follow the steps below to set up the project locally:

- ### Clone the Project (Git Clone) <a id="gitclone"></a>

  [Cloning the repository with Git](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) is the easiest way to get a local copy of the project and automatically link it to the GitHub remote. Other options, like downloading a ZIP file, also work — but you'd need to manually configure the remote origin later.

  Navigate to your `Desktop` or another desired location and run one of the following commands in your terminal:

  - If you've successfully set up an SSH key:

    ```sh
    > git clone git@github.com:sayfelanjos/multiuser-laboratory-website.git
    ```

  - If you haven't set up an SSH key yet:

    ```sh
    > git clone https://github.com/sayfelanjos/multiuser-laboratory-website.git
    ```

  > **Note 1**: The clone command will automatically create a **folder** named `multiuser-laboratory-website`. You don’t need to create it manually.
  >
  > **Note 2**: Since the project is public, both **SSH** and **HTTPS** clone methods work without requiring a GitHub account or password. However, to use SSH later (e.g., for `git push`), you may need to update the remote's URL.

- ### Add the Enviroment Variables <a id="env-var"></a>

  In order to run or emulate the project locally, you'll need the correct environment variables from the Firebase Console.

  Contact an administrator and ask them to add you as a member of the project in the Firebase Console. Once added, you'll have access to the environment variables in the project settings. Click the link below to go directly to the page:

  > [Firebase Console 🔥 > Multiuser Laboratory Website > ⚙️ Settings](https://console.firebase.google.com/u/0/project/multiuser-laboratory-website/settings/general/web:ZGRhODM4MzEtY2RlMi00OWE3LWFmOWYtNmQ4NjliOThmMDg2)

  - Navigate to the root directory of the project in your terminal and create a file named `.env`:

    - windows

    ```sh
    cd multiuser-laboratory-website
    notepad ".env"
    ```

    - macOS / Linux

    ```sh
    cd multiuser-laboratory-website
    touch ".env"
    ```

  - Paste the boilerplate below inside the file, then replace the variables inside angle brackets with the actual values from the Firebase Console.

    > 👉 Tip: You can remove the helper comments after replacing the placeholders.

    ```sh
    # Paste inside the .env file:
    REACT_APP_SENDEMAIL_URL="https://localhost:5001/multiuser-laboratory-website/southamerica-east1/sendEmail"
    REACT_APP_FIREBASE_API_KEY="<apiKey (Web API Key)>" # example: "abcXYZ...123"
    REACT_APP_FIREBASE_AUTH_DOMAIN="multiuser-laboratory-website.firebaseapp.com"
    REACT_APP_FIREBASE_PROJECT_ID="multiuser-laboratory-website"
    REACT_APP_FIREBASE_STORAGE_BUCKET="multiuser-laboratory-website.appspot.com"
    REACT_APP_FIREBASE_MESSAGE_SENDER_ID="<messagingSenderId>" # example: "000000000000"
    REACT_APP_FIREBASE_APP_ID="<App ID>" # example: "1:000000000000:web:abc123def456"
    REACT_APP_FIREBASE_MEASUREMENT_ID="<measurementId>" # example: "G-XXXXXXXXXX"
    REACT_APP_FIREBASE_APP_DOMAIN="http://localhost:3000"
    ```

- ### Install the dependencies <a id="npm-install"></a>

  #### Project dependencies

  Every time you initialize a local repository, you need to install its dependencies. This project also has a second set of dependencies for Firebase emulation, located in the functions folder. Both installations may take some time, but only need to be done once.

  While in the root directory of the project, run:

  ```sh
  npm install
  ```

  If everything went right, you must be able to run the development server at this point.

  #### Firebase dependencies

  Now we need to install the `functions` dependencies. They will be need for running the firebase emulators. : then and build commands. You can just copy and paste altogether, but

  Next, install the dependencies for `functions`, which are needed to run the Firebase emulators. First, navigate to the functions folder:

  ```sh
  cd functions
  ```

  Install the `functions` dependencies:

  ```sh
  npm install
  ```

  If there was no error, run the build command still at `functions`:

  ```sh
  npm run build
  ```

- ### Run the Development Server <a id="dev-server"></a>

  The development server reflects your latest code changes immediately upon saving. While it can be a bit slow at times, it’s essential for quickly testing front-end updates.

  To start the development server, run the following command from the project root. If everything is set up correctly, the webpage will open automatically at [localhost:3000](http://localhost:3000).

  ```sh
  npm start
  ```

- ### Run the Firebase Emulators <a id="firebase"></a>

  For a full local simulation of the deployment environment, you can run the Firebase emulators. This gives you a nearly complete preview of how the app will behave in production.

  From the root directory, build the project to ensure your latest changes are included:

  ```sh
    npm run build
  ```

  Now, start the emulators by typing:

  ```sh
    firebase emulators:start
  ```

  A link to the local Firebase Console will be displayed in your terminal. Click it to open the console in your browser. You’ll be able to explore the inner workings of your app just like in a real deployment.

  > **Tip**: If the page doesn’t open automatically or appears blank, reach out to a teammate for help. Also, check your browser console for errors:
  >
  > - Press `Ctrl + Shift + I` on Windows or `Cmd + Option + I` on macOS to open the developer tools
  > - Then click the **Console** tab
  > - Look for red error messages — they may help identify the issue.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
