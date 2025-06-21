# Multiuser Laboratory Website

The Multiuser Laboratory Website is a project developed by Unicamp students in collaboration with the administration of the Faculty of Mechanical Engineering at Unicamp ([Faculdade de Engenharia Elétrica - FEM](https://www.fem.unicamp.br/)). Its goal is to provide an online platform for organizing and scheduling mechanical tests conducted in FEM laboratories.

Previously, the FEM laboratories had no dedicated website, and their usage was largely unregulated. This platform marks a significant advancement for the Faculty of Mechanical Engineering at Unicamp — benefiting students, professors, and collaborators alike. It also helps protect the laboratories' physical assets by enabling documented and traceable usage of equipment.

The project is currently under development and initially supports only the LMU Laboratory. However, it is actively being expanded to cover all FEM laboratories.

## How to Set Up the Project Locally

| <h3>[**Installations**](#Installations)</h3> |
| -------------------------------------------- |
| [Install a code editor](#codeeditor)         |
| [Install Node.js and NPM](#nodejs)           |
| [Install Git](#git)                          |
| [Git Configuration](#gitconfig)              |
| [SSH-Key](#sshkey)                           |

| <h3>[Local Repo Setup](#repo)</h3>        |
| ----------------------------------------- |
| [Clone the Project](#gitclone)            |
| [Add Enviroment Variables](#env-var)      |
| [Install the firebase-tools](#firebase)   |
| [Install the dependencies](#install)      |
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

  There are two main ways to install and use Node.js and NPM:

  - **Option 1:** Install directly from the Node.js website

    This is the most straightforward approach and comes bundled with NPM:

    [Download Node.js](https://nodejs.org/en/download)

  - **Option 2 (Recommended):** Via NVM (Node Version Manager)

    While not strictly required, NVM is a powerful tool that lets you manage multiple Node.js versions on your machine and easily switch between them.

    With a little extra setup, it provides a more flexible and professional development environment. Choose your operating system and follow the appropriate installation guide:

    - **Windows**: [nvm-windows (at github)](https://github.com/coreybutler/nvm-windows)

    > ⚠️ Note: If you already have Node.js installed, you may need to uninstall it before installing NVM.

    - **Linux or MacOS**: [nvm (at github)](https://github.com/nvm-sh/nvm)

    > 💡 **Tip:** When using NVM, each Node.js version you install includes its own dedicated NPM instance—with separate global packages and configuration settings.

- ### Install Git <a id="git"></a>

  Follow the steps below based on your operating system. If you prefer a full tutorial, visit https://git-scm.com/.

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
    git config --global user.email "your_email@example.com"
    ```

  - To set a **local** identity (after the [Git Clone](#gitclone) step), run the same commands **without** the `--global` flag, inside the repository folder:

    ```sh
    git config user.name "Your Name"
    git config user.email "your_email@example.com"
    ```

- ### Create a SSH key <a id="sshkey"></a>

  An SSH key is required to securely and easily access GitHub from your local machine — for example, when using `git push`.

  While these steps may seem a bit clunky at first, they’re part of a one-time setup and are standard practice in professional development. Luckily, Atlassian provides an excellent tutorial that we highly recommend:

  👉 [Atlassian - How to create an SSH Key](https://www.atlassian.com/git/tutorials/git-ssh)

  > **Important Note**: During the process, you’ll be asked to provide an email address. Be sure to use the **same email address as your GitHub account**, or your key may not be properly linked.

  Once you've generated your SSH public key, **contact a project administrator** to have it added to the repository's access list on GitHub.

  > 💡 **Tip**: Atlassian has great tutorials on all [Git things](https://www.atlassian.com/git/glossary#commands). It's worth bookmarking their resources for future reference!

---

### Local Repository Setup <a id="repo"></a>

After having the needed tools in place, follow the steps bellow to set up the project locally:

Once you have all the required tools installed, follow the steps below to set up the project locally:

- ### Clone the Project (Git Clone) <a id="gitclone"></a>

  [Cloning the repository with Git](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone) is the easiest way to get a local copy of the project and automatically link it to the GitHub remote. Other options, like downloading a ZIP file, also work — but you'd need to manually configure the remote origin later.

  Navigate to your `Desktop` or another desired location and run one of the following commands in your terminal:

  ```sh
  # If you've successfully set up an SSH key:
  git clone git@github.com:sayfelanjos/multiuser-laboratory-website.git

  # If you haven't set up an SSH key yet:
  git clone https://github.com/sayfelanjos/multiuser-laboratory-website.git
  ```

  > **Note 1**: The clone command will automatically create a **folder** named `multiuser-laboratory-website`. You don’t need to create it manually.

  > **Note 2**: Since the project is public, both **SSH** and **HTTPS** clone methods work without requiring a GitHub account or password. However, to use SSH later (e.g., for `git push`), you may need to update the remote URL.

- ### Add Enviroment Variables <a id="env-var"></a>

  Contact a project administrator to obtain the environment variables needed to run the project.

  Navigate to the root directory of the project in your terminal, create a file named `.env`, and paste the provided text into that file.

  ```sh
  cd multiuser-laboratory-website
  nodepad ".env"
  ```

- ### Install the Firebase Tools <a id="firebase"></a>

  Run the command below in any terminal to install the Firebase tools globally.

  ```sh
  npm install -g firebase-tools
  ```

  For more information, visit: [Firebase CLI Documentation](https://firebase.google.com/docs/cli)

- ### Install the dependencies <a id="install"></a>

  While in the root directory of the project, run the following commands in your terminal:

  ```sh
  npm install
  npm run functions:build
  ```

- ### Run the Development Server <a id="dev-server"></a>

  To run the development version of the project, use the following command. If everything is set up correctly, the webpage should open automatically in your browser at [localhost:3000](http://localhost:3000).

  ```sh
  npm start
  ```

- ### Run the Firebase Emulators <a id="firebase"></a>

  For a more complete test of your project setup, use the Firebase emulators. This will give you a complete local emulation of the deployment version — it's a simulation of the production environment:

  ```sh
  npm run build
  firebase emulators:start
  ```

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
