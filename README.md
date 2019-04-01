# labs11-pomodoroTimer-BE

The back end application for the Pomodoro Timer Project built by Lambda School Students in Labs11!

# API usage

# Users endpoints

**Show User**
----
  Returns json data about a single user returned by ID.

* **URL**

  /api/users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Show All Users**
----
  Returns json data about all users stored in the users table.

* **URL**

  /api/users/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : 12, name : "Michael Bloom" }, { id: 13, name : "John Smith" }]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/users/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

# Timer endpoints

**Show All Timers**
----
  Returns json data about all active timers, including the users running them

* **URL**

  /api/timer/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ userId : 12, timerRunning: true, timerStart: 04012019089546 timerEnd: 04012019090000 }, { userId : 13, timerRunning: true, timerStart: 04012019128495, timerEnd: 040120191302485}]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/timer/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Show user's timer information**
----
  Return in json format the user's timer information

  * **URL**
    /api/timer/:UserId

  * **Method:**
    `GET`

  * **URL Params**
   
     **Required:**

    `id=[integer]`

  * **Data Params**
    * **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ userId : 12, timerRunning: true, timerStart: 04012019089546 timerEnd: 04012019090000 }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/timer/:userId",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```