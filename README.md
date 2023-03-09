# Project3
# TOCHECK

<br>

# Quick Compo

<br>

## Description

This is an app to manage unofficial tournaments within communities. The app helps to organize, manage and track competitions.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.


## Backlog

- Add weather widget

<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/tasks/add`           | CreateTasksPage | user only `<PrivateRoute>` | Create new tasks form.                               |
| `/tasks`               | TasksListPage   | user only `<PrivateRoute>` | Tasks list.                                         |
| `/tasks/:taskId` | TasksDetailPage | user only `<PrivateRoute>` | Tasks details. Shows players list and other details. |


## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateTasksPage

- TasksListPage

- TasksDetailsPage
  

Components:

- Home
- Calendar
- Navbar
- Footer



## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Tasks Service**

  - `tasksService` :
    - `.addTask(taskData)`
    - `.getTasks()`
    - `.getOneTask(id)`
    - `.deleteTask(id)`

- **CommentTask Service**

  - `commentTask` :
    - `.createcomment`
    - `.getcommentdetails(id)`
    - `.commentTaskList`
    - `.deleteComment(id)`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."]
    },
    imageUrl: {
        type: String,
        default: "../",
      },
    tasks: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Task' }],
  }
```



**Tasks model**

```javascript
 {
    title: { type: String, 
    required: true },
    description: { type: String,
    required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], 
    importance: { type:String, enum: ['High Priority', 'Important', 'Normal']},
    default: 'Normal' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date of completion: {}
    comments: {[
      type: Schema.Types.ObjectId, ref: 'Comment'
    ]}
 }
```



**Comment model**

```javascript
{
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/tasks`     |                              |                | 400          | Show all tasks                                        |
| GET         | `/api/tasks/:id` |                              |                |              | Show specific task                                     |
| POST        | `/api/tasks `     | { name, img, tasks }       | 201            | 400          | Create and save a new task                            |
| PUT         | `/api/tasks /:id` | { name, img, tasks }       | 200            | 400          | edit task                                              |
| DELETE      | `/api/tasks/:id` |                              | 201            | 400          | delete task                                            |
| GET         | `/api/comment/:id`     |                              |                |              | show specific comment                                         |
| POST        | `/api/comment`         | { name, taskId }  | 200            | 404          | add comment                                                  |
| PUT         | `/api/comment/:id`     | { title, description }                | 201            | 400          | edit player                                                  |
| DELETE      | `/api/comment/:id`     |                              | 200            | 400          | delete comment                                               |

<br>

## API's

<br>

## Packages

<br>


## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link]()

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

Francisco Pereira - <https://github.com/FranciscoManuelPereira> - <https://www.linkedin.com/in/franciscomanuelpereira/>

Mariana Franco - <https://github.com/marianamedeirosfranco> - <https://www.linkedin.com/in/marianamedeirosfranco/>